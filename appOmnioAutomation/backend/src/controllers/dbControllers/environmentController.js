const Environment = require('../../db/models/environment');

exports.createEnvironment = async (req, res) => {
  const { name, description } = req.body;

  try {
    // Verificar si ya existe un environment con el mismo nombre
    const existingEnvironment = await Environment.findOne({ name });

    if (existingEnvironment) {
      return res
        .status(400)
        .json({ message: 'An environment with the same name already exists' });
    }

    // Si no existe, crear un nuevo environment
    const environment = new Environment({
      name,
      description,
    });

    const savedEnvironment = await environment.save();
    res.status(201).json({
      message: 'The environment has been created successfully',
      environment: savedEnvironment,
    });
  } catch (err) {
    res.status(400).json({
      message: 'Error saving the environment',
      error: err.message,
    });
  }
};

exports.getEnvironments = async (req, res) => {
  try {
    const environments = await Environment.find();
    res.json(environments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
