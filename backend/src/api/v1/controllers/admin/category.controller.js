import slugify from "slugify";
import cloudinary from "cloudinary";
import {
  createCategory,
  getAllProduct,
  getAllCategoryWithoutChildren,
  updateCategory,
  getAllHomePageCategoryWithoutChildren,
  singleCategoryWithoutChildren,
  getAllCategory,
  findCategory,
} from "../../services/admin";
import { error, objectValidatorEscape } from "../../utils";
import { categoryValidation } from "../../validations";

const categoryController = () => {
  return {
    // create a category
    createCategory: async (req, res) => {

      if (!req.file)
        return error().resourceError(
          res,
          "You must select one valid image",
          422
        );
      const validation = categoryValidation(req.body);
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

      const { name, root, parent_id, description } = req.body;
      const nameMatch = await findCategory({ name });
      if (nameMatch) return error().resourceError(
        res,
        "Same Name Found! Please enter different category name",
        422
      );

      const image_upload = await cloudinary.v2.uploader.upload(
        req.file?.path,
        { folder: "easyclick/admin/category", use_filename: true }
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

      const savedCategory = await createCategory({
        ...req.body,
        slug: slugify(name)?.toLowerCase(),
        root: root ? root : slugify(name)?.toLowerCase(),
        parent_id: parent_id || undefined,
        description: description || undefined,
        image,
      }, res);

      return res.status(201).json(savedCategory);
    },

    // Find single category by ID
    getSingleCategory: async (req, res) => {
      // Get single category from db
      const category = await singleCategoryWithoutChildren(req.params.id);
      if (!category)
        return error().resourceError(
          res,
          "Sorry! This category doest not exists or something wrong",
          422
        );
      return res.status(200).json(category);
    },


    // Get All Home Page Category
    getAllHomePageCategory: async (req, res) => {
      // Get all category form db
      const categories = await getAllHomePageCategoryWithoutChildren({
        show_on_home_page: true,
      });
      return res.status(200).send(categories);
    },

    // Get All Category
    getAllCategory: async (req, res) => {
      // Get all category form db
      const categories = await getAllCategoryWithoutChildren({});
      return res.status(200).send(categories);
    },

    // Get All Category
    getAllNestedCategory: async (req, res) => {
      // Get all category form db
      const categories = await getAllCategory({});
      return res.status(200).send(categories);
    },

    // Get All Products by category ID
    getAllProductBySpecificCategory: async (req, res) => {
      // Get all category form db
      const categories = await getAllProduct({ _id: req.params.id });
      return res.status(200).send(categories);
    },

    // Update Category by ID
    updateCategory: async (req, res) => {
      let { name, image, parent_id, description } = req.body;

      const validation = categoryValidation(req.body);
      if (validation.error)
        return error().resourceError(
          res,
          validation.error?.details[0].message,
          422
        );

      //image upload if seller provide any image for category
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
          { folder: "easyclick/admin/category", use_filename: true }
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

      // Update category
      const updatedCategory = await updateCategory(
        { _id: req.params.id },
        {
          ...req.body,
          slug: slugify(name)?.toLowerCase(),
          parent_id: parent_id || undefined,
          description: description || undefined,
          image,
        }
      );

      if (!updatedCategory)
        return error().resourceError(
          res,
          "Sorry! This category doest not exists or something wrong",
          422
        );
      return res.status(200).send(updatedCategory);
    },

    // Show Home Page Category by ID
    showHomePageCategory: async (req, res) => {
      // Update category
      const updatedCategory = await updateCategory(
        { _id: req.params.id },
        {
          show_on_home_page: true,
        }
      );

      if (!updatedCategory)
        return error().resourceError(
          res,
          "Sorry! This category doest not exists or something wrong",
          422
        );
      return res.status(200).send(updatedCategory);
    },

    // Hide Home Page Category by ID
    hideHomePageCategory: async (req, res) => {
      // Update category
      const updatedCategory = await updateCategory(
        { _id: req.params.id },
        {
          show_on_home_page: false,
        }
      );

      if (!updatedCategory)
        return error().resourceError(
          res,
          "Sorry! This category doest not exists or something wrong",
          422
        );
      return res.status(200).send(updatedCategory);
    },
  };
};

export { categoryController };
