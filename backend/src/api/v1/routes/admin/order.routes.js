
import { tryCatchHandle } from "../../utils";
import { orderController } from "../../controllers/admin";
import { adminAuthentication } from "../../middlewares/admin";

function orderRoutes(app) {

    app.get('/XYZ!@!/admin/orders',adminAuthentication, tryCatchHandle(orderController().getAllOrders));
    app.get('/XYZ!@!/admin/order/:order_id',adminAuthentication, tryCatchHandle(orderController().getOrder));
    app.patch('/XYZ!@!/admin/shipped-order/:order_id/:product_id',adminAuthentication, tryCatchHandle(orderController().shippedOrder));
    app.patch('/XYZ!@!/admin/ready-to-ship-order/:order_id/:product_id',adminAuthentication, tryCatchHandle(orderController().readyToShippedOrder));
    app.patch('/XYZ!@!/admin/delivered-order/:order_id/:product_id',adminAuthentication, tryCatchHandle(orderController().deliveredOrder));
    app.patch('/XYZ!@!/admin/returned-order/:order_id/:product_id',adminAuthentication, tryCatchHandle(orderController().returnedOrder));
    app.patch('/XYZ!@!/admin/failed-delivery-order/:order_id/:product_id',adminAuthentication, tryCatchHandle(orderController().failedDeliveryOrder));
    app.patch('/XYZ!@!/admin/cancel-order/:order_id/:product_id',adminAuthentication, tryCatchHandle(orderController().cancelOrder));
    app.get('/XYZ!@!/admin/pending-orders',adminAuthentication, tryCatchHandle(orderController().getPendingOrders));
    app.get('/XYZ!@!/admin/ready-to-ship-orders',adminAuthentication, tryCatchHandle(orderController().getReadyToShipOrders));
    app.get('/XYZ!@!/admin/shipped-orders',adminAuthentication, tryCatchHandle(orderController().getShippedOrders));
    app.get('/XYZ!@!/admin/delivered-orders',adminAuthentication, tryCatchHandle(orderController().getDeliveredOrders));
    app.get('/XYZ!@!/admin/canceled-orders',adminAuthentication, tryCatchHandle(orderController().getCanceledOrders));
    app.get('/XYZ!@!/admin/returned-request-orders',adminAuthentication, tryCatchHandle(orderController().getReturnRequestOrders));
    app.get('/XYZ!@!/admin/returned-orders',adminAuthentication, tryCatchHandle(orderController().getReturnedOrders));
    app.get('/XYZ!@!/admin/pending-order-counts',adminAuthentication, tryCatchHandle(orderController().getPendingOrderCounts));
    app.get('/XYZ!@!/admin/ready_to_ship-order-counts',adminAuthentication, tryCatchHandle(orderController().getReadyToShipOrderCounts));
    app.get('/XYZ!@!/admin/shipped-order-counts',adminAuthentication, tryCatchHandle(orderController().getShippedOrderCounts));
    app.get('/XYZ!@!/admin/failed_delivery-orders',adminAuthentication, tryCatchHandle(orderController().getFailedDeliveryOrders));
    app.get('/XYZ!@!/admin/delivered-order-counts',adminAuthentication, tryCatchHandle(orderController().getDeliveredOrderCounts));
    app.get('/XYZ!@!/admin/cancelled-order-counts',adminAuthentication, tryCatchHandle(orderController().getCancelledOrderCounts));
    app.get('/XYZ!@!/admin/returned-request-order-counts',adminAuthentication, tryCatchHandle(orderController().getReturnRequestOrderCounts));
    app.get('/XYZ!@!/admin/returned-order-counts',adminAuthentication, tryCatchHandle(orderController().getReturnedOrderCounts));
    app.get('/XYZ!@!/admin/failed_delivery-order-counts',adminAuthentication, tryCatchHandle(orderController().getFailedDeliveryOrderCounts));
}
export { orderRoutes };