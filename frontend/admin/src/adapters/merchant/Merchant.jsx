import { Get , Update} from "../xhr";

export function Merchants(path) {
    return Get(path);
}

export function UpdateMerchant(path, data) {
    return Update(path, data);
}

export function CountMerchants(path) {
    return Get(path);
}


