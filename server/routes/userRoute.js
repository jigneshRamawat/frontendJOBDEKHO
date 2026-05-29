import express from 'express';
import { getAllUser, getIndividualUser, login, register } from '../controllers/userControllers.js';
import { registerValidator } from '../validations/userValidate.js';
import { limit } from '../middlewares/rateLimiting.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', limit, login);
router.get('/', getAllUser);
router.get('/:id', getIndividualUser);

export { router };