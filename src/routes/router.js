import Express from 'express';
import usersRouter from './users.router.js';
import authRouter from './auth.router.js';
import budgetsRouter from './budgets.router.js';
import categoriesRouter from './categories.router.js';
import transactionsRouter from './transaction.router.js';

const apiRouter = Express.Router();
apiRouter.use('/users', usersRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/budgets', budgetsRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/transactions', transactionsRouter);

export default apiRouter;
