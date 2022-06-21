import { error } from "..";

export default (code, res) => {
    switch (code) {
        case 1000:
            console.log('Invalid UserName or Password in SMS API');
            error().resourceError(res, 'Something went wrong', 500);
            break;
        case 1002:
            error().resourceError(res, 'Empty Number', 422);
            break;
        case 1003:
            error().resourceError(res, 'Invalid message', 422);
            break;
        case 1004:
            error().resourceError(res, 'Invalid number', 422);
            break;
        case 1005:
            error().resourceError(res, 'All Number is Invalid ', 422);
            break;
        case 1006:
            console.log('Insufficient Balance.Please recharge in your account');
            error().resourceError(res, 'Something went wrong', 500);
            break;
        case 1009:
            console.log('Inactive Account');
            error().resourceError(res, 'Something went wrong', 500);
            break;
        case 1010:
            error().resourceError(res, 'Max number limit Exceeded. Please try again after some time', 429);
            break;
        default:
            error().serverError(res)
    }
}