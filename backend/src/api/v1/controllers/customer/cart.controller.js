import { addItemInCart, cartAllItemDelete, cartItemDelete, cartItemUpdate, checkCartExist, checkCartItemExist, createCart, deleteCartById, getCart, incrementItemInCart } from "../../services/customer";
import { error } from "../../utils";
import { itemValidation } from "../../validations";

function cartController() {
    return {
        addToCart: async (req, res) => {
            const item = { ...req.body };
            // Validate all information
            const validation = itemValidation(item);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            //check existing cart
            const isExistCart = await checkCartExist({ user_id: req.user?._id });
            if (!isExistCart) {
                const cart = await createCart([req.body], req.user?._id);
                return res.status(200).json(cart);
            }

            //check existing cart item
            const isExistItem = await checkCartItemExist(req.user?._id, item);
            if (!isExistItem) {
                const cart = await addItemInCart(req.user?._id, item);
                return res.status(200).json(cart);
            }

            const cart = await incrementItemInCart(req.user?._id, item);
            return res.status(200).json(cart);
        },
        getCustomerCart: async (req, res) => {
            const cart = await getCart(req.user?._id);
            if (!cart) return error().resourceError(res, 'Cart Not Found', 404);
            return res.status(200).json(cart);
        },
        deleteCart: async (req, res) => {
            const cart = await deleteCartById(req.params?.id);
            if (!cart) return error().resourceError(res, 'Deleted Cart Failed', 404);
            return res.status(200).json(cart);
        },
        updateCartItem: async (req, res) => {
            const item = { ...req.body };
            if (item && item?.quantity > 0) {
                // Validate all information
                const validation = itemValidation(item);
                if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

                const cart = await cartItemUpdate(req.user?._id, item);
                if (!cart) return error().resourceError(res, 'Updated Cart Failed', 404);
                return res.status(200).json(cart);
            }
            const cart = await cartItemDelete(req.user?._id, item);
            if (!cart) return error().resourceError(res, 'Updated Cart Failed', 404);
            return res.status(200).json(cart);
        },
        deleteCartItem: async (req, res) => {
            const item = { ...req.body };
            const cart = await cartItemDelete(req.user?._id, item);
            if (!cart) return error().resourceError(res, 'Deleted Cart Failed', 404);
            return res.status(200).json(cart);
        },
        deleteCartAllItem: async (req, res) => {
            const cart = await cartAllItemDelete(req.user?._id);
            if (!cart) return error().resourceError(res, 'Deleted Cart Failed', 404);
            return res.status(200).json(cart);
        },
    }
}
export { cartController };