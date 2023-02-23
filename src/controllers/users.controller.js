import userModel from '../models/users.model.js';

const usersController = {
  getAll: async (req, res, next) => {
    try {
      const users = await userModel.getAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  },

  get: async (req, res, next) => {
    try {
      const user = await userModel.getOne(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      if (!req.user || req.user.id !== Number(req.params.id)) {
        res.status(401).json({ error: 'Unauthorized' });
      } else {
        const user = await userModel.update(req.params.id, req.body);
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      }
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      if (req.params && req.params.id == null) {
        res.status(403).json({ error: 'User not found' });
      }
      if (!req.user || req.user?.id !== req.params.id) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const user = await userModel.delete(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      next(error);
    }
  },
};
export default usersController;
