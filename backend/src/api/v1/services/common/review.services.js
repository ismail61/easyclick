import { Order, Review } from "../../mongodb/common";
import { Customer } from "../../mongodb/customer";

export const createCustomerReview = async (user_id, data) => {
    try {
        const { product_id, order_id } = data;
        const newReview = await new Review(data);
        const savedReview = await newReview.save();
        await pushCustomerReviews(user_id, newReview._id);
        await pushProductReviews(product_id, newReview._id, newReview.rating);
        await pushOrderReviewD(order_id, product_id);
        return savedReview;
    } catch (err) {
        console.log(err)
    }
}

const pushCustomerReviews = async (user_id, review_id) => {
    let reviewsArray = await Customer.findOne({ _id: user_id }).lean().select('reviews -_id') || [];
    const { reviews } = reviewsArray;
    reviews?.push({ _id: review_id });
    await Customer.findOneAndUpdate({ _id: user_id }, { reviews }).lean();
}


const pushProductReviews = async (product_id, review_id, newRating) => {
    let reviewsArray = await Product.findOne({ _id: product_id }).lean().select('reviews rating -_id') || [];
    const { reviews, rating } = reviewsArray;
    const ratingCalculation = ((Number(rating) * Number(reviews?.length)) + Number(newRating)) / (Number(reviews?.length) + 1);
    reviews?.push({ _id: review_id });
    await Product.findOneAndUpdate({ _id: product_id }, { reviews, rating: Number.parseFloat(ratingCalculation).toFixed(1) }).lean();
}

const pushOrderReviewD = async (order_id, product_id) => {
    await Order.findOneAndUpdate({ _id: order_id, 'products.product_id': product_id }, { 'products.$.reviewed': true }).lean();
}

export const replyReview = async (query, data) => {
    try {
        return await Review.findOneAndUpdate(query, { $set: data }).lean();
    } catch (err) {
        console.log(err)
    }
}

export const getAdminReview = async (query) => {
    try {
        return await Review.find(query).lean().populate([{
            
            path: 'user_id',
            model: 'Customer',
            select: 'name'
        }, {
            path: 'product_id',
            model: 'Product',
            select: 'product_name'
        }]);
    } catch (err) {
        console.log(err)
    }
}