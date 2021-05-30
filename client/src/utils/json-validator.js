import * as yup from 'yup';

export const gallery_schema = yup.object().shape({
  image_path: yup.string().required(),
  image_path_polygon: yup.string().required(),
  category: yup.string().required(),
  "sub-category" : yup.string().required(),
});



