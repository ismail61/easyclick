import { getMembers, getWebsiteCategory, getWebsiteHomePageCategory, getWebsiteHomePageCategoryWithoutChildren, getWebsiteProduct } from "../../services/customer";
import _ from "lodash";
const categoryController = () => {
    return {
        // Get All Home Page Category
        getWebsiteHomePageCategory: async (req, res) => {
            const categories = await getWebsiteHomePageCategoryWithoutChildren({
                show_on_home_page: true,
            });
            return res.status(200).send(categories);
        },

        // Get All Category
        getWebsiteCategory: async (req, res) => {
            const categories = await getWebsiteHomePageCategory({});
            return res.status(200).send(getMembers(categories));
        },

        // Get All Products by category Slug
        getWebsiteProductBySpecificCategory: async (req, res) => {
            const categories = await getWebsiteProduct({ slug: req.params.slug });
            return res.status(200).send(categories?.products);
        },
    }
};

export { categoryController };