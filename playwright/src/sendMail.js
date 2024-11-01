import nodemailer from 'nodemailer';

export const sendReportEmail = async (reportJSON, flag) => {
  const processedResults = await reportJSON.map(
    (test) => (
      console.log(test),
      {
        Test: test.Test,
        Result: test.result === 'Passed' ? 'Passed' : 'Failed',
      }
    )
  );

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

  console.log(htmlTable);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'clopezbaya@gmail.com',
      pass: 'gzjbxpjnkofydnne',
    },
    logger: true,
    debug: true,
    connectionTimeout: 5000,
    greetingTimeout: 5000,
  });

  console.log('Transporte creado con éxito:', transporter);

  const mailOptions = {
    from: 'clopezbaya@gmail.com',
    to: 'clopezbaya@gmail.com',
    subject: `Resultados de las Pruebas Automatizadas`,
    text: 'test',
  };

  console.log('Mail Options:', mailOptions);

  console.log('Preparando para enviar el correo...');

  try {
    console.log('Enviando Correo....');
    const info = transporter.sendMail(mailOptions);
    console.log('Correo enviado..', info.response);
  } catch (error) {
    console.error('Error al enviar correo', error);
  }
};
