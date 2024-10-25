const nodemailer = require('nodemailer');

const sendReportEmail = async (reportJSON, flag) => {
  const processedResults = await reportJSON.map((test) => ({
    Test: test.Test,
    Result: test.result === 'Passed' ? 'Passed' : 'Failed',
  }));

  const tableRows = processedResults
    .map(
      (test) =>
        `<tr>
          <td>${test.Test}</td>
          <td>${test.Result}</td>
        </tr>`
    )
    .join('');

  const htmlTable = `
    <h2>Resultados de Pruebas - ${flag}</h2>
    <p>Se ejecutaron correctamente los tests "${flag}".</p>
    <table border="1" style="border-collapse: collapse;">
      <tr>
        <th>Test</th>
        <th>Result</th>
      </tr>
      ${tableRows}
    </table>
  `;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'clopezbaya@gmail.com',
      pass: 'gzjbxpjnkofydnne',
    },
    connectionTimeout: 5000,
    greetingTimeout: 5000,
  });

  const mailOptions = {
    from: 'clopezbaya@gmail.com',
    to: 'christian.lopez@shipedge.com',
    subject: `Resultados de las Pruebas Automatizadas`,
    html: htmlTable,
  };

  console.log('Preparando para enviar el correo...');

  try {
    const info = await transporter.sendMail(mailOptions);
    return 'Mail sent successfully';
  } catch (error) {
    return 'Error to sent the mail';
  }
};

module.exports = sendReportEmail;
