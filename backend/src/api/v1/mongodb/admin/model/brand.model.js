import mongoose from "mongoose";

var BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

BrandSchema.index({name : 1})

export default mongoose.model('Brand', BrandSchema);