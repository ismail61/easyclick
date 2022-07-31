
import { error } from '../../utils';
import slugify from "slugify";
import { addProduct, getAdminProducts, getProduct, getProducts, updateProduct } from '../../services/admin';
import { productValidation } from '../../validations';
import { getAdminProductQAS, updateProductQas } from '../../services/admin/qa.services';

function productController() {
    return {
        // Add a new product
        addProduct: async (req, res) => {
            // validation check
            const validation = productValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            const { product_name } = req.body;
            const newProduct = await addProduct({
                ...req.body,
                slug: slugify(product_name)?.toLowerCase(),
                is_active: true
            }, res);
            return res.status(200).json(newProduct);
        },

        // Get All Products
        getAdminProducts: async (req, res) => {
            const products = await getAdminProducts({});
            return res.status(200).json(products);
        },

        // Get All De Active Products
        getAdminDeActiveProducts: async (req, res) => {
            const productsObject = await getProducts({ is_active: false });
            return res.status(200).json(productsObject);
        },

        // Get All De Active Products
        getAdminActiveProducts: async (req, res) => {
            const productsObject = await getProducts({ is_active: true });
            return res.status(200).json(productsObject);
        },

        // Active Product by ID 
        activeProduct: async (req, res) => {
            const activeProduct = await updateProduct({ _id: req.params?.id, is_active: false }, { is_active: true }, res);
            if (!activeProduct) return error().resourceError(res, 'Sorry! This product doest not exists or something wrong', 422);
            return res.status(200).json(activeProduct);
        },

        // De Active Product by ID 
        deActiveProduct: async (req, res) => {
            const deActiveProduct = await updateProduct({ _id: req.params?.id, is_active: true }, { is_active: false }, res);
            if (!deActiveProduct) return error().resourceError(res, 'Sorry! This product doest not exists or something wrong', 422);
            return res.status(200).json(deActiveProduct);
        },

        // Update Product by ID 
        updateProduct: async (req, res) => {
            const validation = productValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            const updatedProduct = await updateProduct({ _id: req.params?.id }, req.body, res);
            return res.status(200).json(updatedProduct);
        },
        
        // Find One Product by ID 
        getSingleProduct: async (req, res) => {
            const product = await getProduct({ _id: req.params?.id });
            if (!product) return error().resourceError(res, 'Sorry! This product doest not exists or something wrong', 422);
            return res.status(200).json(product);
        },

        //qas
        getQAS: async (req, res) => {
            const qas = await getAdminProductQAS({});
            return res.status(200).json(qas);
        },

        replyQAS: async (req, res) => {
            const { reply } = req.body;
            const { product_id, qas_id } = req.params;
            if (!reply) return error().resourceError(res, 'Reply Text is Required', 422);
            const qas = await updateProductQas(product_id, qas_id, reply);
            if (!qas) return error().resourceError(res, 'Sorry! You can not do this', 422);
            return res.status(200).json(qas);
        },
    }
}
export { productController };