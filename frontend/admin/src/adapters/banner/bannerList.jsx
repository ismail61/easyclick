import { Get, Post, Update } from "adapters/xhr";


export function BannerList(path){
  return Get(path);
}

export function BannerFeatureUpdate(path) {
  return Update(path, {});
}

export function CreateBanner(path, data) {
  return Post(path, data);
}

export function GetBanner(path) {
  return Get(path);
}

export function UpdateBanner(path, data) {
  return Update(path, data);
}