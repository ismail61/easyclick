import { smsController } from "../../controllers/admin";
import { tryCatchHandle } from "../../utils";
import { adminAuthentication } from "../../middlewares/admin";

function smsRoutes(app) {
    app.post('/XYZ!@!/admin/sms/send-sms', adminAuthentication, tryCatchHandle(smsController().sendSms));
}
export { smsRoutes };