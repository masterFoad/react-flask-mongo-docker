import importlib
import sys

from flask import Flask, abort, request, send_from_directory
from flask_cors import cross_origin

print(sys.path)
common_utils = importlib.import_module("common.utils")
config_init_config = importlib.import_module("config.prod_config")
draw_on_img = importlib.import_module("services.draw_on_img")
db_access = importlib.import_module("db.mongo_db")

app = Flask(__name__, static_folder='./static/client/build', static_url_path='/')

config_init_config.init_config(app)
common_utils.clean_data()

for x in db_access.img_data_col.find({}):
    print(x)

handlers = importlib.import_module("services.data_handlers")


@app.route('/')
@cross_origin()
def index():
    return app.send_static_file('index.html')


@app.route('/static/images/<path:path>')
def send_js(path):
    return send_from_directory('static/images', path)


@app.route('/get-list-of-images', methods=['GET'])
@cross_origin()
def get_image_list():
    try:
        return handlers.get_image_list_from_db()
    except Exception as e:
        print(e)
        abort(500)


@app.route('/upload-img-details', methods=['POST'])
@cross_origin()
def handle_uploads():
    return handlers.handle_uploads(request)


if __name__ == '__main__':
    # only used locally
    app.run(host='0.0.0.0', port=8080, debug=True)
