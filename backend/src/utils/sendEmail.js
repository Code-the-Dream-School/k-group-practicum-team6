const nodemailer = require("nodemailer");
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PWD = process.env.EMAIL_PWD;

const sendEmail = async ({ to, subject, html }) => {

    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "SET" : "MISSING");
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PWD
        }
    });

    await transporter.sendMail({
        from: `"BrainLog" <${EMAIL_USER}>`, to, subject, html
    })
}
module.exports = sendEmail;