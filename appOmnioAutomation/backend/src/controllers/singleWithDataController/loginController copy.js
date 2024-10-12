const axios = require('axios');

exports.runTestLogin = async (req, res) => {
  console.log(
    'Enviando solicitud al servicio de Playwright para prueba single de Login...'
  );

  const playwrightServiceUrl = 'http://localhost:3002/login';
  let { username, password } = req.body;

  if (!username || !password) {
    username = '';
    password = '';
  }

  try {
    const response = await axios.post(playwrightServiceUrl, {
      username: username,
      password: password,
    });

    res.status(200).json({
      message: 'Tests executed successfully',
      results: response.data.reportUrl,
      reportJSON: response.data.reportJSON,
    });
  } catch (error) {
    console.error('Error to init tests', error.message);
    res.status(200).json({
      message: 'Tests executed with errors',
      results: error.response?.data?.reportUrl,
      reportJSON: error.response?.data?.reportJSON,
      error: error.response?.data?.message,
    });
  }
};
