import { sendSms } from "../../services/admin";
import { error } from "../../utils";
import { smsValidation } from "../../validations";

function smsController() {
    return {
        sendSms: async (req, res) => {
            const { all_phone } = req.body;
            
            const validation = smsValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);
            await sendSms(req.body);
            return res.status(200).json({ message: 'Successful' });
        },
    }
}
export { smsController };