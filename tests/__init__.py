"""Unit tests for the CVbuilder Flask application.

This module contains unit tests for various routes and functionalities of the CVbuilder Flask application.
It uses Flask's test client to simulate requests and assert responses.
"""

import unittest

from app import app


class FlaskTestCase(unittest.TestCase):
    """Test suite for the Flask application.

    This class provides a set of unit tests for the CVbuilder Flask application,
    covering different routes and their expected behaviors.
    """
    def setUp(self):
        """Set up the test client before each test.

        Initializes the Flask test client and sets testing mode to True.
        """
        self.client = app.test_client()
        self.client.testing = True

    def test_home(self):
        """Test the home page route.

        Verifies that the home page ('/') returns a 200 status code
        and contains the text "CVbuilder".
        """
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"CVbuilder", response.data)

    def test_profile(self):
        """Test the profile page route.

        Verifies that the profile page ('/profile') returns a 200 status code
        and contains the text "Profile".
        """
        response = self.client.get("/profile")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Profile", response.data)

    def test_export(self):
        """Test the export page route.

        Verifies that the export page ('/export') returns a 200 status code
        and contains the text "Export".
        """
        response = self.client.get("/export")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Export", response.data)

    def test_more(self):
        """Test the 'more' page route.

        Verifies that the 'more' page ('/more') returns a 200 status code
        and contains the texts "Switch themes" and "About this site".
        """
        response = self.client.get("/more")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Switch themes", response.data)
        self.assertIn(b"About this site", response.data)

    def test_set_format(self):
        """Test the set_format route.

        Verifies that posting to '/set_format' with a format parameter
        returns a 400 status code (expected for a POST request without proper session setup).
        """
        response = self.client.post("/set_format", data={"format": "pdf"})
        self.assertEqual(response.status_code, 400)

    def test_download(self):
        """Test the download route.

        Simulates a session with a 'pdf' format and verifies that
        accessing '/download' returns a 200 status code.
        """
        with self.client.session_transaction() as sess:
            sess["format"] = "pdf"
        response = self.client.get("/download")
        self.assertEqual(response.status_code, 200)

    def test_email(self):
        """Test the email route.

        Simulates a session with a 'pdf' format and verifies that
        accessing '/email' returns a 200 status code.
        """
        with self.client.session_transaction() as sess:
            sess["format"] = "pdf"
        response = self.client.get("/email")
        self.assertEqual(response.status_code, 200)

    def test_email_error(self):
        """Test the email route with error conditions.

        Simulates a session with a 'pdf' format and provides query parameters
        to '/email', expecting a 200 status code and the text "Unexpected error".
        """
        with self.client.session_transaction() as sess:
            sess["format"] = "pdf"
        response = self.client.get(
            "/email",
            query_string={
                "email": "test@example.com",
                "name": "John",
                "last_name": "Doe",
            },
        )
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Unexpected error", response.data)

    def test_error(self):
        """Test the 404 error handling.

        Accesses a non-existent page and verifies that the application
        returns a 200 status code (due to custom error handling) and the text "Unexpected error".
        """
        response = self.client.get("/fake_page_to_test_404_error_handling_lol")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Unexpected error", response.data)


if __name__ == "__main__":
    unittest.main()
