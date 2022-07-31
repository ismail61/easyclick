import { error } from "../../utils";
import validator from "validator";
import * as address from '@bangladeshi/bangladesh-address';
import { addressValidation } from "../../validations";
import { createAddress, deleteAddress, getAllAddress, updateAddress, updateAddressAndCustomer } from "../../services/customer";
import { updateAddressValidation } from "../../validations/customer/account/address.validation";

function addressController() {
    return {
        // create an address
        createAddress: async (req, res) => {

            const validation = addressValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            const { address } = req.body;

            const savedAddress = await createAddress({ _id: req.user?._id }, {
                ...req.body,
                address: validator.escape(address)
            })

            return res.status(201).json(savedAddress);
        },

        // Find single address by ID 
        getSingleAddress: async (req, res) => {
            const address = await getSingleAddress({ _id: req.params?.id });
            if (!address) return error().resourceError(res, 'Sorry! This address doest not exists or something wrong', 422);
            return res.status(200).json(address)
        },

        // Delete address by ID 
        deleteAddress: async (req, res) => {
            const deletedAddress = await deleteAddress({ _id: req.params?.id }, req.user?._id);
            if (!deletedAddress) return error().resourceError(res, 'Sorry! This address doest not exists or something wrong', 422);
            return res.status(200).json(deletedAddress);
        },

        // Get All Address
        getAllAddresses: async (req, res) => {
            // Get all address form db
            const addresses = await getAllAddress({ _id: req.user?._id })
            return res.status(200).send(addresses);
        },

        // Update Address by ID
        updateAddress: async (req, res) => {

            const validation = updateAddressValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            let { address } = req.body;
            if (address) address = validator?.escape(address);

            const updatedAddress = await updateAddress({ _id: req.params?.id }, {
                ...req.body,
                address
            })

            if (!updatedAddress) return error().resourceError(res, 'Sorry! This Address doest not exists or something wrong', 422);
            return res.status(200).send(updatedAddress);
        },

        // Set Shipping Address by ID
        setDefaultShippingAddress: async (req, res) => {
            // Update address 
            const updatedAddress = await updateAddressAndCustomer({ _id: req.params?.id }, {
                default_shipping_address: true
            }, req.user?._id);

            if (!updatedAddress) return error().resourceError(res, 'Sorry! This category doest not exists or something wrong', 422);
            return res.status(200).send(updatedAddress);
        },

        // Un Set Shipping Address by ID
        unsetDefaultShippingAddress: async (req, res) => {
            // Update address 
            const updatedAddress = await updateAddress({ _id: req.params?.id }, {
                default_shipping_address: false
            });

            if (!updatedAddress) return error().resourceError(res, 'Sorry! This category doest not exists or something wrong', 422);
            return res.status(200).send(updatedAddress);
        },

        // Get All Divisions
        getDivisions: async (req, res) => {
            const addresses = address.allDivision();
            let tempAddress = [];
            addresses?.forEach((address, index) => {
                tempAddress.push({
                    key: index,
                    value: address
                })
            })
            return res.status(200).send(tempAddress);
        },

        // Get All Cities
        getCities: async (req, res) => {
            if (!req.params?.region) return error().resourceError(res, 'Sorry! You need to select a Division', 422);
            const addresses = address?.districtsOf(req.params?.region?.toLowerCase());
            let tempAddress = [];
            addresses?.forEach((address, index) => {
                tempAddress.push({
                    key: address,
                    value: address
                })
            })
            return res.status(200).send(tempAddress);
        },

        // Get All Post
        getPostCode: async (req, res) => {
            if (!req.params?.city) return error().resourceError(res, 'Sorry! You need to select a City', 422);
            const allUpazila = address?.upazilasOf(req.params?.city?.toLowerCase());
            let upazila = [];
            if (allUpazila && allUpazila?.length > 0) {
                allUpazila?.forEach(nestedUpazila => {
                    upazila.push(nestedUpazila.upazila)
                })
            }
            let tempAddress = [];
            upazila?.forEach((address, index) => {
                tempAddress.push({
                    key: address,
                    value: address
                })
            })
            return res.status(200).send(tempAddress);
        },
    }
}
export { addressController };