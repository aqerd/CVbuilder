import unittest

from app import app


class FlaskTestCase(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()
        self.client.testing = True

    def test_home(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"CVbuilder", response.data)

    def test_profile(self):
        response = self.client.get("/profile")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Profile", response.data)

    def test_export(self):
        response = self.client.get("/export")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Export", response.data)

    def test_more(self):
        response = self.client.get("/more")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Switch themes", response.data)
        self.assertIn(b"About this site", response.data)

    def test_set_format(self):
        response = self.client.post("/set_format", data={"format": "pdf"})
        self.assertEqual(response.status_code, 400)

    def test_download(self):
        with self.client.session_transaction() as sess:
            sess["format"] = "pdf"
        response = self.client.get("/download")
        self.assertEqual(response.status_code, 200)

    def test_email(self):
        with self.client.session_transaction() as sess:
            sess["format"] = "pdf"
        response = self.client.get("/email")
        self.assertEqual(response.status_code, 200)

    def test_email_error(self):
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
        response = self.client.get("/fake_page_to_test_404_error_handling_lol")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Unexpected error", response.data)


if __name__ == "__main__":
    unittest.main()
