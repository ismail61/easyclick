import { Post } from "../xhr";

export function signIn(requestData){
  return Post('sign-in', requestData);
}

export function sendOtp(requestData){
  return Post('send-password', requestData);
}