import os
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from docx import Document

PATH_SAVE = os.path.join(os.path.dirname(__file__), 'BD')


def collect_data(request):
    name = request.form.get('name')
    middle_name = request.form.get('middle-name')
    last_name = request.form.get('last-name')
    age = request.form.get('age')
    email = request.form.get('email')
    dob = request.form.get('dob')
    citizenship = request.form.get('citizenship')
    city = request.form.get('city')

    socials = []
    social_count = 1
    while request.form.get(f'social-service-{social_count}'):
        social_service = request.form.get(f'social-service-{social_count}')
        social_link = request.form.get(f'social-link-{social_count}')
        socials.append({
            'service': social_service,
            'link': social_link
        })
        social_count += 1

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

        project_count += 1

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
        experience_count += 1

    education = []
    education_count = 1
    while request.form.get(f'institution-name-{education_count}'):
        institution_name = request.form.get(f'institution-name-{education_count}')
        education_period = request.form.get(f'education-period-{education_count}')
        field_of_study = request.form.get(f'field-of-study-{education_count}')

        education.append({
            'institution': institution_name,
            'period': education_period,
            'field': field_of_study
        })
        education_count += 1

    languages = []
    language_count = 1
    while request.form.get(f'language-name-{language_count}'):
        language_name = request.form.get(f'language-name-{language_count}')
        language_level = request.form.get(f'language-level-{language_count}')
        languages.append({
            'language': language_name,
            'level': language_level
        })
        language_count += 1

    return { 'name': name, 'middle_name': middle_name, 'last_name': last_name, 'age': age, 'email': email,
    'dob': dob, 'citizenship': citizenship, 'city': city, 'socials': socials, 'projects': projects,
    'experiences': experiences, 'education': education, 'languages': languages}
    

