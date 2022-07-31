import { Delete, Post } from "../xhr";

export function ProductImageUpload(path, data) {
    return Post(path, data);
}

export function ProductImageDelete(path) {
    return Delete(path);
}
