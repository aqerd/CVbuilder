from flask import render_template, send_file, jsonify, request, session, make_response, redirect, jsonify
from app.utils.email_utils import send_cv_mail
from app.utils.file_utils import create_type
from app.utils.data_collector import collect_data
from app.utils.middlewares import data_required
from app import app
import json

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/profile', methods=['GET', 'POST'])
def profile():
    if request.method == 'POST':
        action = request.form.get('action')
        if action == 'submit':
            data = collect_data(request)
            response = make_response(redirect('/export'))
            for key, value in data.items():
                if isinstance(value, (list, dict)):
                    continue
                response.set_cookie(key, str(value))
            session['data'] = data
            return response

        if action == 'generate_description':
            prompt = request.form['prompt']
            # code
            generated_description = f"Processed: {prompt}"
            return jsonify({'description': generated_description})

    data = {}
    cookies_to_load = ["name", "middle_name", "last_name", "email", "age", "dob", "citizenship", "city"]
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

@app.route('/more')
def more():
    with open('app/static/data/themes.json') as f:
        themes = json.load(f)
    return render_template('more.html', themes=themes)

@app.route('/set_format', methods=['POST'])
def set_format():
    format_type = request.form.get('format')
    session['format'] = format_type
    return jsonify(success=True, format=format_type)

@app.route('/download', methods=['GET'])
@data_required
def download(data):
    print(data)
    filetype = session.get('format')
    filename = create_type(data, filetype)
    return send_file(filename, as_attachment=True)

@app.route('/email', methods=['GET'])
@data_required
def email(data):
    filetype = session.get('format')
    filename = create_type(data, filetype)
    try:
        send_cv_mail(recipient=data['email'], name=data['name'], lastname=data['last_name'], cv_path=filename)
        return redirect('/export')
    except Exception as e:
        if e.args[0][''][0] == 501:
            return render_template("error.html", msg_error=f"Paste your email in Profile page", error=501)
        return render_template("error.html", msg_error=f"Error sending email: {e}", error=500)

@app.errorhandler(404)
def page_not_found(e):
    return render_template('error.html', msg_error=f'Page not available: {e}', error=404)
