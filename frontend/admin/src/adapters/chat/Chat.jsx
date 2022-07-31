import { Get, Post } from "../xhr";

export function GetVendor(path) {
    return Get(path);
}

export function geVendorConversations(path) {
    return Get(path);
}

export function sendVendorMessage(path, data) {
    return Post(path, data)
}