import { User } from '../models/userSchema';
import { sendMail } from './email';

export const generateOtp =  async() => {
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
  message,
  duration = 1,
}: {
  email: string;
  subject: string;
  message: string;
  duration: number;
}) => {
  try {
    if (!(email && subject && message)) {
      throw Error('provide values for email, subject, message');
    }

    // clear any old record
    await User.findOneAndUpdate(
      { email },
      { $set: { forgotPasswordToken: null, forgotPasswordTokenExpiry: null } }, {new: true}
    );

    // genearte OTP pin
    const generatedOtp = await generateOtp();

    const mailOptions = {
      to: email,
      subject,
      html: `<p>${message}</p><b>${generatedOtp}</b>`,
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
      }, {new: true}
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
