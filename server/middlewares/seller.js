// Role based authentications Implementation
const seller = (req, res, next) => {
  if (!(req.user.user_type === 'seller')) {
    return res.status(403).send({
      status: 403,
      message: 'Access denied.Only seller can post car ad'
    });
  }
  next();
};
export default seller;
