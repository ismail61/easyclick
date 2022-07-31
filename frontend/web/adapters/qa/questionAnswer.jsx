import { Get, Update } from "../xhr";

export function AddQuestion(slug, data) {
    return Update(`customer/product/add-question/${slug}`, data);
}



