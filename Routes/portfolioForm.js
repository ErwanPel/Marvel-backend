const express = require("express");
const router = express.Router();
const formData = require("form-data");
const Mailgun = require("mailgun.js");

const mailgun = new Mailgun(formData);
const client = mailgun.client({
  username: "Wan",
  key: process.env.MAILGUN_KEY,
});

router.post("/portfolio", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log(req.body);
    const messageData = {
      from: `${name} <${email}>`,
      to: process.env.MAILGUN_USERMAIL,
      subject: "Message from Portfolio",
      text: message,
    };

    const response = await client.messages.create(
      process.env.MAILGUN_DOMAIN,
      messageData
    );

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "Le site est momentanément indisponible, veuillez ré-essayer",
    });
  }
});

module.exports = router;
