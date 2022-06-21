import { Product } from "../../mongodb/admin";

export const getAdminProductQAS = async (query) => {
    try {
        return await Product.find(query).lean().select('questions_and_answers product_name').populate({
            path: 'questions_and_answers.user_id',
            model: 'Customer',
            select: 'name'
        })
    } catch (err) {
        console.log(err)
    }
}

export const updateProductQas = async (product_id, qas_id, reply) => {
    try {
        const product = await Product.findOne({
            _id: product_id,
            'questions_and_answers._id': String(qas_id)
        }).lean();

        product?.questions_and_answers && product?.questions_and_answers?.forEach(qa => {
            if (String(qa?._id) === String(qas_id)) {
                qa.reply = reply;
            }
        })
        
        return Product.findByIdAndUpdate({
            _id: product_id,
            'questions_and_answers._id': String(qas_id)
        }, { $set: product }, { new: true }).lean().exec()

    } catch (err) {
        console.log(err)
    }
}