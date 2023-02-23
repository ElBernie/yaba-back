import { Router } from 'express';
import BudgetsController from '../controllers/budgets.controller.js';
import authentification from '../middlewares/auth.middleware.js';

const budgetsRouter = Router();

budgetsRouter.get('/', BudgetsController.getAll);
budgetsRouter.get('/:id(\\d+)', BudgetsController.getOne);
budgetsRouter.post('/', authentification, BudgetsController.create);
budgetsRouter.patch('/:id(\\d+)', authentification, BudgetsController.update);
budgetsRouter.delete('/:id(\\d+)', authentification, BudgetsController.delete);

export default budgetsRouter;
