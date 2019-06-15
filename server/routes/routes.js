import express from 'express';
import auth from '../middlewares/auth';
import admin from '../middlewares/admin';
import Users from '../controllers/users';
import Cars from '../controllers/carsadvert';
import seller from '../middlewares/seller';
import { imageUploader } from '../middlewares/claudinary';
// defining middleware routes
const router = express.Router();
// Users routes
router.post('/api/v2/auth/signup', Users.create);
router.post('/api/v2/auth/signup/admin', [auth, admin], Users.admincreate);
router.post('/api/v2/auth/signin', Users.signin);
router.get('/api/v2/users', [auth, admin], Users.allusers);
router.get('/api/v2/users/:id', [auth, admin], Users.oneuser);
router.delete('/api/v2/users/:id', [auth, admin], Users.deleteoneuser);
router.get('/api/v2/user/me', [auth], Users.currentuser);
router.put('/api/v2/:email/reset_password', Users.resetpassword);
// Cars advert routes
router.post('/api/v2/car', [auth, seller, imageUploader], Cars.create);
router.get('/api/v2/cars', [auth], Cars.allcars);
export default router;
