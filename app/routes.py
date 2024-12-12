from app import app
from app.utils.data_collector import collect_data
from app.utils.file_utils import create_type
from flask import render_template, make_response, send_file, jsonify, request, session

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

@app.route('/set_format', methods=['POST'])
def set_format():
    format_type = request.form.get('format')
    session['format'] = format_type
    return jsonify(success=True, format=format_type)


@app.route('/download',  methods=['GET'])
def download():
    data = session.get('data')
    if not data:
        return "No data available", 400
    file_type = session.get('format')
    filename = create_type(data, file_type)

    return send_file(filename, as_attachment=True)

@app.route('/about')
def about():
    return render_template('about.html')
