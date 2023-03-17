import queryBuilder from '../services/query.service.js';

const Budget = {
  getAll: async (options) => {
    // je recupère uniquement les lignes de la table budget qui correspondent aux filtres
    const { rows } = await queryBuilder.execute({
      // j'ajoute une colonne amount à ma requête,
      // c'est la somme des montants des transactions liées au budget, sur la table transaction
      // si la somme est nulle, je retourne 0 (COALESCE)
      query: `
            SELECT *,
            (SELECT COALESCE(SUM(amount),0)
                FROM transaction 
                WHERE transaction.budget_id = budget.id
              ) as amount
            FROM budget
          `,
      // je passe les valeurs de la requête en paramètre, issue de queryBuilder
      clauses: options.query,
    });
    // je retourne les lignes de la table budget
    return rows;
  },

  getOne: async (id) => {
    const { rows } = await queryBuilder.execute({
      query: `
            SELECT *,
            (SELECT COALESCE(SUM(amount),0)
                FROM transaction 
                WHERE transaction.budget_id = budget.id
              ) as amount
            FROM budget
            WHERE id = $1
          `,
      values: [id],
    });
    return rows[0];
  },

  create: async (budget) => {
    const { rows } = await queryBuilder.execute({
      query: 'INSERT INTO budget (user_id, name) VALUES ($1, $2) RETURNING *',
      values: [budget.userId, budget.name],
      clauses: undefined,
    });
    return rows[0];
  },

  update: async (id, budget) => {
    const { rows } = await queryBuilder.execute({
      query: 'UPDATE budget SET name = $1 WHERE id = $2 RETURNING *',
      values: [budget.name, id],
    });

    return rows[0];
  },

  delete: async (id) => {
    const { rows } = await queryBuilder.execute({
      query: 'DELETE FROM budget WHERE id = $1 RETURNING *',
      values: [id],
    });

    return rows[0];
  },
};

export default Budget;
