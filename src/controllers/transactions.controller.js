import Transaction from '../models/transaction.model.js';
import Budget from '../models/budget.model.js';
import queryBuilder from '../services/query.service.js';

const transactionController = {
  getAll: async (req, res, next) => {
    try {
      const queryOptions = queryBuilder.clauseBuilder(req.query);
      const transactions = await Transaction.getAll(queryOptions);
      res.json(transactions);
    } catch (error) {
      next(error);
    }
  },

  getOne: async (req, res, next) => {
    try {
      const transaction = await Transaction.getOne(req.params.id);
      if (transaction) {
        res.json(transaction);
      } else {
        res.status(404).json({ error: 'Not found' });
      }
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const { amount } = req.body;
      const type = amount > 0 ? 'CREDIT' : 'DEBIT';
      const transaction = await Transaction.create({
        ...req.body,
        userId: req.user.id,
        type,
      });

      res.status(201).json(transaction);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const transaction = await Transaction.getOne(req.params.id);
      if (!transaction) {
        res.status(404).json({ error: 'Not found' });
      }

      const budget = await Budget.getOne(transaction.budget_id);
      if (!budget) {
        res.status(404).json({ error: 'Not found' });
      }

      if (budget.user_id !== req.user.id) {
        res.status(403).json({ error: 'Unauthorized' });
      }

      const updatedTransaction = await Transaction.update(
        transaction.id,
        req.body
      );
      res.json(updatedTransaction);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const transaction = await Transaction.getOne(req.params.id);
      if (!transaction) {
        res.status(404).json({ error: 'Not found' });
      }

      const budget = await Budget.getOne(transaction.budget_id);
      if (!budget) {
        res.status(404).json({ error: 'Not found' });
      }

      if (budget.user_id !== req.user.id) {
        res.status(401).json({ error: 'Unauthorized' });
      }

      const deletedTransaction = await Transaction.delete(transaction.id);
      res.status(204).json(deletedTransaction);
    } catch (error) {
      next(error);
    }
  },
};

export default transactionController;
