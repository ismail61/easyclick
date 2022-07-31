import { GetVendor, geVendorConversations, sendVendorMessage } from "adapters/chat/Chat";

export function getVendor() {
    return GetVendor('chat/get-vendor');
}

export function getVendorAllConversation() {
    return geVendorConversations('chat/get-messages-from-vendor');
}

export function sendMessage(data) {
    return sendVendorMessage('chat/send-message-to-vendor', data);
}

export function getVendorAllMessage(id) {
    return geVendorConversations(`chat/get-messages-from-vendor/${id}`);
}

export function getAdminAllMessage() {
    return geVendorConversations(`chat/get-messages-from-admin`);
}



