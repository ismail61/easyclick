import { error, passwordCompare, objectValidatorEscape } from "../../utils";
import validator from "validator";
import { findCustomer, findCustomerByIDAndUpdate, findCustomerUsingID, getCustomerAccountInfo, updateCustomerAccountInfo, updateCustomerAccountPhoto } from "../../services/customer";
import { customerAccountInfoValidation, passwordValidation } from "../../validations";
import cloudinary from 'cloudinary';

function accountController() {
    return {
        getCustomerAccountInfo: async (req, res) => {
            const Customer = await getCustomerAccountInfo({ _id: req.user?._id });
            return res.status(200).json(Customer);
        },

        updateCustomerAccountInfo: async (req, res) => {
            let image;
            const { name, phone } = req.body;

            const validation = customerAccountInfoValidation({ name, phone });
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            if (phone) {
                //find a customer is assigned to the same phone
                const match = await findCustomer({ phone, _id: { $ne: req?.user?._id } });
                if (match) return error().resourceError(res, 'Phone Number already exists. Please choose a different phone Number', 409);
            }

            if (req.fileExtensionValidationError) return error().resourceError(res, 'Only .png, .jpg and .jpeg format allowed!', 415);
            if (req.file?.size >= 3 * 1024 * 1024) return error().resourceError(res, 'Image size mus lower than 3 MB', 409);

            if (req.file) {
                const image_upload = await cloudinary.v2.uploader.upload(req.file?.path, { folder: 'easyclick/customer', use_filename: true });
                if (!image_upload?.secure_url) return error().resourceError(res, 'Image Uploaded Failed . Please try again', 500);
                image = {
                    public_id: image_upload?.public_id,
                    url: image_upload?.secure_url
                }
            }

            //malicious data refactor
            const refactor_data = await objectValidatorEscape(req.body);

            const updatedCustomer = await updateCustomerAccountInfo({ _id: req.user?._id }, {
                ...refactor_data,
                image
            }, res);
            return res.status(200).json(updatedCustomer);
        },

        changePassword: async (req, res) => {
            const { old_password, new_password } = req.body;
            const customer = await findCustomerUsingID(req.user?._id);

            const passwordMatch = await passwordCompare(validator.escape(old_password), customer);
            if (!passwordMatch) return error().resourceError(res, 'Invalid Old Password', 401);

            const validation = passwordValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            await findCustomerByIDAndUpdate(customer._id, { password: new_password });
            return res.status(200).json({ message: "Password Changed Successful" });
        },

    }
}
export { accountController };