
import { addressController } from "../../controllers/customer";
import { customerAuthentication } from "../../middlewares/customer";
import { tryCatchHandle } from "../../utils";

function addressRoutes(app) {
    app.post('/customer/create-address', customerAuthentication, tryCatchHandle(addressController().createAddress));
    app.get('/customer/addresses', customerAuthentication, tryCatchHandle(addressController().getAllAddresses));
    app.get('/customer/address/:id', customerAuthentication, tryCatchHandle(addressController().getSingleAddress));
    app.delete('/customer/delete-address/:id', customerAuthentication, tryCatchHandle(addressController().deleteAddress));
    app.patch('/customer/address/:id', customerAuthentication, tryCatchHandle(addressController().updateAddress));
    app.patch('/customer/set-shipping-address/:id', customerAuthentication, tryCatchHandle(addressController().setDefaultShippingAddress));
    app.patch('/customer/unset-shipping-address/:id', customerAuthentication, tryCatchHandle(addressController().unsetDefaultShippingAddress));

    //region city post
    app.get('/customer/get-divisions', customerAuthentication, tryCatchHandle(addressController().getDivisions));
    app.get('/customer/get-cities/:region', customerAuthentication, tryCatchHandle(addressController().getCities));
    app.get('/customer/get-post-code/:city', customerAuthentication, tryCatchHandle(addressController().getPostCode));
}
export { addressRoutes };