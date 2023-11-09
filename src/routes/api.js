import { Router } from 'express';

// Middlewares
import authenticated from '../middlewares/authenticated.js';

// Controllers
import authController from '../controllers/authController.js';
import customerController from '../controllers/customerController.js';
import userController from '../controllers/userController.js';

// Initializing new router
const apiRouter = Router();

// Authentication endpoints
apiRouter.post('/signin', authController.signIn);
apiRouter.post('/signup', authController.signUp);

// Customer endpoints
apiRouter.get('/customers', customerController.getCustomers);

// User endpoints
apiRouter.get('/users', authenticated, userController.getUsers);

export { apiRouter };