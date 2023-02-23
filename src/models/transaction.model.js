import queryBuilder from '../services/query.service.js';

const Transaction = {
  getAll: async (options) => {
    const { rows } = await queryBuilder.execute({
      query: `
        SELECT * FROM transactiosn
      `,
      clauses: options.query,
    });

    return rows;
  },

  getOne: async (id) => {
    const { rows } = await queryBuilder.execute({
      query: `SELECT * FROM transaction WHERE id = $1`,
      values: [id],
    });

    return rows[0];
  },

  create: async (transaction) => {
    const { rows } = await queryBuilder.execute({
      query: `INSERT INTO transaction (budget_id, category_id, name, amount, date) VALUES ($1, $2, $3, $4, $5, ) RETURNING *`,
      values: [
        transaction.budgetId,
        transaction.categoryId,
        transaction.name,
        transaction.amount,
        transaction.type,
      ],
    });

    return rows[0];
  },

  update: async (id, transaction) => {
    const { rows } = await queryBuilder.execute({
      query: `UPDATE transaction SET budget_id = $1, category_id = $2, name= $3 amount = $4, date = $5 WHERE id = $6 RETURNING *`,
      values: [
        transaction.budgetId,
        transaction.categoryId,
        transaction.amount,
        transaction.description,
        transaction.date,
        id,
      ],
    });
    return rows[0];
  },

  delete: async (id) => {
    const { rows } = await queryBuilder.execute({
      query: `DELETE FROM transaction WHERE id = $1 RETURNING *`,
      values: [id],
    });

    return rows[0];
  },
};

export default Transaction;
