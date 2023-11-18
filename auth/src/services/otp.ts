import { User } from '../models/userSchema';

const generateOtp = async () => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    return otp;
  } catch (error) {
    throw error;
  }
};

const sendOtp = async ({
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
      { $set: { forgotPasswordToken: null, forgotPasswordTokenExpiry: null } }
    );

    // genearte OTP pin
    const generatedOtp = await generateOtp();
  } catch (error) {}
};
