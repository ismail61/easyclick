import { Get, Post } from "../xhr";

export function AddReview(data) {
    return Post(`customer/create-review`, data);
}



