import mongoose from "mongoose";

// String type & required
const StringRequired = {
    type: String,
    required: true,
};


var adminSchema = new mongoose.Schema({
    email: StringRequired,
    token: String,
    password: String,
});

export default mongoose.model('Admin', adminSchema);