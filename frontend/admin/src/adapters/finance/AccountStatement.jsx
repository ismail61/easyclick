import { Get, Post, Update } from "../xhr";

export function CheckSellerAccountCreatedDate(path) {
    return Get(path);
}

export function SetAccountStatementRowsDatabase(path, data) {
    return Post(path, data);
}

export function GetStatement(path) {
    return Get(path);
}

export function PaidStatement(path, data) {
    return Update(path, data);
}

