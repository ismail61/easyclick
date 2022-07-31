import { tryCatchHandle } from "../../../utils";
import { freeShippingController } from "../../../controllers/admin";
import { adminAuthentication } from "../../../middlewares/admin";

function freeShippingRoutes(app) {
    app.get(
        "/XYZ!@!/admin/promotions/free-shippings",
        adminAuthentication,
        tryCatchHandle(freeShippingController().getAllFreeShippings)
    );
    app.get(
        "/XYZ!@!/admin/promotions/active-free-shippings",
        adminAuthentication,
        tryCatchHandle(freeShippingController().getAllActiveFreeShippings)
    );
    app.get(
        "/XYZ!@!/admin/promotions/deactive-free-shippings",
        adminAuthentication,
        tryCatchHandle(freeShippingController().getAllDeActiveFreeShippings)
    );
    app.get(
        "/XYZ!@!/admin/promotions/free-shipping/:id",
        adminAuthentication,
        tryCatchHandle(freeShippingController().getSingleFreeShipping)
    );
    app.post(
        "/XYZ!@!/admin/promotions/create-free-shipping",
        adminAuthentication,
        tryCatchHandle(freeShippingController().createFreeShipping)
    );
    app.delete(
        "/XYZ!@!/admin/promotions/delete-free-shipping/:id",
        adminAuthentication,
        tryCatchHandle(freeShippingController().deleteFreeShipping)
    );
    app.patch(
        "/XYZ!@!/admin/promotions/active-free-shipping/:id",
        adminAuthentication,
        tryCatchHandle(freeShippingController().activeFreeShipping)
    );
    app.patch(
        "/XYZ!@!/admin/promotions/deactive-free-shipping/:id",
        adminAuthentication,
        tryCatchHandle(freeShippingController().deActiveFreeShipping)
    );
}
export { freeShippingRoutes };