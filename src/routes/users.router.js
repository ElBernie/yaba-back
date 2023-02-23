import { Router } from 'express';
import userController from '../controllers/users.controller.js';
import authentification from '../middlewares/auth.middleware.js';

const usersRouter = Router();

usersRouter.get('/', userController.getAll);
usersRouter.get('/:id(\\d+)', userController.get);
usersRouter.patch('/:id(\\d+)', authentification, userController.update);
usersRouter.delete('/:id(\\d+)', authentification, userController.delete);

export default usersRouter;
