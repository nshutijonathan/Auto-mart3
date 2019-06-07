import express from 'express';
import auth from '../middlewares/auth';
import admin from '../middlewares/admin';
import Users from '../controllers/users';
import Cars from '../controllers/carsadvert';
// defining middleware routes
const router = express.Router();
// Users routes
router.post('/api/v2/auth/signup', Users.create);
router.post('/api/v2/auth/signup/admin', [auth, admin], Users.admincreate);
router.post('/api/v2/auth/signin', Users.signin);
router.get('/api/v2/users', [auth, admin], Users.allusers);
router.get('/api/v2/users/:id', [auth, admin], Users.oneuser);
router.delete('/api/v2/users/:id', [auth, admin], Users.deleteoneuser);
// Cars advert routes

router.post('/api/v2/car', [auth], Cars.create);
export default router;
