import express from 'express';
import testRoutes from './routes/testRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3002;

app.use(express.json());
app.use('/', testRoutes);

app.use(
  '/reports',
  express.static(path.join(__dirname, '../playwright-report'))
);

app.listen(PORT, () => {
  console.log(`Automation framework is running on port ${PORT}`);
});
