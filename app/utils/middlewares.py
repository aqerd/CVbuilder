import functools
from flask import render_template, session

def data_required(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        if not session.get('data'):
            return render_template('error.html', msg_error='No data avaliable', error=400)
        return func(*args, **kwargs)
    return wrapper
