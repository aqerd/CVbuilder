from groq import Groq

from settings import Settings

api_key = Settings.GROQCLOUD_API_KEY

with open(Settings.SYSTEM_PROMPT_FILE_PATH, "r", encoding="utf-8") as file:
    system_prompt = file.read()


def generate_description(prompt, description_type):
    content = system_prompt + f"description_type={description_type}"
    try:
        client = Groq(api_key=api_key)
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": content},
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            model="llama-3.3-70b-versatile",
        )
        return chat_completion.choices[0].message.content
    except Exception as _:
        return "[ERROR] Error occurred with LLM"
