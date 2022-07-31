import validator from 'validator'
import { createBrand, deleteBrand, getAllBrands, getBrand, updateBrand } from "../../services/admin";
import { error } from "../../utils";
import { brandValidation } from "../../validations";

const brandController = () => {
    return {


        // Create a brand
        createBrand: async (req, res) => {

            const validation = await brandValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            const { name } = req.body;

            const match = await getBrand({ name });
            if (match) return error().resourceError(res, 'Same Brand Name Match. Please Enter different brand name', 409);

            const addedBrand = await createBrand({
                name: validator.escape(name)
            })
            return res.status(200).json(addedBrand);
        },

        // Get all brands
        getAllBrands: async (req, res) => {
            const brands = await getAllBrands()
            return res.status(200).json(brands)
        },

        // update a brand
        updateBrand: async (req, res) => {
            const validation = await brandValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            const { name } = req.body;

            const match = await getBrand({ name });
            if (match) return error().resourceError(res, 'Same Brand Name Match. Please Enter different brand name', 409);

            const brand = await updateBrand({ _id: req.params?.id }, { name: validator.escape(name) })
            if (!brand) return error().resourceError(res, 'Sorry! This brand doest not exists or something wrong', 422);
            return res.status(200).json(brand)
        },

        // Delete a brand
        deleteBrand: async (req, res) => {
            const deletedBrand = await deleteBrand({ _id: req.params?.id });
            if (!deletedBrand) return error().resourceError(res, 'Sorry! This brand doest not exists or something wrong', 422);
            return res.status(200).json(deletedBrand)
        },

        // Get All Brands
        getAllBrand: async (req, res) => {
            // Get all brand form db
            const brands = await getAllBrands({});
            return res.status(200).send(brands)
        },

    }
}

export { brandController }