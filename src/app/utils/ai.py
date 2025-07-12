from google import genai
import json
import re
from settings import Settings

client = genai.Client(api_key=Settings.GOOGLE_API_KEY)

with open(Settings.SYSTEM_PROMPT_FILE_PATH, "r", encoding="utf-8") as file:
    system_prompt = file.read()


def generate_description(user_prompt, description_type):
    request_data = {
        "system_prompt": system_prompt,
        "user_prompt": user_prompt,
        "description_type": description_type,
    }
    contents = json.dumps(request_data)
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash", contents=contents
        )
        json_match = re.search(r"```json\n([\s\S]*?)\n```", response.text)
        if json_match:
            response_text_edited = json_match.group(1)
        else:
            response_text_edited = response.text
        data = json.loads(response_text_edited)
        return data.get("result"), data.get("error_code"), data.get("error_message")
    except json.JSONDecodeError:
        return "", 1, "Error with decoding the response"
    except Exception:
        return "", 1, "Error occurred with LLM service"
