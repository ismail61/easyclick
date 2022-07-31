import { Get, Update } from "../xhr";

export function GetSellerShopLogo(path){
  return Get(path);
}
export function UpdateSellerShopLogo(path, data){
    return Update(path, data);
  }

  export function GetSellerProfileImage(path){
    return Get(path);
  }
  export function UpdateSellerProfileImage(path, data){
      return Update(path, data);
    }
  
