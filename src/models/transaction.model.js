import queryBuilder from '../services/query.service.js';

const Transaction = {
  getAll: async (options) => {
    const { rows } = await queryBuilder.execute({
      query: `
        SELECT * FROM transaction
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
      query: `INSERT INTO transaction (budget_id, category_id, name, amount, type) VALUES ($1, $2, $3, $4, $5 ) RETURNING *`,
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
      query: `UPDATE transaction SET budget_id = COALESCE($1, budget_id), category_id = COALESCE($2,category_id), name = COALESCE($3,name), amount = COALESCE($4, amount), created_at = COALESCE($5, created_at) WHERE id = $6 RETURNING *`,
      values: [
        transaction.budgetId,
        transaction.categoryId,
        transaction.name,
        transaction.amount,
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
