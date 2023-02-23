import { Router } from 'express';
import authentification from '../middlewares/auth.middleware.js';
import categoriesController from '../controllers/categories.controller.js';

const categoriesRouter = Router();

categoriesRouter.get('/', categoriesController.getAll);
categoriesRouter.get('/:id(\\d+)', categoriesController.getOne);
categoriesRouter.post('/', authentification, categoriesController.create);
categoriesRouter.patch(
  '/:id(\\d+)',
  authentification,
  categoriesController.update
);
categoriesRouter.delete(
  '/:id(\\d+)',
  authentification,
  categoriesController.delete
);

export default categoriesRouter;
