import functools
from flask import render_template, session

def data_required(func):
	@functools.wraps(func)
	def wrapper(*args, **kwargs):
		data = session.get("data")
		if not data or not any(value is not None and value != "" and value != [] for value in data.values()):
			return render_template("error.html", msg_error="No data available", error=400)
		return func(data)
	return wrapper
