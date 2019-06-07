// Role based authentications Implementation
const admin = (req, res, next) => {
  if (!(req.user.is_admin === 'true')) {
    return res.status(403).send({
      status: 403,
      message: 'Access denied.Only admin'
    });
  }
  next();
};
export default admin;
