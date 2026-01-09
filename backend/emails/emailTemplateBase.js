// Base email template structure to eliminate HTML duplication

const createEmailTemplate = (title, content) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${title}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div>
    <div style="background: linear-gradient(to right, #4CAF50, #45a049); padding: 20px; text-align: center; outline: #45a049 solid 1px; border-radius: 10px 10px 0 0;">
      <h1 style="color: white; margin: 0;">${title}</h1>
    </div>
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; outline: #45a049 solid 1px; text-align: center;">
      ${content}
    </div>
    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
      <p>This is an automated message, please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;
};

module.exports = { createEmailTemplate };
