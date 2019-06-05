import '@babel/polyfill/noConflict';
// importing express
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './routes/routes';

console.log(`NODE_ENV:${process.env.NODE_ENV}`);
console.log(`NODE_ENV:${process.env.jwtPrivateKey}`);
// creating app instance
const app = express();
console.log(`env':${app.get('env')}`);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
dotenv.config();
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
