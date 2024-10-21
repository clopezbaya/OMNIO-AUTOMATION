const Environment = require('../models/environment');

// Crear un nuevo environment
exports.createEnvironment = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Verificar si ya existe un environment con el mismo nombre
    const existingEnvironment = await Environment.findOne({ name });
    if (existingEnvironment) {
      return res.status(400).json({ message: 'El ambiente ya existe' });
    }

    // Crear un nuevo environment
    const newEnvironment = new Environment({
      name,
      description,
    });

    // Guardar en la base de datos
    await newEnvironment.save();

    res.status(201).json(newEnvironment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
