import '@babel/polyfill/noConflict';
// importing express
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import router from './routes/routes';
import pool from './database/connect';
// creating app instance
const app = express();

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
dotenv.config();
if (process.env.NODE_ENV === 'development') {
  console.log(`${process.env.DATABASE_URL} is enabled`);
}
if (process.env.NODE_ENV === 'testing') {
  console.log(`${process.env.DATABASE_TESTING} is enabled`);
}
if (process.env.NODE_ENV === 'production') {
  console.log(`${process.env.DATABASE_HEROKU} is enabled`);
}

console.log(`${app.get('env')}`);
console.log(`${process.env.NODE_ENV}`);
// home route
app.get('/', (req, res, next) => {
  return res.status(200).send({
    status: 200,
    message: 'welcome to Auto-Mart3'
  });
});
// process environment
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
export default app;
