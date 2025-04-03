const {mailtrapClient, sender ,transporter} = require('./mailtrapConfig');
const { 
    VERIFICATION_EMAIL_TEMPLATE,
    WELCOME_EMAIL_TEMPLATE,
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    }= require('./emailTemplate');


const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });


// Send verification email
const sendVerficationEmail = async (email, verificationToken, name ) => {

    try {
        const res = await transporter.sendMail({
            from: sender,
            to: email,
            subject: "Verify your email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace('{verificationCode}', verificationToken).replace('{name}', name).replace('{email}', email),
            category: "Verification Email"
        })
        console.log('Email sent successfully' , res);

    } catch (error) {
        console.log('Error sending email' , error);
        throw new Error(`Error sending email: ${error.message}`);
    }
};

// Send welcome email
const sendWelcomeEmail = async (email, name) => {

    try{
        const res = await transporter.sendMail({
            from: sender,
            to: email,
            subject: "Welcome to our platform",
            html: WELCOME_EMAIL_TEMPLATE.replace('{name}', name).replace('{email}', email),
            category: "Welcome Email"
        });
        console.log('Welcome email sent successfully' , res);

    }catch{
        console.log('Error sending welcome email' , error);
        throw new Error(`Error sending email: ${error.message}`);

    }

};

// Send reset password email
const sendPasswordResetEmail = async (email, resetURL , name) => {

    try{
        const res = await transporter.sendMail({
            from: sender,
            to: email,
            subject: "Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetURL).replace('{name}', name).replace('{email}', email),
            category: "Password Reset Email"
        });
        console.log('Password reset email sent successfully' , res);

    }catch{
        console.log('Error sending password reset email' , error);
        throw new Error(`Error sending email: ${error.message}`);

    }

};

// Send reset password success email
const sendResetSuccessEmail = async (email,name) => {

    try{
        const res = await transporter.sendMail({
            from: sender,
            to: email,
            subject: "Password reset successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace('{name}', name),
            category: "Password Reset Success Email"
        });
        console.log('Password reset success email sent successfully' , res);

    }catch{
        console.log('Error sending password reset success email' , error);
        throw new Error(`Error sending email: ${error.message}`);

    }

}
module.exports = {
    sendVerficationEmail, 
    sendWelcomeEmail,
    sendPasswordResetEmail,
    sendResetSuccessEmail 
};