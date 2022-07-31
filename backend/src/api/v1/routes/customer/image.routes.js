import { imageController } from "../../controllers/common";
import { upload } from "../../middlewares/commom";
import { customerAuthentication } from "../../middlewares/customer";
import { tryCatchHandle } from "../../utils";

function imageRoutes(app) {
    app.post('/customer/review-image/upload', customerAuthentication, upload.single('image'), tryCatchHandle(imageController().uploadImage));
}
export { imageRoutes };