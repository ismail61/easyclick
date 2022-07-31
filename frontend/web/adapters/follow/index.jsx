import { Get, Update } from "../xhr";

export function followRequest(data) {
    return Update('customer/follow', data);
}

export function unFollowRequest(data) {
    return Update('customer/un-follow', data);
}

export function checkFollower(id) {
    return Get(`customer/check-followed-store/${id}`);
}