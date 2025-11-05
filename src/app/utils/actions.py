"""\file actions.py
\brief Handle user actions in the CVbuilder application.

\details Provides functions for processing form submissions, generating AI
text and managing user session data.


\version 0.1
\copyright MIT License
"""

import json
import time
import urllib.parse

from flask import (
    Response,
    jsonify,
    make_response,
    redirect,
    request,
    session,
    stream_with_context,
)

from app.utils.data_collector import collect_data
from app.utils.ai import generate_description


def submit() -> Response:
    """\brief Handle resume form data submission.

    \details Collects data from the request, saves it in the session and sets
    cookies. Then redirects the user to the export page.

    \return Flask :pyclass:`flask.Response` redirect to /export with cookies set.
    \note Skips list and dict values when setting cookies.
    """
    data = collect_data(request)
    response = make_response(redirect("/export"))
    for key, value in data.items():
        if isinstance(value, (list, dict)):
            continue
        response.set_cookie(key, str(value))
    session["data"] = data
    return response


def ai_generate() -> Response:
    """\brief Generate a description using artificial intelligence.

    \details Accepts a request with a text field and textarea type, calls
    :pyfunc:`app.utils.ai.generate_description` to create the text and streams
    the result back to the client.

    \return Streaming JSON :pyclass:`flask.Response` with generated description
    or error information.

    \exception 400 No prompt provided.
    \note Uses a streaming response with a 3-second delay for better UX.
    """
    prompt = request.form.get("prompt")
    textarea_type = request.form.get("textarea_type")
    if not prompt:
        return jsonify({"description": "No prompt provided"}), 400
    prompt = urllib.parse.unquote(prompt)

    def stream_response():
        yield json.dumps({"description": "Generating..."}) + "\n"
        time.sleep(3)
        generated_description, error_code, error_message = generate_description(
            prompt, textarea_type
        )
        if error_code != 0:
            yield (
                json.dumps(
                    {
                        "description": generated_description,
                        "error_code": error_code,
                        "error_message": error_message,
                    }
                )
                + "\n"
            )
        else:
            yield json.dumps({"description": generated_description}) + "\n"

    return Response(stream_with_context(stream_response()), mimetype="application/json")
