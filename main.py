from app import site
from settings import Settings

if __name__ == "__main__":
    site.run(host=Settings.HOST_APP, port=Settings.PORT_APP, debug=Settings.DEBUG_APP)
