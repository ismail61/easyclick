import { Get, Update } from "../xhr";

export function SellerBankInformation(path){
  return Get(path);
}
export function UpdateSellerBankInformation(path, data){
    return Update(path, data);
  }