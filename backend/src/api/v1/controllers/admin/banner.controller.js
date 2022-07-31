import slugify from "slugify";
import cloudinary from "cloudinary";
import {
  createBanner,
  getAllBanner,
  updateBanner,
  getAllHomePageBanner,
  singleBanner,
} from "../../services/admin";
import { error } from "../../utils";
import { bannerValidation } from "../../validations";

const bannerController = () => {
  return {
    // create a Banner
    createBanner: async (req, res) => {

      if (!req.file)
        return error().resourceError(
          res,
          "You must select one image banner",
          422
        );
      const validation = bannerValidation(req.body);
      if (validation.error)
        return error().resourceError(
          res,
          validation.error?.details[0].message,
          422
        );

      let image;
      if (req.fileExtensionValidationError)
        return error().resourceError(
          res,
          "Only .png, .jpg and .jpeg format allowed!",
          415
        );
      if (req.file?.size >= 3 * 1024 * 1024)
        return error().resourceError(
          res,
          "Image size mus lower than 3 MB",
          409
        );

      const image_upload = await cloudinary.v2.uploader.upload(
        req.file?.path,
        { folder: "easyclick/admin/banner", use_filename: true }
      );
      if (!image_upload?.secure_url)
        return error().resourceError(
          res,
          "Image Saved Failed . Please try again",
          500
        );

      image = {
        public_id: image_upload?.public_id,
        url: image_upload?.secure_url,
      };
      const savedBanner = await createBanner({
        ...(req.body),
        image,
      }, res);

      return res.status(201).json(savedBanner);
    },

    // Find single Banner by ID
    getSingleBanner: async (req, res) => {
      // Get single Banner from db
      const Banner = await singleBanner(req.params.id);
      if (!Banner)
        return error().resourceError(
          res,
          "Sorry! This Banner doest not exists or something wrong",
          422
        );
      return res.status(200).json(Banner);
    },


    // Get All Home Page Banner
    getAllHomePageBanner: async (req, res) => {
      // Get all Banner form db
      const categories = await getAllHomePageBanner({
        show_on_home_page: true,
      });
      return res.status(200).send(categories);
    },

    // Get All Banner
    getAllBanner: async (req, res) => {
      // Get all Banner form db
      const categories = await getAllBanner({});
      return res.status(200).send(categories);
    },

    // Update Banner by ID
    updateBanner: async (req, res) => {
      let { image } = req.body;

      const validation = bannerValidation(req.body);
      if (validation.error)
        return error().resourceError(
          res,
          validation.error?.details[0].message,
          422
        );

      //image upload if seller provide any image for Banner
      if (req.file) {
        if (req.fileExtensionValidationError)
          return error().resourceError(
            res,
            "Only .png, .jpg and .jpeg format allowed!",
            415
          );
        if (req.file?.size >= 3 * 1024 * 1024)
          return error().resourceError(
            res,
            "Image size mus lower than 3 MB",
            409
          );

        const image_upload = await cloudinary.v2.uploader.upload(
          req.file?.path,
          { folder: "easyclick/admin/banner", use_filename: true }
        );
        if (!image_upload?.secure_url)
          return error().resourceError(
            res,
            "Image Saved Failed . Please try again",
            500
          );
        image = {
          public_id: image_upload?.public_id,
          url: image_upload?.secure_url,
        };
      }

      // Update Banner
      const updatedBanner = await updateBanner(
        { _id: req.params.id },
        {
          ...(req.body),
          image,
        }
      );

      if (!updatedBanner)
        return error().resourceError(
          res,
          "Sorry! This Banner doest not exists or something wrong",
          422
        );
      return res.status(200).send(updatedBanner);
    },

    // Show Home Page Banner by ID
    showHomePageBanner: async (req, res) => {
      // Update Banner
      const updatedBanner = await updateBanner(
        { _id: req.params.id },
        {
          show_on_home_page: true,
        }
      );

      if (!updatedBanner)
        return error().resourceError(
          res,
          "Sorry! This Banner doest not exists or something wrong",
          422
        );
      return res.status(200).send(updatedBanner);
    },

    // Hide Home Page Banner by ID
    hideHomePageBanner: async (req, res) => {
      // Update Banner
      const updatedBanner = await updateBanner(
        { _id: req.params.id },
        {
          show_on_home_page: false,
        }
      );

      if (!updatedBanner)
        return error().resourceError(
          res,
          "Sorry! This Banner doest not exists or something wrong",
          422
        );
      return res.status(200).send(updatedBanner);
    },
  };
};

export { bannerController };
