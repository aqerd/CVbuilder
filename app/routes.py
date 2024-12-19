from flask import render_template, send_file, jsonify, request, session, make_response, redirect
from app.utils.email_utils import send_cv_mail
from app.utils.file_utils import *
from app.utils.data_collector import collect_data
from app import app

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/profile', methods=['GET', 'POST'])
def profile():
    if request.method == 'POST':
        data = collect_data(request)
        response = make_response(render_template('profile.html', projects=data.get("projects"),
                                                 experiences=data.get("experiences"), education=data.get("education"),
                                                 languages=data.get("languages"), socials=data.get("socials")))
        for key, value in data.items():
            if isinstance(value, (list, dict)):
                continue
            response.set_cookie(key, str(value))
        session['data'] = data
        return response

    data = {}
    cookies_to_load = ["name", "middle_name", "last_name", "age", "email", "dob", "citizenship", "city"]
    for key in cookies_to_load:
        value = request.cookies.get(key)
        if value:
            data[key] = value

    return render_template('profile.html', **data)

@app.route('/samples')
def samples():
    return render_template('samples.html')

@app.route('/export')
def export():
    return render_template('export.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/set_format', methods=['POST'])
def set_format():
    format_type = request.form.get('format')
    session['format'] = format_type
    return jsonify(success=True, format=format_type)
     
@app.route('/download', methods=['GET'])
def download():
    data = session.get('data')
    if not data:
        return render_template("error.html", msg_error="No data available", error=400)
    filetype = session.get('format')
    filename = create_type(data, filetype)
    return send_file(filename, as_attachment=True)

@app.route('/email', methods = ['GET'])
def email():
    data = session.get('data')
    if not data:
        return render_template("error.html", msg_error="No data available", error=400)
    filetype = session.get('format')
    filename = create_type(data, filetype)
    try:
        send_cv_mail(recipient=data['email'], name=data['name'], lastname=data['last_name'], cv_path=filename)
        return redirect('/export')
    except Exception as e:
        return render_template("error.html", msg_error=f"Error sending email: + {e}", error=500)
