import jwt from 'jsonwebtoken'
import { config } from '../../../../config'

export default (user,) => {
    return jwt.sign({
        _id: user._id,
        merchant : user?.merchant,
    }, config?.jwt?.key, {
        expiresIn: config?.jwt?.expire
    })
}