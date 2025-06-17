const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.DB_USERNAME,
        pass: process.env.DB_PASSWORD
    }
})

exports.mailSender = async (email, verificationCode) => {
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: email,
        subject: 'Verificação do Email - GT SUL',
        html: `
            <h1>Verificação de e-mail</h1>
            <p>Seu código de verificação é: <strong>${verificationCode}</strong></p>
            <p>Este código expira em 20 minutos.</p>
            <p>Se você não solicitou esta verificação, favor ignorar o e-mail!</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.log('Erro ao enviar o e-mail', error);
        return false;
    }
}