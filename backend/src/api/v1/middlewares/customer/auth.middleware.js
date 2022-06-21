import jwt from 'jsonwebtoken'
import { config } from '../../../../config'
import { findCustomer } from '../../services/customer';

export const customerAuthentication = async (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"] || req.header('Authorization');

    if (!token) {
        return res.status(403).send({ err: "A token is required for authentication" });
    }
    try {
        const verify_token = jwt.verify(token, config.jwt.key);
        const customer = await findCustomer({ _id: verify_token._id })
        if (!customer) return res.status(401).send({ err: "Invalid Token" });
        if (customer?.merchant && !customer?.active) {
            return res.status(401).send({ err: "Account is not Activated. Please contact the Admin" });
        }
        req.user = verify_token;
    } catch (err) {
        return res.status(401).send({ err: "Invalid Token" });
    }
    return next();
};