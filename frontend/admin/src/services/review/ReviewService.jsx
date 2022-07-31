import { GetReviews, UpdateReview } from "adapters/review/Review";

export function getAllReviews() {
    return GetReviews(`reviews`);
}

export function replyReview(id, data) {
    return UpdateReview(`reply-review/${id}`, data);
}