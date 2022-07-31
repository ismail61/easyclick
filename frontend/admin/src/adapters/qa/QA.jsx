import { Get, Update } from "adapters/xhr";

export function GetQAS(path) {
    return Get(path);
}


export function UpdateQA(path, data) {
    return Update(path, data);
}