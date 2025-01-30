from os import getenv
from groq import Groq
from dotenv import load_dotenv

load_dotenv()
api_key = getenv("GROQCLOUD_API_KEY")

with open(r"app\templates\shared\system_prompt.txt", "r", encoding="utf-8") as file:
    system_prompt = file.read()

# "C:\\Users\\21954\\Documents\\Code\\Python\\CVbuilder\\app\\templates\\shared\\system_prompt.txt"

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
        return "Error occurred with LLM"
