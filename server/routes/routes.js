import express from 'express';
import auth from '../middlewares/auth';
import admin from '../middlewares/admin';
import Users from '../controllers/users';
import Cars from '../controllers/carsadvert';
import Orders from '../controllers/purchaseorders';
import { imageUploader } from '../middlewares/claudinary';
// defining middleware routes
const router = express.Router();
// Users routes
router.post('/api/v2/auth/signup', Users.create);
router.post('/api/v2/auth/signup/admin', [auth, admin], Users.admincreate);
router.post('/api/v2/auth/signin', Users.signin);
router.get('/api/v2/users', [auth, admin], Users.everyusers);
router.get('/api/v2/users/:id', [auth, admin], Users.specificuser);
// router.get('/api/v2/users/:id', [auth, admin], Users.specificuser);
router.delete('/api/v2/users/:id', [auth, admin], Users.deleteoneuser);
router.get('/api/v2/user/me', [auth], Users.currentuser);
router.put('/api/v2/:email/reset_password', Users.resetpassword);
// Cars advert routes
router.post('/api/v2/car', [auth, imageUploader], Cars.create);
router.get('/api/v2/cars', Cars.cars);
router.patch('/api/v2/car/:id/status', [auth], Cars.updatecarstatus);
router.patch('/api/v2/car/:id/price', [auth], Cars.updateprice);
router.get('/api/v2/cars/:id', Cars.getonecar);
router.get('/api/v2/status/cars', Cars.unsoldcars);
router.get('/api/v2/range/cars', Cars.unsoldcarsrange);
router.delete('/api/v2/cars/:id', [auth], Cars.deletecaradvert);
router.get('/api/v2/cars/available/new', Cars.availablenewcars);
router.get('/api/v2/cars/available/used', Cars.availableusedcars);
router.get('/api/v2/cars/available/manufacturer', Cars.availablemanufactures);
router.get('/api/v2/cars/available/bodytype', Cars.availablebodytypes);
// Purchasing order routes
router.post('/api/v2/order', [auth], Orders.create);
router.get('/api/v2/orders', [auth, admin], Orders.orders);
router.patch('/api/v2/:id/price', [auth], Orders.patchOrderPrice);
export default router;
