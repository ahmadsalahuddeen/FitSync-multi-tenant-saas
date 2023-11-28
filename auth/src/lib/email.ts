import nodemailer from "nodemailer";

// function to send email as you can see
export async function sendMail({
  to,
  name,
  subject,
  html,
}: {
  to: string;
  name?: string;
  subject: string;
  html: string;
}) {


  // creating a transport object using the nodemailer
  const transport = nodemailer.createTransport({
    service: 'gmail', 

    auth: {
      user:process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    authMethod: "PLAIN"
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
      from: process.env.SMTP_EMAIL,
      to,
      subject,
      html
    });
    console.log("mail: ",sendResult);
  } catch (error) {
    console.log(error);
    
  }
}
