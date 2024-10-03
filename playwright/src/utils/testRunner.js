import { spawn } from 'child_process';
import { globals } from '../../globals.js';

export const runTest = (command, args) => {
  return new Promise((resolve) => {
    const testProcess = spawn(command, args, { stdio: 'pipe' });

    let stdout = '';
    let stderr = '';

    testProcess.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    testProcess.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    testProcess.on('close', (code) => {
      resolve({
        success: code === 0,
        stdout,
        stderr,
      });
    });

    testProcess.on('error', (error) => {
      console.error('Error en el proceso:', error.message);
      resolve({
        success: false,
        stdout,
        stderr: error.message,
      });
    });

    const timeout = setTimeout(() => {
      console.log('Proceso excedió el tiempo de espera. Forzando el cierre...');
      testProcess.kill('SIGTERM');
    }, globals.TIMEOUT_EXECUTION);

    testProcess.on('close', () => {
      clearTimeout(timeout);
    });
  });
};
