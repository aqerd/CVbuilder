"""\file ai.py
\brief Interface to the Artificial Intelligence model.

\details Provides functionality for generating descriptions using the Google
Gemini 2.5 Flash model. Loads the system prompt from file, sends the user
request and processes the JSON response.


\version 0.1
\copyright MIT License

\var client Google Generative AI client instance.
\var system_prompt System prompt string loaded from file for LLM requests.
"""

from google import genai
import json
import re
from settings import Settings

# ---------------------------------------------------------------------------
# Initialization
# ---------------------------------------------------------------------------

# Initialize the Google Generative AI client using the API key from settings.
client = genai.Client(api_key=Settings.GOOGLE_API_KEY)

# Load the system prompt that will be sent along with every request to the LLM.
with open(Settings.SYSTEM_PROMPT_FILE_PATH, "r", encoding="utf-8") as file:
    system_prompt = file.read()


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def generate_description(user_prompt: str, description_type: str) -> tuple[str, int, str]:
    """\brief Generate a description using the Gemini 2.5 Flash model.

    \details Builds a request consisting of the shared system prompt, the
    user-provided prompt and the desired *description_type*. Sends the request
    to Google Gemini 2.5 Flash via the *google-genai* SDK and expects a fenced
    JSON block in the response which is parsed and returned.

    \param user_prompt Text prompt provided by the user.
    \param description_type Type of description to generate (e.g. *short*,
           *detailed*).
    \return Tuple ``(result text, error_code, error_message)`` where
            *error_code* == 0 on success.
    \exception json.JSONDecodeError If the model returns invalid JSON.
    \exception Exception For network or SDK errors.
    \sa app.utils.actions.ai_generate
    """
    # Build request body for the model
    request_data = {
        "system_prompt": system_prompt,
        "user_prompt": user_prompt,
        "description_type": description_type,
    }

    contents = json.dumps(request_data)

    try:
        # Send request to Gemini 2.5 Flash model
        response = client.models.generate_content(
            model="gemini-2.5-flash", contents=contents
        )

        # Gemini returns a Markdown-like response that contains a fenced JSON block
        json_match = re.search(r"```json\n([\s\S]*?)\n```", response.text)
        response_text_edited = json_match.group(1) if json_match else response.text

        data = json.loads(response_text_edited)
        return data.get("result", ""), data.get("error_code", 0), data.get("error_message", "")

    except json.JSONDecodeError:
        # The model did not return valid JSON
        return "", 1, "Error decoding the response JSON from LLM"
    except Exception as exc:  # pylint: disable=broad-except
        # Catch-all for network or SDK errors
        return "", 1, f"Error occurred while communicating with LLM service: {exc}"
