import express from 'express';
import Users from '../controllers/users';

// defining middleware routes
const router = express.Router();
// Users routes
router.post('/api/v2/auth/signup', Users.create);
router.get('/api/v2/users', Users.allusers);
export default router;
