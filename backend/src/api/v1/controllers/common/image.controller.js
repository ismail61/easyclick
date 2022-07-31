import { error } from "../../utils";
import cloudinary from 'cloudinary';

const imageController = () => {
    return {

        // upload an image
        uploadImage: async (req, res) => {

            if (req.fileExtensionValidationError) return error().resourceError(res, 'Only .png, .jpg and .jpeg format allowed!', 415);
            if (req.file?.size >= 3 * 1024 * 1024) return error().resourceError(res, 'Image size mus lower than 3 MB', 409);

            const image_upload = await cloudinary.v2.uploader.upload(req.file?.path, { folder: 'easyclick/product', use_filename: true });
            if (!image_upload?.secure_url) return error().resourceError(res, 'Image Saved Failed . Please try again', 500);

            return res.status(200).json({
                public_id: image_upload?.public_id,
                url: image_upload?.secure_url
            });
        },
        // upload an image
        uploadDocument: async (req, res) => {

            if (req.fileExtensionValidationError) return error().resourceError(res, 'Only .png, .jpg and .jpeg format allowed!', 415);
            if (req.file?.size >= 3 * 1024 * 1024) return error().resourceError(res, 'Image size mus lower than 3 MB', 409);

            const image_upload = await cloudinary.v2.uploader.upload(req.file?.path, { folder: 'easyclick/documents', use_filename: true });
            if (!image_upload?.secure_url) return error().resourceError(res, 'Image Saved Failed . Please try again', 500);

            return res.status(200).json({
                public_id: image_upload?.public_id,
                url: image_upload?.secure_url
            });
        },
        // delete an image
        deleteImage: async (req, res) => {
            const { public_id } = req.params;

            const response = await cloudinary.v2.uploader.destroy(`easyclick/product/${public_id}`);
            if (response?.result !== 'ok') return error().resourceError(res, 'Image Deleted Failed . Please try again', 500);

            return res.status(200).json(response);
        },
        // delete an image
        deleteDocument: async (req, res) => {
            const { public_id } = req.params;

            const response = await cloudinary.v2.uploader.destroy(`easyclick/documents/${public_id}`);
            if (response?.result !== 'ok') return error().resourceError(res, 'Image Deleted Failed . Please try again', 500);

            return res.status(200).json(response);
        },
    }
}

export { imageController }