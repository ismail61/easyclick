import { mailSend } from "../../utils";


export const sendEmail = async ({ email, body, subject }) => {
    try {
        await mailSend(email, subject, body)
        return;
    } catch (err) {
        console.log(err);
    }
}