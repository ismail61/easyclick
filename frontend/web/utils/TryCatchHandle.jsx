import { ErrorToast } from "./Error";
import Cookies from 'js-cookie';
export async function TryCatch(fn) {
    try {
        await fn()
    } catch (error) {
        if (error.response && (error.response?.status !== 401 && error.response?.status !== 403)) {
            ErrorToast(error.response?.data?.err);
        }
        else if (error.response?.status === 401 || error.response?.status === 403) {
            ErrorToast('Unauthorized Person. Please sign-in again');
            Cookies?.remove('token', { path: '/' })
            window.location.href = ('/#/auth/sign-in');
        } else {
            ErrorToast('Something went wrong');
        }
    }
};
