import Budget from '../models/budget.model.js';
import queryBuilder from '../services/query.service.js';

const BudgetsController = {
  getAll: async (req, res, next) => {
    try {
      const queryOptions = queryBuilder.clauseBuilder(req.query);
      const budgets = await Budget.getAll(queryOptions);
      res.json(budgets);
    } catch (error) {
      next(error);
    }
  },

  getOne: async (req, res, next) => {
    try {
      const budget = await Budget.getOne(req.params.id);
      if (budget) {
        res.json(budget);
      } else {
        res.status(404).json({ error: 'Budget not found' });
      }
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      if (!req.user || !req.user.id) {
        res.status(401).json({ error: 'Unauthorized' });
      }
      const budget = await Budget.create({
        userId: req.user.id,
        ...req.body,
      });
      res.status(201).json(budget);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    console.log('BODY', req.body);
    try {
      const budget = await Budget.getOne(req.params.id);
      if (!budget) {
        res.status(404).json({ error: 'Not found' });
      }
      if (budget.user_id !== req.user.id) {
        res.status(403).json({ error: 'Unauthorized' });
      }

      const newBudget = await Budget.update(budget.id, req.body);
      res.json(newBudget);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const budget = await Budget.getOne(req.params.id);
      if (!budget) {
        res.status(404).json({ error: 'Not found' });
      }
      if (budget.user_id !== req.user.id) {
        res.status(401).json({ error: 'Unauthorized' });
      }

      const deletedBudget = await Budget.delete(budget.id);
      res.status(204).json(deletedBudget);
    } catch (error) {
      next(error);
    }
  },
};

export default BudgetsController;
