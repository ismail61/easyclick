import { emailController } from "../../controllers/admin";
import { tryCatchHandle } from "../../utils";
import { adminAuthentication } from "../../middlewares/admin";

function emailRoutes(app) {
    app.post('/XYZ!@!/admin/email/send-email', adminAuthentication, tryCatchHandle(emailController().sendEmail));
}
export { emailRoutes };