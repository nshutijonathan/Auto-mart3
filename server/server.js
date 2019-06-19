import '@babel/polyfill/noConflict';
// importing express
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import swaggerUi from 'swagger-ui-express';

import swaggerDocument from '../swagger.json';
import router from './routes/routes';

// creating app instance
const app = express();

// body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);
dotenv.config();
// console.log(`${process.env.NODE_ENV}`);
// home route
app.get('/', (req, res) => {
  return res.status(200).send({
    status: 200,
    message: 'welcome to Auto-Mart3'
  });
});
// process environment
const port = process.env.PORT || 3000;
app.use('/apis-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(port);
export default app;
