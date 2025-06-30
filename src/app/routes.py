import json

from flask import (
    Blueprint,
    current_app,
    jsonify,
    redirect,
    render_template,
    request,
    send_file,
    session,
)

from app.utils.actions import ai_generate, submit
from app.utils.cookies import load_cookies
from app.utils.email_utils import send_cv_mail
from app.utils.file_utils import create_type
from app.utils.middlewares import data_required
from settings import Settings

router = Blueprint("routes", __name__)


@router.route("/")
def index():
    return render_template("index.html")


@router.route("/profile", methods=["GET", "POST"])
def profile():
    if request.method == "POST":
        action = request.form.get("action")
        if action == "submit":
            return submit()
        if action == "generate_description":
            return ai_generate()
    data = load_cookies()
    return render_template("profile.html", **data)


@router.route("/samples")
def samples():
    return render_template("samples.html")


@router.route("/export")
def export():
    return render_template("export.html")


@router.route("/more")
def more():
    with open(Settings.THEMES_FILE_PATH) as f:
        themes = json.load(f)
    return render_template("more.html", themes=themes)


@router.route("/set_format", methods=["POST"])
def set_format():
    format_type = request.form.get("format")
    session["format"] = format_type
    return jsonify(success=True, format=format_type)


@router.route("/download", methods=["GET"])
@data_required
def download(data):
    filetype = session.get("format")
    filename = create_type(data, filetype)
    return send_file(filename, as_attachment=True)


@router.route("/email", methods=["GET"])
@data_required
def email(data):
    filetype = session.get("format")
    filename = create_type(data, filetype)
    try:
        send_cv_mail(
            recipient=data["email"],
            name=data["name"],
            lastname=data["last_name"],
            cv_path=filename,
            mail=current_app.extensions.get("mail"),
        )
        return redirect("/export")
    except Exception as e:
        if e.args[0][""][0] == 501:
            return render_template(
                "error.html", msg_error="Paste your email in Profile page", error=501
            )
        return render_template(
            "error.html", msg_error=f"Error sending email: {e}", error=500
        )


@router.errorhandler(404)
def page_not_found(e):
    return render_template(
        "error.html", msg_error=f"Page not available: {e}", error=404
    )
