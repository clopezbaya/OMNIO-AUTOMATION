const express = require('express');
const { exec } = require('child_process');
const path = require('path');

const app = express();
app.use(express.json());

app.get('/run', async (req, res) => {
  const testDir = path.join(__dirname);
  exec('npm run test:smoke', { cwd: testDir }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing tests: ${error.message}`);
      return res
        .status(500)
        .json({ error: `Error executing tests: ${error.message}` });
    }
    if (stderr) {
      console.error(`Test stderr: ${stderr}`);
      return res.status(500).json({ error: `Test stderr: ${stderr}` });
    }

    console.log(`Test stdout: ${stdout}`);
    return res.json({ message: 'Tests executed successfully', output: stdout });
  });

  exec('npm run report', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
});

app.listen(3002, () => {
  console.log('Automation framework is running on port 3002');
});
