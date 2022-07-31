import { Get , Update} from "../xhr";

export function AdminOrders(path) {
    return Get(path);
}

export function UpdateOrder(path, data) {
    return Update(path, data);
}

export function SingleOrder(path) {
    return Get(path);
}
export function CountOrders(path) {
    return Get(path);
}

