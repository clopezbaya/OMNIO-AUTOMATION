import express from 'express';
import testRoutes from './routes/testRoutes.js';

const app = express();
const PORT = 3002;

app.use(express.json());
app.use('/', testRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Automation framework is running on port ${PORT}`);
});
