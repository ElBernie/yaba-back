import queryBuilder from '../services/query.service.js';

const userModel = {
  getAll: async () => {
    const { rows } = await queryBuilder.execute({
      query:
        'SELECT id, name, first_name, email, created_at, updated_at FROM "user"',
    });

    return rows;
  },

  getOne: async (id) => {
    const { rows } = await queryBuilder.execute({
      query:
        'SELECT id, name, first_name, email, created_at, updated_at FROM "user" WHERE id = $1',
      values: [id],
    });
    return rows[0];
  },

  getOneByEmail: async (email) => {
    const { rows } = await queryBuilder.execute({
      query:
        'SELECT id, name, first_name, email, password, created_at, updated_at FROM "user" WHERE email = $1',
      values: [email?.toLowerCase()],
    });

    return rows[0];
  },

  create: async (user) => {
    const { rows } = await queryBuilder.execute({
      query:
        'INSERT INTO "user" (name, first_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, name, first_name, email, created_at, updated_at',
      values: [
        user.name,
        user.first_name,
        user.email?.toLowerCase(),
        user.password,
      ],
    });

    return rows[0];
  },

  update: async (userId, user) => {
    const { rows } = await queryBuilder.execute({
      query:
        'UPDATE "user" SET name = COALESCE($1,name), first_name = COALESCE($2, first_name), email = COALESCE($3,email) WHERE id = $4 RETURNING id, name, first_name, email, created_at, updated_at',
      values: [user.name, user.first_name, user.email?.toLowerCase(), userId],
    });

    return rows[0];
  },

  delete: async (id) => {
    const { rows } = await queryBuilder.execute({
      query: 'DELETE FROM "user" WHERE id = $1',
      values: [id],
    });

    return rows[0];
  },
};

export default userModel;
