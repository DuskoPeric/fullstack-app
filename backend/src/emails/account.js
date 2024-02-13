const sgMail = require("@sendgrid/mail");
const sendgridAPIKey = process.env.SENDGRID_APIKEY;
sgMail.setApiKey(sendgridAPIKey);
const sender = "dule@teretane.net";

const sendConfirmationEmail=(email, name, token)=>{
    const msg = {
        to: email, 
        from: sender,
        subject: "Confirm your email",
        html: `Hi ${name}, please click on <a href='http://localhost:5173/${token}/confirm'>link</a> to confirm your email`,
      };
      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.error(error);
        });
}

const sendResetEmail=(user)=>{
  const msg = {
      to: user.email, 
      from: sender, 
      subject: "Resset your email",
      html: `Hi ${user.name}, please click on <a href='http://localhost:5173/reset-password/${user.resetToken}/new-password'>link</a> to reset your email`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
}

module.exports={
    sendConfirmationEmail,
    sendResetEmail
}
