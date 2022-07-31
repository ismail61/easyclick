import { Post } from "../xhr";

export function signIn(path, data){
  return Post(path, data);
}

export function ResetTokenCodeSend(data){
  return Post('customer/send-token', data);
}

export function ResetTokenCodeVerify(data){
  return Post('customer/verity-token', data);
}