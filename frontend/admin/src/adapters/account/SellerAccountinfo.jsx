import { Get, Update } from "../xhr";

export function SellerAccountInformation(path){
  return Get(path);
}
export function UpdateSellerAccountInformation(path, data){
    return Update(path, data);
  }