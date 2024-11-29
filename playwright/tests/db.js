import pg from 'pg';

// Configuración del Pool de conexiones
const pool = new pg.Pool({
  user: 'postgres',
  host: '66.175.232.71',
  database: 'tenants',
  password: 'postgres',
  port: 31838,
  schema: 'tenantsshipedge_omnio_1732791739841',
});

export const query = (text, params) => pool.query(text, params);

export const closePool = async () => {
  await pool.end();
};
