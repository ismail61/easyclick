import mongoose from "mongoose";

const BannerSchema = new mongoose.Schema({
    image: {
        url: String,
        public_id: String
    },
    redirect_url: String,
    show_on_home_page: {
        type: Boolean,
        default: false
    },
});

export default mongoose.model('Banner', BannerSchema);