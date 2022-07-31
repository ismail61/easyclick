import { messageController } from "../../controllers/common/chat.controller";
import { adminAuthentication } from "../../middlewares/admin/auth.middleware";
import { tryCatchHandle } from "../../utils";

function chatRoutes(app) {
  app.get('/XYZ!@!/admin/chat/get-messages-from-vendor',adminAuthentication, tryCatchHandle(messageController().getAdminMessages));
}
export { chatRoutes };