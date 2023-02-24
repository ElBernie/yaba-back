import Category from '../models/category.model.js';
import queryBuilder from '../services/query.service.js';

const categoriesController = {
  getAll: async (req, res, next) => {
    try {
      const queryOptions = queryBuilder.clauseBuilder(req.query);
      const categories = await Category.getAll(queryOptions);
      res.json(categories);
    } catch (error) {
      next(error);
    }
  },

  getOne: async (req, res, next) => {
    try {
      const category = await Category.getOne(req.params.id);
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ error: 'Not found' });
      }
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const category = await Category.create({
        userId: req.user.id,
        name: req.body.name,
        color: req.body.color || '#ffffff',
      });
      res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const category = await Category.getOne(req.params.id);
      if (!category) {
        res.status(404).json({ error: 'Not found' });
      }
      if (category.user_id !== req.user.id) {
        res.status(403).json({ error: 'Unauthorized' });
      }

      const updatedCategory = await Category.update(category.id, req.body);
      res.json(updatedCategory);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const category = await Category.getOne(req.params.id);
      if (!category) {
        res.status(404).json({ error: 'Not found' });
      }
      if (category.user_id !== req.user.id) {
        res.status(401).json({ error: 'Unauthorized' });
      }

      const deletedCategory = await Category.delete(category.id);
      res.json(deletedCategory);
    } catch (error) {
      next(error);
    }
  },
};

export default categoriesController;
