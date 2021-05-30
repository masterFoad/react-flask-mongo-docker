class ImageDetails(object):
    def __init__(self, title, description, image_path, image_path_polygon, json_details):
        self.title = title
        self.description = description
        self.image_path = image_path
        self.image_path_polygon = image_path_polygon
        self.json_details = json_details

    def to_dict(self):
        return {
            "title": self.title,
            "description": self.description,
            "image_path": self.image_path,
            "image_path_polygon": self.image_path_polygon,
            "json_details": self.json_details
        }
