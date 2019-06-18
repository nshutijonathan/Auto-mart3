import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
let pool = {};
if (process.env.NODE_ENV === 'development') {
  pool = new Pool({
    connectionString: process.env.DATABASE_OG
  });

  pool.on('connect', () => {
    console.log(`connected to database ${process.env.DATABASE_URL}`);
  });
}
if (process.env.NODE_ENV === 'testing') {
  pool = new Pool({
    connectionString: process.env.DATABASE_TESTING

  });

  pool.on('connect', () => {
    console.log(`connected to database ${process.env.DATABASE_TESTING}`);
  });
}
if (process.env.NODE_ENV === 'production') {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });

  pool.on('connect', () => {
    console.log(`connected to database ${process.env.DATABASE_URL}`);
  });
}
export default pool;
