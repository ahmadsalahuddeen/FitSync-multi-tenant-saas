import { BadRequestError } from '../errors/bad-request-error';
import { NotFoundError } from '../errors/notFound-error';
import { User } from '../models/userSchema';
import { sendMail } from './email';

export const generateOtp = async () => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    return Promise.resolve(otp);
  } catch (error) {
    throw error;
  }
};

export const sendOtp = async ({
  email,
  subject,

  duration 
}: {
  email: string;
  subject: string;
duration: number
}) => {
  try {
    if (!(email && subject )) {
      throw Error('provide values for email, subject, message');
    }

const existingUser = await User.findOne({email})
if(!existingUser){
  throw new BadRequestError("Provide a valid registered email")
}

    // clear any old record
    const userData = await User.findOneAndUpdate(
      { email },
      { $set: { forgotPasswordToken: null, forgotPasswordTokenExpiry: null } },
      { new: true }
    );

  

    // genearte OTP pin
    const generatedOtp = await generateOtp();

    const mailOptions = {
      to: email,
      subject,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      <html lang="en">
      
        <head></head>
        <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Your OTP pin for password reset -  Fitsync<div> </div>
        </div>
      
        <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">

        <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px;width:560px">
            <tr style="width:100%">
              <td>
              <img alt="FitSync" src="https://i.ibb.co/0K3vYGh/apple-icon.png" width="42" height="42" style="display:block;outline:none;border:none;text-decoration:none;border-radius:21px;width:42px;height:42px" />
                <h1 style="font-size:24px;letter-spacing:-0.5px;line-height:1.3;font-weight:400;color:#484848;padding:17px 0 0">Your OTP pin for password reset</h1>
                <table style="padding:27px 0 27px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                  <tbody>
                  
                  </tbody>
                </table>
                <code style="font-family:monospace;font-weight:700;padding:1px 4px;background-color:#dfe1e4;letter-spacing:-0.3px;font-size:21px;border-radius:4px;color:#3c4149">${generatedOtp}</code><p style="font-size:15px;line-height:1.4;margin:0 0 15px;color:#3c4149 padding:0px 4px">To reset your password, we've generated a one-time verification code for you. Please use the following code within the next 5 minutes::</p>
                <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#dfe1e4;margin:42px 0 26px" /><a target="_blank" style="color:#b4becc;text-decoration:none;font-size:14px" href="https://fitsync.com">Fitsync</a>
              </td>
            </tr>
          </table>
        </body>
      
      </html>`,
    };

    // send mail
    await sendMail(mailOptions);

    // update user data with otp data
    const user = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          forgotPasswordToken: generatedOtp,
          forgotPasswordTokenExpiry: Date.now() + 3600000 * +duration,
        },
      },
      { new: true }
    );

    const createdOtpRecord = {
      email: user?.email,
      forgotPasswordToken: user?.forgotPasswordToken,
      forgotPasswordTokenExpiry: user?.forgotPasswordTokenExpiry,
    };

    return createdOtpRecord;
  } catch (error) {
    throw error;
  }
};

export const verifyOtpHelper = async ({
  email,
  otp,

}: {
  email: string;
  otp: string;

}) => {
  try {
    if (!(email && otp )) {
      throw new BadRequestError('please values for email, otp');
    }

    const user = await User.findOne({ email });
    
    if (user?.forgotPasswordToken == null) {
      throw new BadRequestError('No otp token found.');
    }
    if (
      user &&
      user.forgotPasswordTokenExpiry &&
      user.forgotPasswordTokenExpiry.getTime() < Date.now()
    ) {
      await User.findOneAndUpdate(
        { email },
        {
          $set: { forgotPasswordToken: null, forgotPasswordTokenExpiry: null },
        },
        { new: true }
      );
      throw new BadRequestError('Code has Expired, Request for a new one ');
    }

    if (user.forgotPasswordToken !== otp) {
      throw new BadRequestError('Incorrect Otp');
    }

    return   true
  } catch (error) {
    throw error;
  }
};
