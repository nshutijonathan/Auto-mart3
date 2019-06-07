import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Usershelpers = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }
};
export default Usershelpers;
