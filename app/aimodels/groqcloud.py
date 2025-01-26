from os import getenv
from groq import Groq
from dotenv import load_dotenv

load_dotenv()
api_key=getenv("GROQCLOUD_API_KEY")

try:
    client = Groq(api_key=api_key)
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "Explain in 70 symbols",
            },
            {
                "role": "user",
                "content": "Explain the importance of fast language models",
            }
        ],
        model="llama-3.3-70b-versatile",
    )
    print(chat_completion.choices[0].message.content)
except Exception as e:
    print(f"Error occurred with LLM")
