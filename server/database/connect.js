import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
let pool = {};
if (process.env.NODE_ENV === 'development') {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });

  pool.on('connect', () => {
    console.log('connected to database');
  });
}
if (process.env.NODE_ENV === 'testing') {
  pool = new Pool({
    connectionString: process.env.DATABASE_TESTING
  });

  pool.on('connect', () => {
    console.log('connected to database');
  });
}
if (process.env.NODE_ENV === 'production') {
  pool = new Pool({
    connectionString: process.env.DATABASE_HEROKU
  });

  pool.on('connect', () => {
    console.log('connected to database');
  });
}
export default pool;
