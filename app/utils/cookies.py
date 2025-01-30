from flask import request

def load_cookies():
    data = {}
    cookies_to_load = ["name", "middle_name", "last_name", "email", "age", "dob", "citizenship", "city"]
    for key in cookies_to_load:
        value = request.cookies.get(key)
        if value:
            data[key] = value
    return data