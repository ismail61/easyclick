import { DeliveryList, CreateDeliveryFee, UpdateDeliveryFee } from "adapters/Delivery-fee/DeliveryFee";

export function getDeliverFees() {
  return DeliveryList('delivery-fees');
}

export function createDeliveryFee(data) {
  return CreateDeliveryFee('delivery-fee/create-delivery-fee', data);
}

export function editADeliveryFee(id, data) {
  return UpdateDeliveryFee(`delivery-fee/${id}`, data);
}
