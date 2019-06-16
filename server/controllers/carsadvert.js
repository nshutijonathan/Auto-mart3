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
    const createQuery = `INSERT INTO cars(owner,created_on,state,status,price,manufacturer,model,body_type,photo)
		VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) returning *`;
    const values = [
      req.body.owner = owner,
      req.body.created_on = date,
      req.body.state,
      req.body.status,
      req.body.price,
      req.body.manufacturer,
      req.body.model,
      req.body.body_type,
      req.body.photo
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
            status: rows[0].status,
            photo: rows[0].photo
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
  async allcars(req, res) {
  	try {
  		const text = 'SELECT * FROM cars';
  		const { rows } = await pool.query(text);
  		return res.status(200).send({
        status: 200,
        message: 'Cars adverts retrieved successfully',
        data: rows
      });
  	} catch (error) {
  		return res.status(400).send({
        message: error.message
      });
  	}
  },
  async updatecarstatus(req, res) {
    try {
      if (Carsvalidations.statusupdate(req, res)) {
        const CarId = parseInt(req.params.id, 10);
        const FindCar = 'SELECT * FROM cars where id=$1';
        const FoundCar = await pool.query(FindCar, [CarId]);
        if (FoundCar.rowCount === 0) {
          return res.status(404).send({
            status: 404,
            message: `Car with id ${req.params.id} not found`

          });
        }
        console.log(FoundCar.rows[0]);
        if (req.user.id !== FoundCar.rows[0].owner) {
          return res.status(401).send({
            status: 401,
            message: `The Car with ${req.params.id} id  is not Yours`
          });
        }
        const SellerId = FoundCar.rows[0].owner;
        const StatusUpdate = 'UPDATE cars SET status=$1 WHERE id=$2';
        const SellerEmail = 'SELECT * FROM users WHERE id=$1';
        const response = await pool.query(StatusUpdate, [req.body.status, CarId]);
        const SellerEmailResponse = await pool.query(SellerEmail, [SellerId]);
        return res.status(200).send({
          status: 200,
          message: `Car with id ${req.params.id} is successfully updated`,
          data: {
            id: FoundCar.rows[0].id,
            email: SellerEmailResponse.rows[0].email,
            created_on: FoundCar.rows[0].created_on,
            manufacturer: FoundCar.rows[0].manufacturer,
            model: FoundCar.rows[0].model,
            price: FoundCar.rows[0].price,
            state: FoundCar.rows[0].state,
            status: req.body.status

          }
        });
      }
    } catch (error) {
      return res.status(400).send({
        status: 400,
        message: error.message
      });
    }
  }
};
export default Cars;
