import { GetQAS, UpdateQA } from "adapters/qa/QA";

export function getAllQAs() {
    return GetQAS(`question-answers`);
}

export function replyQA(product_id, id, data) {
    return UpdateQA(`reply-qas/${product_id}/${id}`, data);
}