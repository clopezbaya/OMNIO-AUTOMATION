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

exports.deleteEnvironment = async (req, res) => {
  try {
    const { id } = req.params;
    const environment = await Environment.findByIdAndDelete(id);
    if (!environment) {
      return res
        .status(404)
        .json({ message: `Cannot find the environment with ID ${id}` });
    }
    res.status(200).json({ message: `Environment deleted successfully` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEnvironment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatedEnvironment = await Environment.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true } // Opciones: devolver el nuevo documento actualizado y aplicar validaciones
    );

    if (!updatedEnvironment) {
      return res
        .status(404)
        .json({ message: `Cannot find the environment with ID ${id}` });
    }

    res.status(200).json({
      message: 'Environment updated successfully',
      environment: updatedEnvironment,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
