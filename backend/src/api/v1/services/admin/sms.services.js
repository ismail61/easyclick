import { config } from "../../../../config";
import request from 'request';
import { phoneSmsErrorMessage, error } from "../../utils";


export const sendSms = async ({ phone, body }) => {
    try {
        const { sms } = config;
        var options = {
            'method': 'POST',
            'url': `${sms.uri}?username=${sms.username}&password=${sms.password}&number=${phone}&message=${body}`,
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        request(options, async function (error, response) {
            if (error)
                return error().resourceError(res, 'Something went wrong', 500);
            const code = response?.body;
            if (code?.includes('1101')) {
                return res.status(200).json({ message: "Message Send Successful. Please check your Phone Number" });
            }
            return phoneSmsErrorMessage(Number(code), res);
        });
        return;
    } catch (err) {
        console.log(err);
    }
}