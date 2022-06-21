import { globalErrorHandler } from "..";
import error from "./error/error";

export default (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (err) {
            console.log("Error: " + err + " on route " + req?.url + " & Request " + req?.method)
            //return next(error().serverError(res))
            return next(globalErrorHandler(err, res));
        }
    };
};