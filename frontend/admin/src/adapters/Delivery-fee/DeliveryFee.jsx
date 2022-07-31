import { Get, Post, Update } from "adapters/xhr";


export function DeliveryList(path){
  return Get(path);
}

export function BrandFeatureUpdate(path) {
  return Update(path, {});
}

export function CreateDeliveryFee(path, data) {
  return Post(path, data);
}

export function UpdateDeliveryFee(path, data) {
  return Update(path, data);
}
