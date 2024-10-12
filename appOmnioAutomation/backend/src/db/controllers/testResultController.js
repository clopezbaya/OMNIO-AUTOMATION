const TestResult = require('../models/testResult');
const Environment = require('../models/environment');

// Crear un nuevo test result y asociarlo a un environment
exports.createTestResult = async (req, res) => {
  try {
    const { environmentId, testType, result } = req.body;

    // Buscar el environment por su ID
    const environment = await Environment.findById(environmentId);
    if (!environment) {
      return res.status(404).json({ message: 'Ambiente no encontrado' });
    }

    // Crear un nuevo test result asociado al environment
    const newTestResult = new TestResult({
      testType,
      result,
      date: new Date(),
      environment: environmentId, // Asignar el environmentId al test result
    });

    // Guardar el nuevo test result
    await newTestResult.save();

    res.status(201).json({
      message: 'Test result creado exitosamente',
      testResult: newTestResult,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los test results por environment
exports.getTestResultsByEnvironment = async (req, res) => {
  try {
    const { environmentId } = req.params;

    // Verificar si el environment existe
    const environment = await Environment.findById(environmentId);
    if (!environment) {
      return res.status(404).json({ message: 'Ambiente no encontrado' });
    }

    // Buscar todos los test results asociados al environment
    const testResults = await TestResult.find({ environment: environmentId });

    res.status(200).json({
      environment: environment.name,
      testResults: testResults,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
