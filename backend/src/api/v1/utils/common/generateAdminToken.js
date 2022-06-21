import jwt from 'jsonwebtoken'
import { config } from '../../../../config'

export default (user, verifyTokenTracker) => {
    return jwt.sign({
        _id: user._id,
        verifyToken: verifyTokenTracker
    }, config?.admin_jwt?.key, {
        expiresIn: config?.admin_jwt?.expire
    })
}