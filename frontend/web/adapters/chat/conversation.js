import { Post, Get , Update} from "../xhr";

export function createCustomerConversation(data) {
    return Post('customer/conversation/create-customer-conversation', data);
}

export function createVendorConversation(data) {
    return Post('customer/conversation/create-customer-conversation', data);
}

export function getVendorAllConversation() {
    return Get('customer/chat/get-messages-from-vendor');
}

export function getVendorConversations(id) {
    return Get(`customer/chat/get-messages-from-vendor/${id}`);
}
