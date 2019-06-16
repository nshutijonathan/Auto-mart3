import jwt from 'jsonwebtoken';
import pool from '../database/connect';
import Carsvalidations from '../validations/carsadvert';
import Ordersvalidations from '../validations/purchaseorders';

const date = new Date();

const Orders = {
  async create(req, res) {
    try {
      if (Ordersvalidations.create(req, res)) {
        const status = 'pending';
        const buyer = req.user.id;
        const checkUser = 'SELECT * FROM users WHERE id=$1';
        const FoundUser = await pool.query(checkUser, [buyer]);
        if (FoundUser.rowCount === 0) {
          return res.status(404).send({
            status: 404,
            message: 'create user account first'
          });
        }
        const carId = req.body.car_id;
        const checkCar = 'SELECT * FROM cars WHERE id=$1';
        const FoundCar = await pool.query(checkCar, [carId]);
        if (FoundCar.rowCount === 0) {
          return res.status(404).send({
            status: 404,
            message: `Car with id ${req.body.car_id} not Found`
          });
        }
        const carPrice = FoundCar.rows[0].price;
		 const createQuery = `INSERT INTO orders(buyer,car_id,created_on,amount,status)
		VALUES($1,$2,$3,$4,$5) returning *`;
        const values = [
	    buyer,
          req.body.car_id,
          date,
          req.body.amount,
          status
        ];


        const { rows } = await pool.query(createQuery, values);
        return res.status(201).send({
          status: 201,
          message: 'Car order is successfully created',
          data: {
            id: rows[0].id,
            car_id: rows[0].car_id,
            created_on: rows[0].created_on,
            status: rows[0].status,
            price: carPrice,
            price_offered: rows[0].amount,
          },
        });
      }
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: error.message
      });
    }
  }
  async allorders(req,res){
    try {
      const text = 'SELECT * FROM orders';
      const { rows } = await pool.query(text);
      return res.status(200).send({
        status: 200,
        message: 'all orders retrieved successfully',
        data: rows
      });
    } catch (error) {
      return res.status(400).send({
        message: error.message
      });
    }

  }
};
export default Orders;
