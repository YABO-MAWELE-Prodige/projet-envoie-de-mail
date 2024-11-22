require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000; 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
  const { nom, prenom, email, objet, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 25,
    secure: false
  });

  const mailOptions = {
    from: email,
    to: 'test@gmail.com', 
    subject: objet,
    text: `Nom: ${nom}\nPrénom: ${prenom}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  // Envoi de l'email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email envoyé : ' + info.response);
  });
});

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});

