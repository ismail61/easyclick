import { addItemInWishlist, checkWishlistExist, checkWishlistItemExist, createWishlist, deleteWishlistById, getWishlist, incrementItemInWishlist, WishlistAllItemDelete, WishlistItemDelete } from "../../services/customer";
import { error } from "../../utils";
import { itemValidation } from "../../validations";

function wishlistController() {
    return {
        addToWishlist: async (req, res) => {
            const item = { ...req.body };
            // Validate all information
            const validation = itemValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            //check existing wishlist
            const isExistWishlist = await checkWishlistExist({ user_id: req.user?._id });
            if (!isExistWishlist) {
                const wishlist = await createWishlist([item], req.user?._id);
                return res.status(200).json(wishlist);
            }

            //check existing wishlist item
            const isExistItem = await checkWishlistItemExist(req.user?._id, item?.product_id);
            if (!isExistItem) {
                const wishlist = await addItemInWishlist(req.user?._id, item);
                return res.status(200).json(wishlist);
            }

            const wishlist = await incrementItemInWishlist(req.user?._id, item);
            return res.status(200).json(wishlist);
        },
        getCustomerWishlist: async (req, res) => {
            const wishlist = await getWishlist(req.user?._id);
            if (!wishlist) return error().resourceError(res, 'Wishlist Not Found', 404);
            return res.status(200).json(wishlist);
        },
        deleteWishlist: async (req, res) => {
            const wishlist = await deleteWishlistById(req.params?.id);
            if (!wishlist) return error().resourceError(res, 'Deleted Failed', 404);
            return res.status(200).json(wishlist);
        },
        /*         updateWishlistItem: async (req, res) => {
                    const item = { ...req.body };
                    if (item && item?.quantity > 0) {
                        const wishlist = await WishlistItemUpdate(req.user?._id, item);
                        if (!wishlist) return error().resourceError(res, 'Updated Failed', 404);
                        return res.status(200).json(wishlist);
                    }
                    const wishlist = await WishlistItemDelete(req.user?._id, item);
                    if (!wishlist) return error().resourceError(res, 'Updated Failed', 404);
                    return res.status(200).json(wishlist);
                }, */
        deleteWishlistItem: async (req, res) => {
            const { product_id } = req.params;
            const wishlist = await WishlistItemDelete(req.user?._id, product_id);
            if (!wishlist) return error().resourceError(res, 'Item Deleted Failed', 404);
            return res.status(200).json(wishlist);
        },
        deleteWishlistAllItem: async (req, res) => {
            const wishlist = await WishlistAllItemDelete(req.user?._id);
            if (!wishlist) return error().resourceError(res, 'All Item Deleted Failed', 404);
            return res.status(200).json(wishlist);
        },
    }
}
export { wishlistController };