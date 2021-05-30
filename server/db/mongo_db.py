import importlib
import os

import pymongo

config = importlib.import_module("config.prod_config")
img_model = importlib.import_module("model.image_details")
myclient = pymongo.MongoClient("mongodb://" + config.db_host + ":27017/")
mydb = myclient["images-data-db"]
img_data_col = mydb["image-data"]


def handle_insert_to_db(app, description, filename, inserted_id, json_details, title):
    print('handle_insert_to_db', filename, title)
    img_details_model = img_model.ImageDetails(title,
                                               description,
                                               os.path.join(app.config['UPLOAD_PATH'], filename),
                                               os.path.join(app.config['UPLOAD_PATH'], "polygon_" + filename),
                                               json_details)
    print("inserting to db")
    inserted_id = img_data_col.insert_one(img_details_model.to_dict()).inserted_id
    return inserted_id
