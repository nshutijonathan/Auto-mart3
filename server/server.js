import '@babel/polyfill/noConflict';
// importing express
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
// creating app instance
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
