import format from 'pg-format';
import qs from 'qs';
import pool from '../../db.js';

const queryBuilder = {
  clauseBuilder: (queryString) => {
    const query = qs.parse(queryString, { comma: true });

    /**
     * SORT
     */
    let sort = '';
    if (query.sort) {
      const sortItems = query.sort.map((item) => {
        if (item.startsWith('-')) {
          return `${item.slice(1)} DESC`;
        }
        return `${item} ASC`;
      });
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
    const queryFilters = query;
    delete queryFilters.sort;
    delete queryFilters.limit;

    let filters = '';
    if (queryFilters && Object.keys(queryFilters).length > 0) {
      const filterItems = Object.keys(queryFilters).map((item) => {
        return `${item} = ${queryFilters[item]}`;
      });

      filters = format('WHERE %s', filterItems.join(' AND '));
    }

    return {
      filters,
      sort,
      limit,
      query: `${filters} ${sort} ${limit}`,
    };
  },

  execute: async ({ query, values, clauses }) => {
    const queryString = format(
      `%s %s;
      `,
      query,
      clauses
    );
    return pool.query(queryString, values);
  },
};

export default queryBuilder;
//   // filtering

//   // limit
//   // offset
//   // select
//   // let whereFilter;
//   // if(query.filter){
//   //   whereFilter = `WHERE ${query.filter}`
//   // }

//   console.log('QUERY', query);
