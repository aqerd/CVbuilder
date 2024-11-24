from flask import Flask, render_template, send_file, request

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

        projects = []
        project_count = 1
        while request.form.get(f'project-name-{project_count}'):
            project_name = request.form.get(f'project-name-{project_count}')
            project_time = request.form.get(f'project-time-{project_count}')
            project_link = request.form.get(f'project-link-{project_count}')
            project_description = request.form.get(f'project-description-{project_count}')

            projects.append({
                'name': project_name,
                'time': project_time,
                'link': project_link,
                'description': project_description
            })
            print(f"Project {project_count}:")
            print(f"  Name: {project_name}")
            print(f"  Time: {project_time}")
            print(f"  Link: {project_link}")
            print(f"  Description: {project_description}")
            project_count += 1

        # Извлечение данных о опыте работы
        experiences = []
        experience_count = 1
        while request.form.get(f'company-name-{experience_count}'):
            company_name = request.form.get(f'company-name-{experience_count}')
            job_title = request.form.get(f'job-title-{experience_count}')
            work_period = request.form.get(f'work-period-{experience_count}')
            job_description = request.form.get(f'job-description-{experience_count}')

            experiences.append({
                'company': company_name,
                'title': job_title,
                'period': work_period,
                'description': job_description
            })
            print(f"Experience {experience_count}:")
            print(f"  Company: {company_name}")
            print(f"  Job Title: {job_title}")
            print(f"  Work Period: {work_period}")
            print(f"  Job Description: {job_description}")
            experience_count += 1

        # Здесь можно вернуть эти данные обратно в шаблон, если нужно
        return render_template('profile.html', projects=projects, experiences=experiences)

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
