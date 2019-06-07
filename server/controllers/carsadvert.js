import jwt from 'jsonwebtoken';
import pool from '../database/connect';

const date = new Date();
const Cars = {
  async  create(req, res) {
    const owner = req.user.id;
    const createQuery = `INSERT INTO cars(owner,created_on,state,status,price,manufacturer,model,body_type)
		VALUES($1,$2,$3,$4,$5,$6,$7,$8) returning *`;
    const values = [
      req.body.owner = owner,
      req.body.created_on = date,
      req.body.state,
      req.body.status,
      req.body.price,
      req.body.manufacturer,
      req.body.model,
      req.body.body_type
    ];
    try {
      const { rows } = await pool.query(createQuery, values);
      return res.status(201).send({
        status: 201,
        message: 'Car advert is successfully created'
      });
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: error.message
      });
    }
  },
};
export default Cars;
