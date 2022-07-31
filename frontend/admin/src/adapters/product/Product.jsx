import { Post, Get , Update} from "../xhr";

export function GetProducts(path) {
    return Get(path);
}

export function AddProduct(path, data) {
    return Post(path, data);
}

export function UpdateProduct(path, data) {
    return Update(path, data);
}

export function FeatureUpdate(path, data) {
    return Update(path, data);
}

export function SingleProduct(path) {
    return Get(path);
}
