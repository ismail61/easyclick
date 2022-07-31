import { tryCatchHandle } from "../../utils";
import { adminAuthentication } from "../../middlewares/admin";
import { productController } from "../../controllers/admin";

function qasRoutes(app) {
    //reply qa 
    app.patch('/XYZ!@!/admin/reply-qas/:product_id/:qas_id', adminAuthentication, tryCatchHandle(productController().replyQAS));
    //get qas
    app.patch('/XYZ!@!/admin/qas', adminAuthentication, tryCatchHandle(productController().getQAS));
}
export { qasRoutes };