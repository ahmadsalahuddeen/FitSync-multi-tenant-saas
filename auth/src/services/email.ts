import nodemailer from "nodemailer";

// function to send email as you can see
export async function sendMail({
  to,
  name,
  subject,
  body,
}: {
  to: string;
  name: string;
  subject: string;
  body: string;
}) {
  const { SMTP_PASSWROD, SMTP_EMAIL } = process.env;

  // creating a transport object using the nodemailer
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWROD,
    },
  });

  //  verifying the transport object/ cheking if it can reach smtp server
  try {
    const testResult = await transport.verify();
    console.log("transport verification: ",testResult);
  } catch (error) {
    console.log(error);
    return
  }

  // sending email using transport object
  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
    console.log("mail: ",sendResult);
  } catch (error) {
    console.log(error);
    
  }
}
