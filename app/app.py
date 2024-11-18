from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/profile', methods=['GET', 'POST'])
def profile():
    if request.method == 'POST':
        name = request.form.get('name')
        middle_name = request.form.get('middle-name')
        last_name = request.form.get('last-name')
        age = request.form.get('age')
        email = request.form.get('email')
        socials = request.form.get('socials')

        print(f"Name: {name}")
        print(f"Middle Name: {middle_name}")
        print(f"Last Name: {last_name}")
        print(f"Age: {age}")
        print(f"Email: {email}")
        print(f"Socials: {socials}")

    return render_template('profile.html')


@app.route('/samples')
def samples():
    return render_template('samples.html')

@app.route('/export')
def export():
    return render_template('export.html')

@app.route('/help')
def help_page():
    return render_template('help.html')

if __name__ == '__main__':
    app.run(debug=True)
