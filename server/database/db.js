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
  const Queries = `${Users}`;
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
  pool.query(Users)
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
  const Admin = `INSERT INTO users (email,first_name,last_name,password,address,user_type,is_admin)
	VALUES ('nshutii@gmail.com','nshuti','jonathan','jonathan','kigali','admin','True') ON CONFLICT DO NOTHING returning * `;
  pool.query(Admin).then((res) => {
    console.log(res);
    pool.end();
  }).catch((err) => {
    console.log(err.message);
    pool.end();
  });
};
require('make-runnable');
