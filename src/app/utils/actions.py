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
from app.utils.groqai import generate_description


def submit():
    data = collect_data(request)
    response = make_response(redirect("/export"))
    for key, value in data.items():
        if isinstance(value, (list, dict)):
            continue
        response.set_cookie(key, str(value))
    session["data"] = data
    return response


def ai_generate():
    prompt = request.form.get("prompt")
    textarea_type = request.form.get("textarea_type")
    if not prompt:
        return jsonify({"description": "No prompt provided"}), 400
    prompt = urllib.parse.unquote(prompt)

    def stream_response():
        yield json.dumps({"description": "Generating..."}) + "\n"
        time.sleep(3)
        generated_description = generate_description(prompt, textarea_type)
        # app.logger.info(f"Generated text: {generated_description}")
        yield json.dumps({"description": generated_description}) + "\n"

    return Response(stream_with_context(stream_response()), mimetype="application/json")
