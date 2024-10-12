const TestResult = require('../models/testResult');
const Environment = require('../models/environment');

// Función para guardar el TestResult
const saveTestResult = async (
  testType,
  result,
  environmentId,
  environmentDescription
) => {
  const newTestResult = new TestResult({
    testType: testType,
    result: result,
    environment: environmentId || null, // Almacena null si no hay environmentId
  });

  const savedTestResult = await newTestResult.save();

  // Si hay un environmentId, actualiza la lista de tests en el Environment
  if (environmentId) {
    await Environment.findByIdAndUpdate(environmentId, {
      $push: { tests: savedTestResult._id },
    });
  } else if (environmentDescription) {
    // Si no hay environmentId, crea un nuevo Environment usando la descripción
    const newEnvironment = new Environment({
      name: environmentDescription.name, // Usa el nombre pasado en el body
      description: environmentDescription.description,
      tests: [savedTestResult._id],
    });
    const savedEnvironment = await newEnvironment.save(); // Guarda el nuevo Environment
    // Actualiza el TestResult con el ID del nuevo entorno
    await TestResult.findByIdAndUpdate(savedTestResult._id, {
      environment: savedEnvironment._id,
    });
  }

  return savedTestResult._id;
};

module.exports = {
  saveTestResult,
};
