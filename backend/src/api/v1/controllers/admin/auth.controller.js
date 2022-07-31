import { createAdmin, findAdminAndUpdate, findAdmin, findAdminToken, sendEmail } from "../../services/admin";
import { error, generateAdminToken, generatePassword, generateTokenTracker } from "../../utils"
import { adminSignUpValidation } from "../../validations";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const THREE_MINUTES = 3 * 60 * 1000;
import { config } from '../../../../config';

function authController() {
    return {
        sendPassword: async (req, res) => {
            const { email } = req.body;

            // Validate all information
            const validation = adminSignUpValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            //find a admin using email
            const admin = await findAdmin({ email });
            if (!admin) return error().resourceError(res, 'Invalid Email', 404);

            const password = await generatePassword(8);
            const message = `Admin Panel Password is ${password}`;
            await findAdminAndUpdate({ _id: admin?._id }, { password });
            setTimeout(async () => {
                await findAdminAndUpdate({ _id: admin?._id }, { password: null });
            }, THREE_MINUTES);
            await sendEmail({ email, body: message, subject: 'Password' })
            return res.status(200).json({ message: "Email Send Successful. Please check your Email" })
        },

        signIn: async (req, res) => {
            const { phone, password } = req.body;

            // Validate all information
            const validation = adminSignUpValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            //find a admin using email
            const admin = await findAdmin({ $and: [{ phone }, { password }] });
            if (!admin) return error().resourceError(res, 'Invalid Email', 401);

            const verifyTokenTracker = await generateTokenTracker();
            const tokenHash = await bcrypt.hash(verifyTokenTracker, 10);

            const token = generateAdminToken(admin, tokenHash);

            await findAdminAndUpdate({ _id: admin._id }, { token: verifyTokenTracker });
            return res.status(200).json({ token: token });
        },
        //Cookie Authentication
        Authenticate: async (req, res) => {
            const token = req.header('Authorization');
            if (!token) return res.status(403).json(false);
            try {
                const verify_token = jwt.verify(token, config?.jwt?.key);
                const { _id, verifyToken } = verify_token;
                const admin = await findAdminToken({ _id });
                if (!admin) return res.status(401).json(false);
                const tokenMatch = await bcrypt.compare(admin?.token, verifyToken);
                if (!tokenMatch) return res.status(401).json(false);
                return res.status(200).json(true);
            } catch (err) {
                return res.status(401).json(false);
            }

        },
        signUp: async (req, res) => {

            // Validate all information
            const validation = adminSignUpValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            // save into mongo db
            const data = await createAdmin(req.body);
            return res.status(201).json({
                message: data
            });
        },
    }
}
export { authController };