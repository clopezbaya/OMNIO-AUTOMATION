const express = require('express');
const testRoutes = require('./routes/testRoutes');

const app = express();
const port = 5000;

app.use(express.json());
app.use('/', testRoutes);

app.listen(port, () => {
  console.log(`Backend is running on port: ${port}`);
});
