import pg from 'pg';

/**
 * Création du pool de connexion à la base de données
 * =========
 * Je ne passe pas de paramètre, node-postgres charge automatiquement
 * les variables d'environnement définies dans le fichier .env
 */
const pool = new pg.Pool();

// On exporte le pool de connexion pour le réutiliser
export default pool;
