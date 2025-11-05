"""\file middlewares.py
\brief Flask middlewares and decorators.

\details Provides decorator to ensure session contains required data.


\version 0.1
\copyright MIT License
"""

import functools

from flask import render_template, session


def data_required(func: callable) -> callable:
    """\brief Decorator to check for data in the session.

    \details If session lacks data or values are empty, renders an error page.
    Otherwise passes the data dictionary to the wrapped function.

    \param func Function to wrap.
    \return Wrapped function.
    """

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        data = session.get("data")
        if not data or not any(
            value is not None and value != "" and value != [] for value in data.values()
        ):
            return render_template(
                "error.html", msg_error="No data available", error=400
            )
        return func(data)

    return wrapper
