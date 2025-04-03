const { MailtrapClient } = require("mailtrap");
// NodeMailer
const nodemailer = require("nodemailer");

const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secureConnection: "true",
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});


const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN,
});

const sender = process.env.EMAIL_USER;

module.exports = { mailtrapClient, sender , transporter };