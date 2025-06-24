from src.app import app
from settings import Settings

if __name__ == "__main__":
	app.run(
		debug=Settings.DEBUG_APP,
		host=Settings.HOST_APP,
		port=Settings.PORT_APP
	)
