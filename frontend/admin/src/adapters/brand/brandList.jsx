import { Delete, Get, Post, Update } from "adapters/xhr";


export function BrandList(path){
  return Get(path);
}

export function BrandFeatureUpdate(path) {
  return Update(path, {});
}

export function CreateBrand(path, data) {
  return Post(path, data);
}

export function GetBrand(path) {
  return Get(path);
}

export function UpdateBrand(path, data) {
  return Update(path, data);
}

export function DeleteBrand(path, data) {
  return Delete(path, data);
}