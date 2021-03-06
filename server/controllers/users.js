import jwt from 'jsonwebtoken';
import Usershelpers from '../helpers/users';
import pool from '../database/connect';
import Usersvalidations from '../validations/users';

const Users = {
  async  create(req, res) {
    const hashpassword = Usershelpers.hashPassword(req.body.password);
    const createQuery = `INSERT INTO users(email,first_name,last_name,password,address,user_type,is_admin)
		VALUES($1,$2,$3,$4,$5,$6,$7) returning *`;
    const values = [
      req.body.email,
      req.body.first_name,
      req.body.last_name,
      hashpassword,
      req.body.address,
      req.body.user_type,
      req.body.is_admin
    ];
    try {
      if (Usersvalidations.create(req, res)) {
        const { rows } = await pool.query(createQuery, values);
        const token = jwt.sign({
          id: rows[0].id, email: rows[0].email, user_type: rows[0].user_type, is_admin: rows[0].is_admin
        }, 'jwtPrivateKey');
        return res.status(201).send({
          status: 201,
          message: 'User successfully created',
          data: {
            token,
            id: rows[0].id,
            first_name: rows[0].first_name,
            last_name: rows[0].last_name,
            user_type: rows[0].user_type,
            is_admin: rows[0].is_admin
          }
        });
      }
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(409).send({
          status: 409,
          message: 'User with that Email already exists'
        });
      }

      return res.status(400).send({
        status: 400,
        message: error.message
      });
    }
  },
  async  admincreate(req, res) {
    const email = [req.user.email];
    const checkUser = 'SELECT * FROM users WHERE email=$1';
    const FoundUser = await pool.query(checkUser, email);
    if (FoundUser.rowCount === 0) {
      return res.status(404).send({
        status: 404,
        message: "This token can't create an admin,token owner is no longer in db"
      });
    }
    const hashpassword = Usershelpers.hashPassword(req.body.password);
    const createQuery = `INSERT INTO users(email,first_name,last_name,password,address,user_type,is_admin)
    VALUES($1,$2,$3,$4,$5,$6,$7) returning *`;
    const values = [
      req.body.email,
      req.body.first_name,
      req.body.last_name,
      hashpassword,
      req.body.address,
      req.body.user_type,
      req.body.is_admin
    ];
    try {
      if (Usersvalidations.admin(req, res)) {
        const { rows } = await pool.query(createQuery, values);
        const token = jwt.sign({
          id: rows[0].id, email: rows[0].email, user_type: rows[0].user_type, is_admin: rows[0].is_admin
        }, 'jwtPrivateKey');
        return res.status(201).send({
          status: 201,
          message: 'Admin successfully created',
          data: {
            token,
            id: rows[0].id,
            first_name: rows[0].first_name,
            last_name: rows[0].last_name,
            user_type: rows[0].user_type,
            is_admin: rows[0].is_admin
          }
        });
      }
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(409).send({
          status: 409,
          message: 'User with that Email already exists'
        });
      }
      return res.status(400).send({
        status: 400,
        message: error.message
      });
    }
  },
  async signin(req, res) {
    if (!(req.body.email) || (!(req.body.password))) {
      return res.status(400).send({
        status: 400,
        message: 'Some values are missing'
      });
    }
    const text = 'SELECT * FROM users WHERE email=$1';
    try {
      const { rows } = await pool.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(401).send({
          status: 401,
          message: 'INVALID email or password'
        });
      }
      if (!Usershelpers.comparePassword(rows[0].password, req.body.password)) {
        return res.status(401).send({
          status: 401,
          message: 'INVALID email or password'
        });
      }
      const token = jwt.sign({
        id: rows[0].id, email: rows[0].email, user_type: rows[0].user_type, is_admin: rows[0].is_admin
      }, 'jwtPrivateKey');
      return res.status(200).send({
        status: 200,
        message: 'Logged in successfully',
        data: {
          token,
          id: rows[0].id,
          first_name: rows[0].first_name,
          last_name: rows[0].last_name,
          user_type: rows[0].user_type,
          is_admin: rows[0].is_admin
        }
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: error.message
      });
    }
  },
  async resetpassword(req, res) {
    const text = 'SELECT * FROM users WHERE email=$1';

    try {
      const { rows } = await pool.query(text, [req.params.email]);
      if (!rows[0]) {
        return res.status(401).send({
          status: 401,
          message: 'INVALID email or old password'
        });
      }
      if (!Usershelpers.comparePassword(rows[0].password, req.body.old_password)) {
        return res.status(401).send({
          status: 401,
          message: 'INVALID email or old password'
        });
      }
      const hashpassword = Usershelpers.hashPassword(req.body.new_password);
      const pswdreset = 'UPDATE users SET password=$1 WHERE email=$2';
      await pool.query(pswdreset, [hashpassword, req.params.email]);
      return res.status(200).send({
        status: 200,
        message: `User password with ${req.params.email} email is successfully reset`
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: error.message
      });
    }
  },
  async  everyusers(req, res) {
    try {
      const text = 'SELECT * FROM users';
      const { rows } = await pool.query(text);
      return res.status(200).send({
        status: 200,
        message: 'Users retrieved successfully',
        data: rows
      });
    } catch (error) {
      return res.status(400).send({
        message: error.message
      });
    }
  },
  async specificuser(req, res) {
    const user_id = req.params.id;
    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE id=$1', [user_id]);

      if (rows.length > 0) {
        return res.status(200).send({
          status: 200,
          message: `User with id ${req.params.id} retrieved successfully`,
          data: rows[0]
        });
      }
      return res.status(404).send({
        status: 404,
        message: `User with id ${req.params.id} not found`
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: error.message
      });
    }
  },
  async currentuser(req, res) {
    const user_id = req.user.id;
    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE id=$1', [user_id]);
      if (rows.length > 0) {
        return res.status(200).send({
          status: 200,
          message: 'Current user retrieved successfully',
          data: req.user
        });
      }
      return res.status(404).send({
        status: 404,
        message: 'Current user User not found'
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: error.message
      });
    }
  },

  async deleteoneuser(req, res) {
    const user_id = req.params.id;
    const Deletequery = 'DELETE FROM users WHERE id=$1 returning *';
    try {
      const { rows } = await pool.query(Deletequery, [user_id]);
      if (!rows[0]) {
        return res.status(404).send({
          status: 404,
          message: `User with id ${req.params.id} not found`
        });
      }
      return res.status(200).send({
        status: 200,
        message: `User with id ${req.params.id} deleted successfully`
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: error.message
      });
    }
  }
};
export default Users;
