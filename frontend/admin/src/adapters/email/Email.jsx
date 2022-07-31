import { Post } from "adapters/xhr";

export function SendEmail(path, data) {
  return Post(path, data);
}