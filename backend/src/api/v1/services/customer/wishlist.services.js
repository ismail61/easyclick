import { Wishlist } from "../../mongodb/customer";

export const checkWishlistExist = async (query) => {
    try {
        return await Wishlist.findOne(query).lean();
    } catch (err) {
        console.log(err);
    }
}

export const checkWishlistItemExist = async (user_id, item) => {
    try {
        return await Wishlist.findOne({ user_id: user_id, 'items.product_id': item?.product_id, 'items.color_family': item?.color_family, 'items.size': item?.size }).lean();
    } catch (err) {
        console.log(err);
    }
}

export const createWishlist = async (items, user_id) => {
    try {
        const newWishlist = new Wishlist({ user_id: user_id, items: items });
        return await newWishlist.save();
    } catch (err) {
        console.log(err);
    }
}

export const addItemInWishlist = async (user_id, item) => {
    try {
        return await Wishlist.findOneAndUpdate({ user_id: user_id }, { $push: { items: item } }).lean()
    } catch (err) {
        console.log(err);
    }
}

export const incrementItemInWishlist = async (user_id, item) => {
    try {
        return await Wishlist.findOneAndUpdate({
            user_id: user_id,
            'items.product_id': item?.product_id,
            'items.color_family': item?.color_family,
            'items.size': item?.size
        }, { $inc: { 'items.$.quantity': item.quantity } }, { new: true }).lean();
    } catch (err) {
        console.log(err);
    }
}

export const getWishlist = async (user_id) => {
    try {
        return await Wishlist.findOne({ user_id: user_id }).lean()
            .populate('items.product_id', 'product_name slug _id')
            .exec();
    } catch (err) {
        console.log(err);
    }
}

export const deleteWishlistById = async (WishlistId) => {
    try {
        return await Wishlist.findByIdAndRemove(WishlistId).lean();
    } catch (err) {
        console.log(err);
    }
}

/* export const WishlistItemUpdate = async (user_id, item) => {
    try {
        return await Wishlist.findOneAndUpdate({
            user_id: user_id,
            'items.product_id': item?.product_id,
            'items.color_family': item?.color_family,
            'items.size': item?.size
        }, { $set: { 'items.$.quantity': item.quantity } }, { new: true })
            .populate('items.product_id', 'product_name -_id')
            .exec()
    } catch (err) {
        console.log(err);
    }
} */

export const WishlistItemDelete = async (user_id, product_id) => {
    try {
        return await Wishlist.findOneAndUpdate({ user_id: user_id }, { $pull: { items: { product_id } } }, { new: true }).lean()
            .populate('items.product_id', 'product_name _id')
            .exec()
    } catch (err) {
        console.log(err);
    }
}

export const WishlistAllItemDelete = async (user_id) => {
    try {
        return await Wishlist.findOneAndUpdate({ user_id: user_id }, { $set: { items: [] } }, { new: true }).lean()
            .exec()
    } catch (err) {
        console.log(err);
    }
}