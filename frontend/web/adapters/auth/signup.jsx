import { Post } from "../xhr";

export function signUp(path, requestData){
  return Post(path, requestData);
}