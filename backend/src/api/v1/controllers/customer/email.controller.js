import crypto from 'crypto';
import { findCustomer, makePasswd, updateCustomerAccountInfo } from '../../services/customer';
import { error, generatePassword, generatePasswordHash, mailSend } from "../../utils"
import hashPassword from '../../utils/common/hashPassword';
const TEN_MINUTES = 10 * 60 * 1000;
const RESET_PASSWORD_EXPIRE_TIME = TEN_MINUTES;

function emailController() {
   return {
      //Otp 
      sendToken: async (req, res) => {
         const { email } = req.body;
         const url = req.get('origin');

         const customer = await findCustomer({ email });
         if (!customer) return error().resourceError(res, 'This email address have no account', 401);

         const resetPasswordToken = crypto.randomBytes(16).toString("hex");
         await updateCustomerAccountInfo({ _id: customer?._id }, { resetPasswordToken, resetPasswordTokenDate: Date.now() + RESET_PASSWORD_EXPIRE_TIME });
         let urlWithToken;
         if (url === 'https://easyclick.com') {
            urlWithToken = `${url}/reset-token/${resetPasswordToken}`
         } else {
            urlWithToken = `${url}/reset-password?token=${resetPasswordToken}`
         }
         const html = `<!DOCTYPE html>
            <html lang="en" xmlns="http://www.w3.org/1999/xhtml"
            <head>
               <meta charset="utf-8">
               <meta name="viewport" content="width=device-width">
               <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">
               <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
               <style>
                  p>a{
                  border-radius: 5px;
                  background: #449D44;
                  color: white;
                  padding: 5px 10px;
                  display: inline-block;
                  text-decoration : none;
                  font-size: 22px;
                  }
                  body{
                  font-family: 'Lato', sans-serif;
                  font-weight: 400;
                  font-size: 15px;
                  line-height: 1.8;
                  }
                  span{
                  color: #30e3ca;
                  text-decoration : none;
                  }
               </style>
            </head>
            <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">
               <center style="width: 100%; background-color: #f1f1f1;">
                  <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
                  </div>
                  <div style="max-width: 600px; margin: 0 auto;">
                     <table align="center" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
                        <tr>
                           <td  style="padding: 1em 2.5em 0 2.5em;">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                 <tr>
                                    <td style="text-align: center;">
                                       <h1><span>Reset Password</span></h1>
                                    </td>
                                 </tr>
                              </table>
                           </td>
                        </tr>
                        <tr>
                            <td style="text-align: center;">
                            <b><i class="far fa-envelope fa-5x "></i></b>
                            </td>
                        </tr>
                        <tr>
                           <td style="padding: 2em 0 4em 0; text-align: center;">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                 <tr>
                                    <td style="text-align: center;">
                                       <h2>Please click the above link</h2>
                                       <h3>Amazing deals, updates, interesting news right in your inbox</h3>
                                       <a href="${urlWithToken}">${urlWithToken}</a>
                                    </td>
                                 </tr>
                              </table>
                           </td>
                        </tr>
                     </table>
                  </div>
               </center>
            </body>
            </html>`;
         const response = await mailSend(email, 'Reset Password Link', html);
         if (!response) return error().resourceError(res, "Email Send Failed", 409);
         setTimeout(async () => {
            await updateCustomerAccountInfo({ _id: customer?._id }, { resetPasswordToken: null, resetPasswordTokenDate: null });
         }, TEN_MINUTES)
         res.status(200).json({ message: "Email Send Successful" });
      },

      verifyToken: async (req, res) => {
         const { password, resetPasswordToken } = req.body;
         if (resetPasswordToken?.length != 32) return error().resourceError(res, 'Invalid Token', 401)

         const customer = await findCustomer({ resetPasswordToken: resetPasswordToken, resetPasswordTokenDate: { $gt: Date.now() } })
         if (!customer) return error().resourceError(res, 'Reset Token has been expired.', 401)

         const hashedPassword = await hashPassword(password)

         const data = await updateCustomerAccountInfo({ _id: customer._id }, { password: hashedPassword, resetPasswordToken: null, resetPasswordTokenDate: null, token: null });
         if (!data) return error().resourceError(res, "Password Reset Failed", 409);

         return res.status(200).json({ message: 'Token Verified Successful' });
      },

      // Reset Password 
      sendPasswordInEmail: async (req, res) => {
         const { email } = req.body;

         const customer = await findCustomer({ email });
         if (!customer) return error().resourceError(res, 'This email address have no account', 401);

         const password = await generatePassword(8);

         //password hash using bcrypt
         const hashPassword = await generatePasswordHash(password);

         await updateCustomerAccountInfo({ _id: customer?._id }, { password: hashPassword });
         const html = `<!DOCTYPE html>
            <html lang="en" xmlns="http://www.w3.org/1999/xhtml"
            <head>
               <meta charset="utf-8">
               <meta name="viewport" content="width=device-width">
               <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">
               <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
               <style>
                  p>a{
                  border-radius: 5px;
                  background: #449D44;
                  color: white;
                  padding: 5px 10px;
                  display: inline-block;
                  text-decoration : none;
                  font-size: 22px;
                  }
                  body{
                  font-family: 'Lato', sans-serif;
                  font-weight: 400;
                  font-size: 15px;
                  line-height: 1.8;
                  }
                  span{
                  color: #30e3ca;
                  text-decoration : none;
                  }
               </style>
            </head>
            <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">
               <center style="width: 100%; background-color: #f1f1f1;">
                  <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
                  </div>
                  <div style="max-width: 600px; margin: 0 auto;">
                     <table align="center" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
                        <tr>
                           <td  style="padding: 1em 2.5em 0 2.5em;">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                 <tr>
                                    <td style="text-align: center;">
                                       <h1><span>Reset Password</span></h1>
                                    </td>
                                 </tr>
                              </table>
                           </td>
                        </tr>
                        <tr>
                            <td style="text-align: center;">
                            <b><i class="far fa-envelope fa-5x "></i></b>
                            </td>
                        </tr>
                        <tr>
                           <td style="padding: 2em 0 4em 0; text-align: center;">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                 <tr>
                                    <td style="text-align: center;">
                                       <strong>Your EsyClick Password is ${password}</strong>
                                    </td>
                                 </tr>
                              </table>
                           </td>
                        </tr>
                     </table>
                  </div>
               </center>
            </body>
            </html>`;
         const response = await mailSend(email, 'Reset Password', html);
         if (!response) return error().resourceError(res, "Email Send Failed", 409);
         res.status(200).json({ message: "Email Send Successful" });
      },
   }
}
export { emailController };