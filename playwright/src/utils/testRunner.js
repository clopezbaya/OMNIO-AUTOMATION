import { spawn } from 'child_process';

export const runTest = (command, args, option = {}) => {
  return new Promise((resolve) => {
    const { env } = option;
    const testProcess = spawn(command, args, { stdio: 'pipe', env });
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
      console.error('Error in the process:', error.message);
      resolve({
        success: false,
        stdout,
        stderr: error.message,
      });
    });
  });
};
