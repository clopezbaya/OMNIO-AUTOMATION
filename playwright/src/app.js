import express from 'express';
import testRoutes from './routes/testRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Crear __dirname manualmente en ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3002;

app.use(express.json());
app.use('/', testRoutes);

// Configurar la carpeta 'playwright-report' para servir los archivos estáticos
app.use(
  '/reports',
  express.static(path.join(__dirname, '../playwright-report'))
);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Automation framework is running on port ${PORT}`);
});

//app.keepAliveTimeout = 120 * 1000;
