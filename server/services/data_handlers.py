import importlib
import json
import os
import sys

from flask import request, abort, jsonify
from werkzeug.utils import secure_filename

from server import app

print(sys.path)
common_utils = importlib.import_module("common.utils")
config_init_config = importlib.import_module("config.prod_config")
draw_on_img = importlib.import_module("services.draw_on_img")
db_access = importlib.import_module("db.mongo_db")


def get_image_list_from_db():
    images_list = []
    for img_detail in db_access.img_data_col.find({}):
        img_detail.pop('json_details', None)
        img_detail['_id'] = str(img_detail['_id'])
        images_list.append(img_detail)

    return jsonify({
        "images": images_list
    })


def handle_uploads(current_request):
    img_name = ''
    json_file_name = ''
    inserted_id = ''
    try:
        title = current_request.form['title']
        # print(title)
        description = current_request.form['description']
        # print(description)
        json_details_dict = json.load(current_request.files['json_details'])
        # print(json_details_dict)
        json_details = json.dumps(json_details_dict['images'])
        # print(str(json_details))
        img_name, json_file_name = handle_file_uploads()
        # print(img_name)

        inserted_id = ''
        if img_name != '' and title != '' and description != '' and json_details != '':
            list_polygons_tuples = get_polygons_arrays(json_details_dict)
            if draw_on_img.mark_all_words(os.path.join(app.config['UPLOAD_PATH'], img_name), img_name,
                                          list_polygons_tuples):
                inserted_id = db_access.handle_insert_to_db(app, description, img_name, inserted_id, json_details,
                                                            title)
            else:
                common_utils.rollback_if_created(img_name, json_file_name, '', '', app)
                abort(500)
    except Exception as e:
        print(e)
        common_utils.rollback_if_created(img_name, json_file_name, '', '', app)

    return jsonify({"id": str(inserted_id)})


def handle_file_uploads():
    print('handle_file_uploads')
    uploaded_file = request.files['file']
    json_file = request.files['json_details']

    img_name = secure_filename(uploaded_file.filename)
    json_file_name = secure_filename(json_file.filename)
    if os.path.isfile(os.path.join(app.config['UPLOAD_PATH'], img_name)) or os.path.isfile(
            os.path.join(app.config['UPLOAD_PATH_JSON'], json_file_name)):
        abort(409)

    if img_name != '':
        file_ext = os.path.splitext(img_name)[1]
        if file_ext not in app.config['UPLOAD_EXTENSIONS']:
            abort(400)
        uploaded_file.save(os.path.join(app.config['UPLOAD_PATH'], img_name))
        json_file.save(os.path.join(app.config['UPLOAD_PATH_JSON'], json_file_name))
    return img_name, json_file_name


def get_polygons_arrays(json_details_dict):
    words = json_details_dict['images'][0]['words']
    list_polygons = []
    for word_label in words:
        list_polygons.append(word_label['polygon'])
    list_polygons_tuples = []
    for polygon_obj_list in list_polygons:
        list_of_tuples = []
        for objs in polygon_obj_list:
            # print(objs)
            list_of_tuples.append((objs["x"], objs["y"]))
        list_polygons_tuples.append(list_of_tuples)
    return list_polygons_tuples
