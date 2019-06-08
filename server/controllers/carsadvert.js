import jwt from 'jsonwebtoken';
import pool from '../database/connect';
import Carsvalidations from '../validations/carsadvert';

const date = new Date();
const Cars = {
  async  create(req, res) {
    const email = [req.user.email];
    const emailvalue = req.user.email;
    const owner = req.user.id;
    const checkUser = 'SELECT * FROM users WHERE email=$1';
    const FoundUser = await pool.query(checkUser, email);
    if (FoundUser.rowCount === 0) {
    	return res.status(404).send({
    		status: 404,
    		message: 'create user account first'
    	});
    }
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
    	if (Carsvalidations.createcarsad(req, res)) {
        const { rows } = await pool.query(createQuery, values);
        return res.status(201).send({
          status: 201,
          message: 'Car advert is successfully created',
          data: {
            id: rows[0].id,
            email: emailvalue,
            created_on: date,
            manufacturer: rows[0].manufacturer,
        	model: rows[0].model,
            price: rows[0].price,
            state: rows[0].state,
            status: rows[0].status
          }

        });
      }
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: error.message
      });
    }
  },
};
export default Cars;
