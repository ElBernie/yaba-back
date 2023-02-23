import { Router } from 'express';
import authentification from '../middlewares/auth.middleware.js';
import transactionController from '../controllers/transactions.controller.js';

const transactionsRouter = Router();

transactionsRouter.get('/', transactionController.getAll);
transactionsRouter.get('/:id(\\d+)', transactionController.getOne);
transactionsRouter.post('/', authentification, transactionController.create);
transactionsRouter.patch(
  '/:id(\\d+)',
  authentification,
  transactionController.update
);
transactionsRouter.delete(
  '/:id(\\d+)',
  authentification,
  transactionController.delete
);

export default transactionsRouter;
