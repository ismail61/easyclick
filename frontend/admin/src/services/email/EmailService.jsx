import { SendEmail } from "adapters/email/Email";

export function sendEmail(data) {
    return SendEmail('email/send-email', data);
}


