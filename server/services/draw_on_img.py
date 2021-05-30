import numpy as np
from PIL import ImageColor, Image, ImageDraw
from matplotlib.pyplot import imshow

colors_list = [
    ImageColor.getrgb("blue"),
    ImageColor.getrgb("purple"),
    ImageColor.getrgb("cyan"),
    ImageColor.getrgb("yellow"),
    ImageColor.getrgb("orange"),
    ImageColor.getrgb("black"),
    ImageColor.getrgb("red"),
    ImageColor.getrgb("ghostwhite"),
    ImageColor.getrgb("pink"),
    ImageColor.getrgb("brown")
]


def draw_polygon_on_image(image, xy_list, color):
    draw = ImageDraw.Draw(image)
    draw.polygon(xy_list, outline=color)


def mark_all_words(image_location, imagename, words_polygons):
    try:
        with Image.open(image_location) as im:
            colors_index = 0
            for word_poly in words_polygons:
                draw_polygon_on_image(im, word_poly, color=colors_list[colors_index % len(colors_list)])
                colors_index = colors_index + 1
            imshow(np.asarray(im))
            # im.show()
            im.save("./static/images/" + "polygon_" + imagename)
            return True
    except Exception:
        print(str(Exception))
        return False
