import { AddProduct, FeatureUpdate, GetProducts, SingleProduct, UpdateProduct } from "adapters/product/Product";

export function getProducts(type, role, id) {
    switch (role) {
        case 'admin':
            switch (type) {
                case 'all':
                    return GetProducts('products');
                case 'online':
                    return GetProducts('online-products');
                case 'pending':
                    return GetProducts('pending-products');
                case 'suspended':
                    return GetProducts('suspended-products');
                default:
                    return null;
            }
        case 'vendor':
            switch (type) {
                case 'all':
                    return GetProducts(`vendor/all-products/${id}`);
                case 'online':
                    return GetProducts(`vendor/online-products/${id}`);
                case 'pending':
                    return GetProducts(`vendor/pending-products/${id}`);
                case 'suspended':
                    return GetProducts(`vendor/suspended-products/${id}`);
                default:
                    return null;
            }

        default:
            return null;
    }
}

export function getSingleProduct(id) {
    return SingleProduct(`product/${id}`);
}

export function dynamicProductFeaturesHandler(type, id, data) {
    switch (type) {
        case 'approved':
            return FeatureUpdate(`approved-product/${id}`, data);
        case 'suspended':
            return FeatureUpdate(`suspended-product/${id}`, data);
        default:
            return null;
    }
}

export function getProductCount(type, id) {
    switch (type) {
        case 'all':
            return GetProducts(`vendor/all-product-counts/${id}`);
        case 'pending':
            return GetProducts(`vendor/pending-product-counts/${id}`);
        case 'online':
            return GetProducts(`vendor/online-product-counts/${id}`);
        case 'suspended':
            return GetProducts(`vendor/suspended-product-counts/${id}`);
        default:
            return null;
    }
}

//admin

export function addProduct(data) {
    return AddProduct('add-product', data);
}

export function getAdminProducts(type) {
    switch (type) {
        case 'all':
            return GetProducts('products');
        case 'online':
            return GetProducts('online-products');
        case 'deactive':
            return GetProducts('deactive-products');
        default:
            return null;
    }
}

export function dynamicFeaturesHandler(type, id) {
    switch (type) {
        case 'deactive':
            return FeatureUpdate(`deactive-product/${id}`);
        case 'active':
            return FeatureUpdate(`active-product/${id}`);
        default:
            return null;
    }
}

export function updateProduct(id, data) {
    return UpdateProduct(`update-product/${id}`, data);
}

