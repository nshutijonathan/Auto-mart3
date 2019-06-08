import cloudinary from 'cloudinary';
import Cars from '../controllers/carsadvert';

cloudinary.config({
  cloud_name: 'nshuti-jonathan',
  api_key: '544333244992847',
  api_secret: '22qVCADtxm-qu4NE6j_qKhNUA_U'


});
export const imageUploader = (req, res, next) => {
  console.log(req.body.photo);
  cloudinary.v2.uploader.upload(req.body.photo, (error, result) => {
    if (result) {
      req.body.photo = result.secure_url;
      console.log(req.body.photo);
    }
    if (error) {
    	console.log(error.message);
      return res.status(404).send({
        status: 404,
        message: 'Invalid URl of the photo'
      });
    }
    return next();
  });
};
