import jwt from 'jsonwebtoken'
import { config } from '../../../../config'
import { findAdminToken } from '../../services/admin';
import bcrypt from 'bcrypt';

export const adminAuthentication = async (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"] || req.header('Authorization');

    if (!token) {
        return res.status(403).send({ err: "A token is required for authentication" });
    }
    try {
        const verify_token = jwt.verify(token, config?.jwt?.key);
        const { _id, verifyToken } = verify_token;
        const admin = await findAdminToken({ _id });
        if (!admin) return res.status(401).json(false);
        const tokenMatch = await bcrypt.compare(admin?.token, verifyToken);
        if (!tokenMatch) res.status(401).send({ err: "Invalid Token" });
        req.admin = verify_token;
    } catch (err) {
        return res.status(401).send({ err: "Invalid Token" });
    }
    return next();
};