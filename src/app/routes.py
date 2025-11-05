"""\file routes.py
\brief Define routes of the CVbuilder web application.

\details Contains all URL endpoints for the Flask CVbuilder application. It handles
requests for the home page, profile, samples, export, themes, CV upload and
email functionality.


\version 0.1
\copyright MIT License
"""
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

# Blueprint for application routes.
router = Blueprint("routes", __name__)


@router.route("/")
def index() -> str:
    """Display the home page of the application.
    
    Returns:
        str: Rendered 'index.html' template.
        
    Example:
        >>> index()
        '<html>...</html>'
    """
    return render_template("index.html")


@router.route("/profile", methods=["GET", "POST"])
def profile() -> str:
    """Handle user profile page display and form submission.
    
    For POST requests, processes 'submit' or 'generate_description' actions.
    For GET requests, loads data from cookies and displays the profile page.
    
    Returns:
        str: Rendered template or redirect response.
        
    Note:
        - POST with action='submit': Processes form submission
        - POST with action='generate_description': Generates AI description
        - GET: Displays profile page with loaded data
    """
    if request.method == "POST":
        action = request.form.get("action")
        if action == "submit":
            return submit()
        if action == "generate_description":
            return ai_generate()
    data = load_cookies()
    return render_template("profile.html", **data)


@router.route("/samples")
def samples() -> str:
    """Display CV samples page.
    
    Returns:
        str: Rendered 'samples.html' template.
    """
    return render_template("samples.html")


@router.route("/export")
def export() -> str:
    """Display CV export page.
    
    Returns:
        str: Rendered 'export.html' template.
    """
    return render_template("export.html")


@router.route("/more")
def more() -> str:
    """Display additional information page.
    
    Returns:
        str: Rendered 'more.html' template.
    """
    return render_template("more.html")


@router.route("/themes")
def themes() -> str:
    """Display CV theme selection page.
    
    Loads available themes from the configuration file and displays them on the page.
    
    Returns:
        str: Rendered 'themes.html' template with theme data.
        
    Note:
        Themes are loaded from Settings.THEMES_FILE_PATH.
    """
    with open(Settings.THEMES_FILE_PATH) as f:
        themes = json.load(f)
    return render_template("themes.html", themes=themes)


@router.route("/set_format", methods=["POST"])
def set_format() -> dict:
    """Set the format for CV export.
    
    Accepts a POST request with the selected format (e.g., PDF, DOCX) 
    and saves it in the user's session.
    
    Returns:
        dict: JSON response with success status and format type.
        
    Note:
        Format is stored in session['format'].
    """
    format_type = request.form.get("format")
    session["format"] = format_type
    return jsonify(success=True, format=format_type)


@router.route("/download", methods=["GET"])
@data_required
def download(data: dict) -> any:
    """Download the generated CV file.
    
    Requires user data to generate the CV file in the selected format
    and sends it to the user for download.
    
    Args:
        data: Dictionary with user data required for CV generation.
        
    Returns:
        Response: CV file as an attachment for download.
        
    Note:
        File format is retrieved from session['format'].
    """
    filetype = session.get("format")
    filename = create_type(data, filetype)
    return send_file(filename, as_attachment=True)


@router.route("/email", methods=["GET"])
@data_required
def email(data: dict) -> any:
    """Send the generated CV via email.
    
    Requires user data to generate the CV file in the selected format
    and sends it to the user's specified email address.
    
    Args:
        data: Dictionary with user data, including email address and name.
        
    Returns:
        Response: Redirect to export page on success or error page on failure.
        
    Raises:
        Exception: If email sending fails, redirects to error page with appropriate message.
        
    Note:
        - File format is retrieved from session['format']
        - Error 501: Missing email address
        - Error 500: General email sending error
    """
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
        return render_template("error.html", msg_error="Error sending email", error=500)


def page_not_found(e: Exception) -> tuple:
    """Handle 404 Page Not Found errors.
    
    Displays a custom error page for non-existent routes.
    
    Args:
        e: The exception object containing error details.
        
    Returns:
        tuple: Rendered error template and HTTP status code (404).
        
    Note:
        This function is registered as the 404 error handler for the Flask app.
    """
    return render_template("error.html", msg_error=e, error=404), 404
