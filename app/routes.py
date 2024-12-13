from flask import Flask, render_template, send_file, request, session, make_response, redirect
from flask_wtf import CSRFProtect
from app.utils.email_utils import send_cv_mail
from app.utils.file_utils import *
from app.utils.data_collector import collect_data

app = Flask(__name__)
app.secret_key = os.urandom(36)
csrf = CSRFProtect(app)

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

@app.route('/download/<file_type>', methods=['GET'])
def download(file_type):
    data = session.get('data')
    if not data:
        return "No data available", 400
    filename = create_type(data, file_type)
    if not os.path.exists(filename):
        return "File not found", 404
    return send_file(filename, as_attachment=True)

@app.route('/email')
def email():
    data = session.get('data')
    if not data:
        return "No data available", 400
    file_type = session.get('format')
    filename = create_type(data, file_type)
    if not os.path.exists(filename):
        return "File not found", 404
    try:
        send_cv_mail(recipient=data['email'], name=data['name'], lastname=data['last_name'], cv_path=filename)
        return redirect('/export')
    except Exception as e:
        print(f"Error sending email: {e}")
        return "Error sending email", 500