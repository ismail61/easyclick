import { ProductImageDelete, ProductImageUpload } from "adapters/image/ProductImageUpload";

export function ImageUpload(formData) {
    return ProductImageUpload('image/upload',formData);
}

export function DocumentUpload(formData) {
    return ProductImageUpload('document/upload',formData);
}

export function RemoveImage(public_id) {
    return ProductImageDelete(`image/delete/${public_id}`);
}

