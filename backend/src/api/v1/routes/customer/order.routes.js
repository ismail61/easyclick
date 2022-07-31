import { orderController } from "../../controllers/common";
import { tryCatchHandle } from "../../utils";
import { customerAuthentication } from '../../middlewares/customer/'

function orderRoutes(app) {

    app.get('/customer/orders', customerAuthentication, tryCatchHandle(orderController().getCustomerAllOrders));
    app.get('/customer/order/:id', customerAuthentication, tryCatchHandle(orderController().getCustomerSingleOrder));
    app.post('/customer/create-order', customerAuthentication, tryCatchHandle(orderController().createOrder));
    //First id means order id & second id means ordered single Product id
    app.patch('/customer/cancel-order/:order_id/:product_id', customerAuthentication, tryCatchHandle(orderController().cancelOrder));
    //First id means order id & second id means ordered single Product id
    app.patch('/customer/return-order/:order_id/:product_id', customerAuthentication, tryCatchHandle(orderController().returnOrderedProduct));
}
export { orderRoutes };