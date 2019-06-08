import bcrypt from 'bcrypt';
import pool from './connect';

export const Createtables = () => {
  const Users = `CREATE TABLE IF NOT EXISTS 
	users(
	id SERIAL PRIMARY KEY,
	email VARCHAR(30) UNIQUE NOT NULL,
	first_name VARCHAR(20) NOT NULL,
	last_name VARCHAR(20) NOT NULL,
	password VARCHAR(300) NOT NULL ,
	address VARCHAR(20) NOT NULL,
	user_type VARCHAR(20) NOT NULL,
	is_admin VARCHAR(10) NOT NULL
	)`;
  const Cars = `CREATE TABLE IF NOT EXISTS cars
  (
  id SERIAL PRIMARY KEY,
  owner INTEGER NOT NULL,
  created_on TIMESTAMP NOT NULL,
  state VARCHAR(30) NOT NULL,
  status VARCHAR(30) NOT NULL,
  price DECIMAL(12,2) NOT NULL,
  manufacturer VARCHAR(30) NOT NULL,
  model VARCHAR(30) NOT NULL,
  body_type VARCHAR(30) NOT NULL,
  FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE
  )`;
  const Queries = `${Users};${Cars}`;
  pool.query(Queries).then((res) => {
    console.log(res);
    pool.end();
  })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
export const Droptables = () => {
  const Users = 'DROP TABLE IF EXISTS Users';
  const Cars = 'DROP TABLE IF EXISTS cars';
  pool.query(Users);
  pool.query(Cars)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
  pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });
};
export const Adminindex = () => {
  const hash = bcrypt.hashSync('jonathan', 8);
  const Admin = `INSERT INTO users (email,first_name,last_name,password,address,user_type,is_admin)
	VALUES ('nshuti@gmail.com','nshuti','jonathan','${hash}','kigali','admin','true') ON CONFLICT DO NOTHING returning * `;
  pool.query(Admin).then((res) => {
    console.log(res);
    pool.end();
  }).catch((err) => {
    console.log(err.message);
    pool.end();
  });
};
require('make-runnable');
