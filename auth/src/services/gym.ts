import { BadRequestError } from '../errors/bad-request-error';
import { sendMail } from '../lib/email';
import { gymAttrs } from '../models/gymSchema';

import { User } from '../models/userSchema';
import { gymCreatorIdPopulated } from '../types/types';

// helper function for controller of api/auth/forgot-password to genrate and send otp email
export const sendEmailInviteStaff = async ({
  email,
  gymData,
}: {
  email: string;
  gymData: gymAttrs;
}) => {



  try {

    const userData = await User.find({_id: gymData.creatorId})
    const mailOptions = {
      to: email,
      subject: `You're invited to the FitSync business dashboard for ${gymData.name}`,
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
      <html lang="en">
      
        <head></head>
        <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">You&#x27;re now ready to make live transactions with Stripe!<div></div>
        </div>
      
        <body style="background-color:#f6f9fc;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,&quot;Helvetica Neue&quot;,Ubuntu,sans-serif">
          <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;background-color:#ffffff;margin:0 auto;padding:20px 0 48px;margin-bottom:64px">
            <tr style="width:100%">
              <td>
                <table style="padding:0 48px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                  <tbody>
                    <tr>
                      <td><img alt="Fitsync" src="https://i.ibb.co/pnv0HZZ/Group-481788.png" width="150" height="36" style="display:block;outline:none;border:none;text-decoration:none;width:150px;height:36px" />
                        <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e6ebf1;margin:20px 0" />
                        <p style="font-size:16px;line-height:24px;margin:16px 0;color:#525f7f;text-align:left">Welcome! You have been invited to the business dashboard for ${gymData.name}. Click the link below to get started:</p>
                        <p style="font-size:16px;line-height:24px;margin:16px 0;color:#525f7f;text-align:left"></p><a href="${process.env.BASE_URL_FRONTEND}/auth/staff/invite?inviteCode=${gymData.inviteCode}" target="_blank" style="background-color:#656ee8;border-radius:5px;color:#fff;font-size:16px;font-weight:bold;text-decoration:none;text-align:center;display:inline-block;width:100%;p-x:10px;p-y:10px;line-height:100%;max-width:100%;padding:10px 10px"><span><!--[if mso]><i style="letter-spacing: 10px;mso-font-width:-100%;mso-text-raise:15" hidden>&nbsp;</i><![endif]--></span><span style="background-color:#656ee8;border-radius:5px;color:#fff;font-size:16px;font-weight:bold;text-decoration:none;text-align:center;display:inline-block;width:100%;p-x:10px;p-y:10px;max-width:100%;line-height:120%;text-transform:none;mso-padding-alt:0px;mso-text-raise:7.5px">Accept invitation to join ${gymData.name}</span><span><!--[if mso]><i style="letter-spacing: 10px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a>
                        <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e6ebf1;margin:20px 0" />
                        <p style="font-size:14px;line-height:26px;margin-top:16px;font-weight:700;color:#656ee8">What is Fitsync?🤔</p>
                        <p style="font-size:16px;line-height:24px;margin-bottom:16px;color:#525f7f;text-align:left">Fitsync is a software that manages classes and payments for gyms, boxes, studios, and more.</p>
                        <p style="font-size:14px;line-height:26px;margin-top:16px;font-weight:700;color:#656ee8">Why have I been sent this?</p>
                        <p style="font-size:16px;line-height:24px;margin-bottom:16px;color:#525f7f;text-align:left">Once you've accepted this invitation and created an account, you will have a login to TeamUp that you can use to access the business dashboard for ${gymData.name}.</p>
                        <p style="font-size:16px;line-height:24px;margin:16px 0;color:#525f7f;text-align:left">All the best <br/>Fitsync team </p>
                        <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#e6ebf1;margin:20px 0" />
                        <p style="font-size:12px;line-height:16px;margin:16px 0;color:#8898aa">@Fitsync</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </table>
        </body>
      
      </html>`,
    };

    // send mail
    await sendMail(mailOptions);

  } catch (error) {
    throw error;
  }
};
