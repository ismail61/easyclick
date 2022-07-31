import { authController } from "../../controllers/admin";
import { tryCatchHandle } from "../../utils";

function authRoutes(app) {
    app.post('/XYZ!@!/admin/create-AbC*!@', tryCatchHandle(authController().signUp));
    app.post('/XYZ!@!/admin/send-password', tryCatchHandle(authController().sendPassword));
    app.post('/XYZ!@!/admin/sign-in', tryCatchHandle(authController().signIn));
    app.get('/XYZ!@!/admin/authenticate', tryCatchHandle(authController().Authenticate));
}
export { authRoutes };