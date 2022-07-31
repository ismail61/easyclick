import { Post, Get , Update} from "../xhr";

export function getUserData() {
    return Get('customer/account-info');
}

export function updateUserData(data) {
    return Update('customer/account-info', data);
}
