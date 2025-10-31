const {mailtrapClient, sender ,transporter} = require('./mailtrapConfig');
const { 
    VERIFICATION_EMAIL_TEMPLATE,
    WELCOME_EMAIL_TEMPLATE,
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    }= require('./emailTemplate');

// Generic email sending function to eliminate duplication
const sendEmail = async (to, subject, htmlTemplate, replacements, category) => {
    try {
        let html = htmlTemplate;
        // Replace all placeholders in the template
        for (const [key, value] of Object.entries(replacements)) {
            html = html.replace(new RegExp(`{${key}}`, 'g'), value);
        }

        const res = await transporter.sendMail({
            from: sender,
            to,
            subject,
            html,
            category
        });
        console.log(`${category} sent successfully`, res);
    } catch (error) {
        console.log(`Error sending ${category}`, error);
        throw new Error(`Error sending email: ${error.message}`);
    }
};

// Send verification email
const sendVerficationEmail = async (email, verificationToken, name) => {
    await sendEmail(
        email,
        "Verify your email",
        VERIFICATION_EMAIL_TEMPLATE,
        { verificationCode: verificationToken, name, email },
        "Verification Email"
    );
};

// Send welcome email
const sendWelcomeEmail = async (email, name) => {
    await sendEmail(
        email,
        "Welcome to our platform",
        WELCOME_EMAIL_TEMPLATE,
        { name, email },
        "Welcome Email"
    );
};

// Send reset password email
const sendPasswordResetEmail = async (email, resetURL, name) => {
    await sendEmail(
        email,
        "Reset your password",
        PASSWORD_RESET_REQUEST_TEMPLATE,
        { resetURL, name, email },
        "Password Reset Email"
    );
};

// Send reset password success email
const sendResetSuccessEmail = async (email, name) => {
    await sendEmail(
        email,
        "Password reset successful",
        PASSWORD_RESET_SUCCESS_TEMPLATE,
        { name },
        "Password Reset Success Email"
    );
}
module.exports = {
    sendVerficationEmail, 
    sendWelcomeEmail,
    sendPasswordResetEmail,
    sendResetSuccessEmail 
};