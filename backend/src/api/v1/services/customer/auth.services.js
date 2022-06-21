
import { generatePasswordHash } from "../../utils";
import { Customer } from "../../mongodb/customer";


export const createCustomer = async (data) => {
    try {
        const { password, merchant } = data;

        //password hash using bcrypt
        const hashPassword = await generatePasswordHash(password);

        if (merchant) {
            return await Customer.create({
                ...data,
                active: false,
                password: hashPassword
            })
        } else {
            return await Customer.create({
                ...data,
                active: true,
                password: hashPassword
            })
        }
    } catch (err) {
        console.log(err);
    }
}

export const findCustomer = async (data) => {
    try {
        return await Customer.findOne(data).lean();
    } catch (err) {
        console.log(err);
    }
}

export function makePasswd() {
    var passwd = '';
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 1; i < 8; i++) {
        var c = Math.floor(Math.random() * chars.length + 1);
        passwd += chars.charAt(c)
    }
    return passwd;
}

export const findCustomerUsingID = async (id) => {
    try {
        return await Customer.findById(id).lean();
    } catch (err) {
        console.log(err);
    }
}

export const findCustomerByIDAndUpdate = async (id, data) => {
    try {
        return await Customer.findByIdAndUpdate(id, data, { new: true }).lean();
    } catch (err) {
        console.log(err);
    }
}
