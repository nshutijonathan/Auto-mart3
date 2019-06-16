import jwt from 'jsonwebtoken';
import pool from '../database/connect';
import Carsvalidations from '../validations/carsadvert';
const date = new Date();

const Orders={
	async create(req,res){
		const status="pending";
		const buyer=req.user.id;
		 const createQuery = `INSERT INTO orders(buyer,car_id,amount,status)
		VALUES($1,$2,$3,$4) returning *`;
		const values=[
	    buyer
		req.body.car_id,
		req.body.amount,
		status
		];
		try{
			const {rows}=await pool.query(createQuery,values);
			return res.status(201).send({
				status:201,
				message:'Car is successfully created',
				data:rows[0]
			})
		}
		catch(error){
			return res.status(400).send({
				status:400,
				message:error.message
			})
		}

	}
}
export default Orders;
