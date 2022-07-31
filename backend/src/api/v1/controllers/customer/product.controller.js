
import { AddQuestion, getActivatedAndApprovedProducts, getSingleProduct } from "../../services/customer";
import { error } from '../../utils';

function productController() {
    return {
        // get single product by slug name
        getSingleProductBySlug: async (req, res) => {
            const product = await getSingleProduct({ slug: req.params?.slug, is_active: true, status: 'APPROVED' });
            if (!product) return error().resourceError(res, 'Sorry! This product doest not exists or something wrong', 422);
            return res.status(200).json(product);
        },

        // Get All Products
        getAllProducts: async (req, res) => {
            const products = await getActivatedAndApprovedProducts({ $and: [{ is_active: true }, { status: 'APPROVED' }] });
            return res.status(200).json(products);
        },

        // Get admin Products
        GetAdminAllProducts: async (req, res) => {
            const products = await getActivatedAndApprovedProducts({ is_active: true, status: 'APPROVED' });
            return res.status(200).json(products);
        },

        // get single product by slug name
        addQuestion: async (req, res) => {
            const { text } = req.body;
            if (!text) return error().resourceError(res, 'Text is Required', 422);
            const product = await AddQuestion({ slug: req.params?.slug, is_active: true, status: 'APPROVED' }, {
                text,
                user_id: req?.user?._id
            });
            if (!product) return error().resourceError(res, 'Sorry! You can not do this', 422);
            return res.status(200).json({
                message: 'Question Added Successful'
            });
        },
    }
}
export { productController };