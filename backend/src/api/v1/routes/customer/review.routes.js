import { tryCatchHandle } from "../../utils";
import {customerAuthentication} from '../../middlewares/customer'
import { reviewController } from "../../controllers/common";

function reviewRoutes(app) {
    //Create Review customer 
    app.post('/customer/create-review', customerAuthentication, tryCatchHandle(reviewController().createReview));
}
export { reviewRoutes };