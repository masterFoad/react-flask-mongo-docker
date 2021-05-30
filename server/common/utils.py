import importlib
import os
import shutil

from bson.objectid import ObjectId

db_access = importlib.import_module("db.mongo_db")


def clean_data():
    print('clean_data')
    if os.path.exists('./static/images'):
        shutil.rmtree('./static/images')

    if os.path.exists('./static/jsons'):
        shutil.rmtree('./static/jsons')

    os.mkdir('./static/images')
    os.mkdir('./static/jsons')
    db_access.img_data_col.drop()


def rollback_if_created(img_name, json_file_name, inserted_id, img_data_col, app):
    print('rollback_if_created', img_name, json_file_name, inserted_id, img_data_col)
    if os.path.exists(os.path.join(app.config['UPLOAD_PATH'], img_name)):
        os.remove((os.path.join(app.config['UPLOAD_PATH'], img_name)))

    if os.path.exists(os.path.join(app.config['UPLOAD_PATH_JSON'], json_file_name)):
        os.remove(os.path.join(app.config['UPLOAD_PATH_JSON'], json_file_name))

    if inserted_id:
        img_data_col.delete_one({'_id': ObjectId(inserted_id)})
