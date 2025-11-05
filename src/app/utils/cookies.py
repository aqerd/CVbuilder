"""\file cookies.py
\brief Work with cookies in the CVbuilder application.

\details Provides helper to load user data from browser cookies.


\version 0.1
\copyright MIT License
"""

from flask import request


def load_cookies() -> dict:
    """\brief Load user data from cookies.

    \details Extracts specific user data (name, last name, email, etc.) from
    cookies of the current request and returns them as a dictionary.

    \return ``dict`` containing user data loaded from cookies.
    \note Loads the following keys: *name*, *middle_name*, *last_name*, *email*,
          *age*, *dob*, *country*, *city*.
    """
    data = {}
    cookies_to_load = [
        "name",
        "middle_name",
        "last_name",
        "email",
        "age",
        "dob",
        "country",
        "city",
    ]
    for key in cookies_to_load:
        value = request.cookies.get(key)
        if value:
            data[key] = value
    return data
