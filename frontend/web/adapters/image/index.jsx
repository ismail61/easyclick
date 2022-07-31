import { Delete, Post } from "../xhr";

export function ProductImageUpload(data) {
    return Post('customer/review-image/upload', data);
}
