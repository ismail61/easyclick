import { Post, Get , Update} from "../xhr";

export function sendMessage(data) {
    return Post('customer/chat/send-message-to-vendor', data);
}



