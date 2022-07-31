import { Get, Update } from "adapters/xhr";

export function GetReviews(path) {
    return Get(path);
}


export function UpdateReview(path, data) {
    return Update(path, data);
}