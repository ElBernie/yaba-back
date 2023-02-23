import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/users.model.js';

const AuthController = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await UserModel.getOneByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          firstName: user.first_name,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1d',
        }
      );
      return res.json({ token });
    } catch (error) {
      next(error);
    }
  },

  register: async (req, res, next) => {
    try {
      const { name, firstName, email, password } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await UserModel.create({
        name,
        firstName,
        email,
        password: hashPassword,
      });
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
};

export default AuthController;
