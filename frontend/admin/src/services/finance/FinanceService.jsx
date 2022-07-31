import { CheckSellerAccountCreatedDate, GetStatement, PaidStatement, SetAccountStatementRowsDatabase } from "adapters/finance/AccountStatement";

export function CreatedDateCheck(id) {
  return CheckSellerAccountCreatedDate(`vendor/${id}/seller-account-date`);
}

export function setRowsDatabase(id, data) {
  return SetAccountStatementRowsDatabase(`vendor/${id}/create-account-statement`, data);
}

export function getStatement(id, date) {
  return GetStatement(`vendor/${id}/account-statement/${date}`);
}

export function getOrderOverview(id, start_date, end_date) {
  return GetStatement(`vendor/${id}/account-statement/${start_date}/${end_date}`);
}

export function paidStatement(id, paid) {
  return PaidStatement(`vendor/${id}/paid-statement/`, paid);
}