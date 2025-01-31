import os
from os import getenv
from groq import Groq
from dotenv import load_dotenv

load_dotenv()
api_key = getenv("GROQCLOUD_API_KEY")

file_path = os.path.join(os.path.dirname(__file__), 'app', 'templates', 'shared', 'system_prompt.txt')
with open(file_path, 'r', encoding='utf-8') as file:
    system_prompt = file.read()

def generate_description(prompt, description_type):
    content = system_prompt + f"description_type={description_type}"
    try:
        client = Groq(api_key=api_key)
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": content
                },
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="llama-3.3-70b-versatile",
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        return "[ERROR] Error occurred with LLM"
