## user

| FIELD      | TYPE        | DETAILS                                    | DESCRIPTION           |
| ---------- | ----------- | ------------------------------------------ | --------------------- |
| id         | INTEGER     | PK, NOT NULL, GENERATED ALWAYS AS IDENTITY | user id               |
| name       | TEXT        |                                            | User last name        |
| first_name | TEXT        | NOT NULL                                   | User first name       |
| email      | TEXT        | UNIQUE,NOT NULL                            | User email            |
| password   | TEXT        | NOT NULL                                   | User password, hashed |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT now()                     | creation date         |
| updated_at | TIMESTAMPTZ |                                            | last update date      |

## budget

| FIELD      | TYPE        | DETAILS                                          | DESCRIPTION               |
| ---------- | ----------- | ------------------------------------------------ | ------------------------- |
| id         | INTEGER     | PK, NOT NULL, GENERATED ALWAYS AS IDENTITY       | budget id                 |
| user_id    | INTEGER     | NOT NULL REFERENCES "user"(id) ON DELETE CASCADE | foreign key on user table |
| name       | TEXT        |                                                  | Budget name               |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT now()                           | creation date             |
| updated_at | TIMESTAMPTZ |                                                  | last update date          |

## category

| FIELD      | TYPE        | DETAILS                                          | DESCRIPTION               |
| ---------- | ----------- | ------------------------------------------------ | ------------------------- |
| id         | INTEGER     | PK, NOT NULL, GENERATED ALWAYS AS IDENTITY       | category id               |
| user_id    | INTEGER     | NOT NULL REFERENCES "user"(id) ON DELETE CASCADE | foreign key on user table |
| name       | TEXT        | NOT NULL                                         | Budget name               |
| color      | TEXT        | NOT NULL                                         | Budget color              |
| created_at | TIMESTAMPTZ | NOT NULL DEFAULT now()                           | creation date             |
| updated_at | TIMESTAMPTZ |                                                  | last update date          |

## transaction

| FIELD       | TYPE        | DETAILS                                              | DESCRIPTION                        |
| ----------- | ----------- | ---------------------------------------------------- | ---------------------------------- |
| id          | INTEGER     | PK, NOT NULL, GENERATED ALWAYS AS IDENTITY           | category id                        |
| budget_id   | INTEGER     | NOT NULL REFERENCES "budget"(id) ON DELETE CASCADE   | foreign key on budget table        |
| category_id | INTEGER     | NOT NULL REFERENCES "category"(id) ON DELETE CASCADE | foreign key on budget table        |
| name        | TEXT        |                                                      | Budget name                        |
| type        | TEXT        | NOT NULL                                             | Transaction type (CREDIT/DEBIT)    |
| amount      | NUMERIC     | NOT NULL                                             | Monetary amount of the transaction |
| created_at  | TIMESTAMPTZ | NOT NULL DEFAULT now()                               | creation date                      |
| updated_at  | TIMESTAMPTZ |                                                      | last update date                   |
