import queryBuilder from '../services/query.service.js';

const Category = {
  getAll: async (options) => {
    const { rows } = await queryBuilder.execute({
      query: `
          SELECT * FROM category
          `,
      clauses: options.query,
    });

    return rows;
  },

  getOne: async (id) => {
    const { rows } = await queryBuilder.execute({
      query: `SELECT * FROM category WHERE id = $1`,
      values: [id],
    });

    return rows[0];
  },

  create: async (category) => {
    const { rows } = await queryBuilder.execute({
      query:
        'INSERT INTO category (user_id, name, color) VALUES ($1, $2, $3) RETURNING *',
      values: [category.userId, category.name, category.color],
    });

    return rows[0];
  },

  update: async (id, category) => {
    const { rows } = await queryBuilder.execute({
      query:
        'UPDATE category SET name = COALESCE($1,name), color = COALESCE($2,color) WHERE id = $3 RETURNING *',
      values: [category.name, category.color, id],
    });

    return rows[0];
  },

  delete: async (id) => {
    const { rows } = await queryBuilder.execute({
      query: 'DELETE FROM category WHERE id = $1 RETURNING *',
      values: [id],
    });

    return rows[0];
  },
};

export default Category;
