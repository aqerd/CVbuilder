def collect_data(request):
    data = {
        "name": request.form.get("name"),
        "middle_name": request.form.get("middle-name"),
        "last_name": request.form.get("last-name"),
        "age": request.form.get("age"),
        "email": request.form.get("email"),
        "dob": request.form.get("dob"),
        "citizenship": request.form.get("citizenship"),
        "city": request.form.get("city"),
        "socials": [],
        "projects": [],
        "experiences": [],
        "education": [],
        "languages": []
    }

    social_count = 1
    while request.form.get(f"social-service-{social_count}"):
        data["socials"].append({
            "service": request.form.get(f"social-service-{social_count}"),
            "link": request.form.get(f"social-link-{social_count}")
        })
        social_count += 1

    project_count = 1
    while request.form.get(f"project-name-{project_count}"):
        data["projects"].append({
            "name": request.form.get(f"project-name-{project_count}"),
            "time": request.form.get(f"project-time-{project_count}"),
            "link": request.form.get(f"project-link-{project_count}"),
            "description": request.form.get(f"project-description-{project_count}")
        })
        project_count += 1

    experience_count = 1
    while request.form.get(f"company-name-{experience_count}"):
        data["experiences"].append({
            "company": request.form.get(f"company-name-{experience_count}"),
            "title": request.form.get(f"job-title-{experience_count}"),
            "period": request.form.get(f"work-period-{experience_count}"),
            "description": request.form.get(f"job-description-{experience_count}")
        })
        experience_count += 1

    education_count = 1
    while request.form.get(f"institution-name-{education_count}"):
        data["education"].append({
            "institution": request.form.get(f"institution-name-{education_count}"),
            "period": request.form.get(f"education-period-{education_count}"),
            "field": request.form.get(f"field-of-study-{education_count}")
        })
        education_count += 1

    language_count = 1
    while request.form.get(f"language-name-{language_count}"):
        data["languages"].append({
            "language": request.form.get(f"language-name-{language_count}"),
            "level": request.form.get(f"language-level-{language_count}")
        })
        language_count += 1

    return data
