import jwt from 'jsonwebtoken';
import pool from '../database/connect';

const Users = {
  async  create(req, res) {
    const createQuery = `INSERT INTO users(email,first_name,last_name,password,address,user_type,is_admin)
		VALUES($1,$2,$3,$4,$5,$6,$7) returning *`;
    const values = [
      req.body.email,
      req.body.first_name,
      req.body.last_name,
      req.body.password,
      req.body.address,
      req.body.user_type,
      req.body.is_admin
    ];
    try {
      const { rows } = await pool.query(createQuery, values);
      const token = jwt.sign({ id: rows[0].id, user_type: rows[0].user_type, is_admin: rows[0].is_admin }, 'jwtPrivateKey');
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
    } catch (error) {
      console.log(error.message);
      if (error.routine === '_bt_check_unique') {
        return res.status(400).send({
          status: 400,
          message: 'User with that Email already exists'
        });
      }
      return res.status(400).send({
        status: 400,
        message: error.message
      });
    }
  },
  async  allusers(req, res) {
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
  }
};
export default Users;
