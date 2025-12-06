const { createEmailTemplate } = require('./emailTemplateBase');

const VERIFICATION_EMAIL_TEMPLATE = createEmailTemplate(
  'Verify Your Email',
  `
    <h1 style="color: #4CAF50;">Hello, {name}</h1>
    <p>Thank you for signing up! Your verification code is</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{verificationCode}</span>
    </div>
    <p>Enter this code on the verification page to complete your registration.</p>
    <p>This code will expire in 15 minutes for security reasons.</p>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br> <span style""> </span>Your App Team</p>
  `
);

const WELCOME_EMAIL_TEMPLATE = createEmailTemplate(
  'Welcome to App',
  `
    <h1 style="color: #4CAF50;">Hello, {name}</h1>
    <p>Thank you for signing up! your email is </p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 22px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">{email}</span>
    </div>
    <p>If you didn't create an account with us, please ignore this email.</p>
    <p>Best regards,<br> <span style""> </span>Your App Team</p>
  `
);

const PASSWORD_RESET_SUCCESS_TEMPLATE = createEmailTemplate(
  'Password Reset Successful',
  `
    <p>Hello,{name}</p>
    <p>We're writing to confirm that your password has been successfully reset.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #4CAF50; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>If you did not initiate this password reset, please contact our support team immediately.</p>
    <p>For security reasons, we recommend that you:</p>
    <div style="  margin: auto; width: 50%;">
      <ul style="text-align:left; ">
        <li>Use a strong, unique password</li>
        <li>Avoid using the same password</li>
        <li>Regularly update your password</li>
      </ul>
    </div>
    <p>Thank you for helping us keep your account secure.</p>
    <p>Best regards,<br>Your App Team</p>
  `
);

const PASSWORD_RESET_REQUEST_TEMPLATE = createEmailTemplate(
  'Password Reset',
  `
    <p>Hello,{name}</p>
    <p>We received a request to reset your password for <br> {email} <br> If you didn't make this request, please ignore this email.</p>
    <p>To reset your password, click the button below:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="{resetURL}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
    </div>
    <p>This link will expire in 1 hour for security reasons.</p>
    <p>Best regards,<br>Your App Team</p>
  `
);

module.exports = { 
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE 
};