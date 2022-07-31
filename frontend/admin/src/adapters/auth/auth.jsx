import { Get } from "../xhr";

export function Auth(user) {
    return Get('authenticate', user);
}