import { Get } from "../xhr";

export function Auth(user) {
    return Get('customer/authenticate', user);
}