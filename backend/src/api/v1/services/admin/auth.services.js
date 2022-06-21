import { Admin } from "../../mongodb/admin";

export const findAdminAndUpdate = async (query, data) => {
    try {
        return await Admin.findOneAndUpdate(query, data, { new: true }).lean()
    } catch (err) {
        console.log(err);
    }
}

export const createAdmin = async (data) => {
    try {
        return await new Admin(data).save()
    } catch (err) {
        console.log(err);
    }
}

export const findAdmin = async (data) => {
    try {
        return await Admin.findOne(data).lean();
    } catch (err) {
        console.log(err);
    }
}
export const findAdminToken = async (query) => {
    try {
        return await Admin.findOne(query).lean().select('token');
    } catch (err) {
        console.log(err);
    }
}

