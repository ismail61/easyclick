import { AdminRoutes } from "./admin";
import { CustomerRoutes } from "./customer";

function routes(app) {
    AdminRoutes(app);
    CustomerRoutes(app);
}
export { routes };