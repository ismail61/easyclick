import { Cart } from "../../mongodb/customer";

export const checkCartExist = async (query) => {
    try {
        return await Cart.findOne(query).lean();
    } catch (err) {
        console.log(err);
    }
}

export const checkCartItemExist = async (user_id, item) => {
    try {
        return await Cart.findOne({ user_id: user_id, 'items.product_id': item?.product_id, 'items.color_family': item?.color_family, 'items.size': item?.size }).lean();
    } catch (err) {
        console.log(err);
    }
}

export const createCart = async (items, user_id) => {
    try {
        const newCart = new Cart({ user_id: user_id, items: items });
        return await newCart.save();
    } catch (err) {
        console.log(err);
    }
}

export const addItemInCart = async (user_id, item) => {
    try {
        return await Cart.findOneAndUpdate({ user_id: user_id }, { $push: { items: item } }, { new: true }).lean().exec()
    } catch (err) {
        console.log(err);
    }
}

export const incrementItemInCart = async (user_id, item) => {
    try {
        return await Cart.findOneAndUpdate({
            user_id: user_id,
            'items.product_id': item?.product_id,
            'items.color_family': item?.color_family,
            'items.size': item?.size
        }, { $inc: { 'items.$.quantity': item.quantity } }, { new: true }).lean();
    } catch (err) {
        console.log(err);
    }
}

export const getCart = async (user_id) => {
    try {
        return await Cart.findOne({ user_id: user_id }).lean()
            .populate([
                {
                    path: 'items.product_id',
                    model: 'Product',
                    select: 'product_name slug'
                }
            ])
            .exec();
    } catch (err) {
        console.log(err);
    }
}

export const deleteCartById = async (cartId) => {
    try {
        return await Cart.findByIdAndRemove(cartId);
    } catch (err) {
        console.log(err);
    }
}

export const cartItemUpdate = async (user_id, item) => {
    try {
        return await Cart.findOneAndUpdate({
            user_id: user_id,
            'items.product_id': item?.product_id,
            'items.color_family': item?.color_family,
            'items.$.size': String(item?.size)
        }, { $set: { 'items.$.quantity': item.quantity } }, { new: true })
            .populate('items.product_id', 'product_name slug _id')
            .exec()
    } catch (err) {
        console.log(err);
    }
}

export const cartItemDelete = async (user_id, item) => {
    try {
        return await Cart.findOneAndUpdate({ user_id: user_id }, { $pull: { items: { product_id: item?.product_id, color_family: item?.color_family, size: item?.size } } }, { new: true }).lean()
            .populate('items.product_id', 'product_name slug _id')
            .exec()
    } catch (err) {
        console.log(err);
    }
}

export const cartAllItemDelete = async (user_id) => {
    try {
        return await Cart.findOneAndUpdate({ user_id }, { $set: { items: [] } }, { new: true }).lean()
            .exec()
    } catch (err) {
        console.log(err);
    }
}