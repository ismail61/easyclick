import { Get, Post, Update } from "adapters/xhr";


export function CategoryList(path){
  return Get(path);
}

export function CategoryFeatureUpdate(path) {
  return Update(path, {});
}

export function CreateCategory(path, data) {
  return Post(path, data);
}

export function GetCategory(path) {
  return Get(path);
}

export function UpdateCategory(path, data) {
  return Update(path, data);
}