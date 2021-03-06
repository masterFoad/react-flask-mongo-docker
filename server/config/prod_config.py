from flask_cors import CORS

current_env = "dev"
# current_env = "prod"

if current_env == 'dev':
    db_host = "localhost"
else:
    db_host = "mongo"

def init_config(app):
    app.config['MAX_CONTENT_LENGTH'] = 1024 * 1024 * 30
    app.config['UPLOAD_EXTENSIONS'] = ['.jpg', '.png', '.jpeg']
    app.config['UPLOAD_PATH'] = './static/images'
    app.config['UPLOAD_PATH_JSON'] = './static/jsons'
    CORS(app)
