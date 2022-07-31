import { authController, emailController } from "../../controllers/customer";
import { tryCatchHandle } from "../../utils";

function authRoutes(app) {
    app.post('/customer/sign-in', tryCatchHandle(authController().signIn));
    app.post('/customer/register', tryCatchHandle(authController().signUp));
    app.get('/customer/authenticate', tryCatchHandle(authController().authenticate));

    //Password Reset 
    app.post('/customer/send-token', tryCatchHandle(emailController().sendPasswordInEmail));
    // app.post('/customer/verity-token', tryCatchHandle(emailController().verifyToken));
}
export { authRoutes };