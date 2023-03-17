import format from 'pg-format';
import qs from 'qs';
import pool from '../../db.js';

const queryBuilder = {
  clauseBuilder: (queryString) => {
    // Je transforme la query string en objet
    // les paramètres séparés par des virgules sont transformés en tableau
    // ex: ?sort=-name,createdAt devient { sort: ['-name', 'createdAt'] }
    const query = qs.parse(queryString, { comma: true });

    /**
     * SORT
     */

    // Je construis la clause ORDER BY, vide par défaut
    let sort = '';
    // Si la query contient un paramètre sort
    if (query.sort) {
      // Je construis un tableau de paramètres de tri
      const sortItems = query.sort.map((item) => {
        // Si le paramètre commence par un tiret, je le transforme en DESC
        if (item.startsWith('-')) {
          return `${item.slice(1)} DESC`;
        }
        // Sinon, je le transforme en ASC
        return `${item} ASC`;
      });
      // Je construis la clause ORDER BY, en utilisant la fonction format de pg-format
      // pour empêcher les injections SQL
      sort = format.withArray('ORDER BY %s', sortItems);
    }

    /**
     * LIMIT
     */
    let limit = '';
    if (queryString.limit) {
      limit = `LIMIT ${queryString.limit}`;
    }

    /**
     * FILTERS
     */

    // Je supprime les paramètres sort et limit de l'objet query
    // pour ne garder que les filtres
    const queryFilters = query;
    delete queryFilters.sort;
    delete queryFilters.limit;

    // Je construis la clause WHERE, vide par défaut
    let filters = '';
    // Si la query contient des filtres
    if (queryFilters && Object.keys(queryFilters).length > 0) {
      // Je construis un tableau de paramètres de filtre
      const filterItems = Object.keys(queryFilters).map((item) => {
        return `${item} = ${queryFilters[item]}`;
      });

      /**
      Je construis la clause WHERE,
      j'effectue un join sur le tableau de paramètres de filtre
      pour obtenir une chaîne de caractères séparée par des AND (sql)
      puis je formate la chaîne avec la fonction format de pg-format 
      pour empêcher les injections SQL
      ex: ['name = "John"', 'age = 25'] devient 'name = "John" AND age = 25'
      */

      filters = format('WHERE %s', filterItems.join(' AND '));
    }

    return {
      filters,
      sort,
      limit,
      query: `${filters} ${sort} ${limit}`,
    };
  },

  /**
   * Je construis une fonction execute qui prend en paramètre les clauses de la requête,
   * créees par la fonction clauseBuilder
   */
  execute: async ({ query, values, clauses }) => {
    // je formatte la requête avec les clauses
    // pour obtenir une requête complète et éviter les injections SQL
    const queryString = format(
      `%s %s;
      `,
      query,
      clauses
    );

    // j'execute la requête, avec les valeurs associées si besoin
    // j'utilise les queries paramétrées de node-postgres pour éviter les injections SQL
    return pool.query(queryString, values);
  },
};

export default queryBuilder;
