import { imageController } from "../../controllers/common";
import { upload } from "../../middlewares/commom";
import { adminAuthentication } from "../../middlewares/admin";
import { tryCatchHandle } from "../../utils";

function imageRoutes(app) {
    app.post('/XYZ!@!/admin/image/upload', adminAuthentication, upload.single('image'), tryCatchHandle(imageController().uploadImage));
    app.delete('/XYZ!@!/admin/image/delete/easyclick/product/:public_id', adminAuthentication, tryCatchHandle(imageController().deleteImage));
}
export { imageRoutes };