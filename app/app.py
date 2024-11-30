from flask import Flask, render_template, send_file, request
from utils import * 
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/profile', methods=['GET', 'POST'])
def profile():
    if request.method == 'POST':
        
        data = collect_data(request)

        return render_template('profile.html', projects=data.get("projects"), experiences=data.get("experiences"),
                               education=data.get("education"), languages=data.get("languages"), socials=data.get("socials"))

    return render_template('profile.html')


@app.route('/samples')
def samples():
    return render_template('samples.html')

@app.route('/export')
def export():
    return render_template('export.html')

@app.route('/download/<file_type>')
def download(file_type):
    if file_type == 'pdf':
        filename = 'example.pdf'
    elif file_type == 'doc':
        filename = 'example.doc'
    elif file_type == 'jpg':
        filename = 'example.jpg'
    else:
        return "File type not found", 404
    return send_file(filename, as_attachment=True)

@app.route('/help')
def help_page():
    return render_template('help.html')

if __name__ == '__main__':
    app.run(debug=True)
