import { tryCatchHandle } from "../../utils";
import {adminAuthentication} from '../../middlewares/admin'
import { reviewController } from "../../controllers/common";

function reviewRoutes(app) {
    //reply review
    app.get('/XYZ!@!/admin/reviews', adminAuthentication, tryCatchHandle(reviewController().getAdminReviews));
    //reply review 
    app.patch('/XYZ!@!/admin/reply-review/:review_id', adminAuthentication, tryCatchHandle(reviewController().replyReview));
}
export { reviewRoutes };