import { sendEmail } from "../../services/admin";
import { error } from "../../utils";
import { emailValidation } from "../../validations";

function emailController() {
    return {
        sendEmail: async (req, res) => {
            const { all_email } = req.body;
            
            const validation = emailValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);
            await sendEmail(req.body);
            return res.status(200).json({ message: 'Successful' });
        },
    }
}
export { emailController };