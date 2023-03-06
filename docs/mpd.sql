------------------------------------------------------------
-- Création des types de données custom
------------------------------------------------------------

-- Vérification du format d'une adresse email
CREATE DOMAIN email AS text
	CONSTRAINT valid_email CHECK ((VALUE ~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$'::text));


-- Vérification d'un code couleur hexadécimal (ex: #FFFFFF)
CREATE DOMAIN hex_color AS text
	CONSTRAINT hex_color CHECK ((VALUE ~* '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'::text));


-- Vérification du type de transaction, CREDIT ou DEBIT
CREATE DOMAIN transaction_type AS text
	CONSTRAINT transaction_type CHECK ((VALUE = ANY (ARRAY['CREDIT'::text, 'DEBIT'::text])));


-- Création de la table budget
CREATE TABLE budget (
    id integer NOT NULL,
    name text,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone,
    user_id integer NOT NULL
);

-- Ajout de la génération automatique de l'id, et de la valeur par défaut de la date de création
ALTER TABLE budget ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY;
ALTER TABLE budget ALTER COLUMN created_at SET DEFAULT now();



-- Création de la table category
CREATE TABLE category (
    id integer NOT NULL,
    user_id integer NOT NULL,
    name text NOT NULL,
    color hex_color NOT NULL,-- on utilise le type de données custom hex_color
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone
);
ALTER TABLE category ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY;
ALTER TABLE category ALTER COLUMN created_at SET DEFAULT now();


-- Création de la table transaction
CREATE TABLE transaction (
    id integer NOT NULL,
    budget_id integer NOT NULL,
    category_id integer NOT NULL,
    name text,
    type transaction_type NOT NULL,
    amount numeric NOT NULL,
    created_at time with time zone NOT NULL,
    updated_at time with time zone
);

ALTER TABLE transaction ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY;
ALTER TABLE transaction ALTER COLUMN created_at SET DEFAULT now();


-- Création de la table user, 
-- note: on utilise le mot clé "user" qui est un mot clé réservé en SQL, il faut donc l'entourer de guillemets
CREATE TABLE "user" (
    id integer NOT NULL,
    name text,
    first_name text NOT NULL,
    email email NOT NULL, -- on utilise le type de données custom email
    password text NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at time with time zone
);

ALTER TABLE "user" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY;
ALTER TABLE "user" ALTER COLUMN created_at SET DEFAULT now();
-- on ajoute une contrainte d'unicité sur l'email
ALTER TABLE IF EXISTS "user" ADD CONSTRAINT email_unique UNIQUE (email);

-- Création des clés primaires
ALTER TABLE ONLY budget
    ADD CONSTRAINT budget_pkey PRIMARY KEY (id);

ALTER TABLE ONLY category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);

ALTER TABLE ONLY transaction
    ADD CONSTRAINT transaction_pkey PRIMARY KEY (id);

ALTER TABLE ONLY "user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


-- Création des clés étrangères
CREATE INDEX fki_budget_fkey ON transaction USING btree (budget_id);

CREATE INDEX fki_category_fkey ON transaction USING btree (category_id);

CREATE INDEX fki_user_fkey ON budget USING btree (user_id);


-- création des relations au sein des tables
ALTER TABLE ONLY transaction
    ADD CONSTRAINT budget_fkey FOREIGN KEY (budget_id) REFERENCES budget(id) ON DELETE CASCADE;

ALTER TABLE ONLY transaction
    ADD CONSTRAINT category_fkey FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE;

ALTER TABLE ONLY budget
    ADD CONSTRAINT user_fkey FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE;

ALTER TABLE ONLY category
    ADD CONSTRAINT user_fkey FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE;

