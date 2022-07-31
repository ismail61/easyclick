import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getOrder } from 'services/order/OrderService';

const OrderDetailsInformationFactory = ({ type }) => {
    const [order, setOrder] = useState({})
    const [total, setTotal] = useState(0);
    const [fee, setFee] = useState(0);
    const { id } = useParams();
    const getVendorSingleOrder = async () => {
        const res = await getOrder(id);
        setOrder(res?.data);
        let tk = 0 , shipping = 0;
        res?.data?.products?.forEach(product => {
            tk += product?.total_price;
            shipping += product?.shipment_fee
        });
        setTotal(tk);
        setFee(shipping);
    }

    useEffect(() => {
        getVendorSingleOrder();
    }, [])
    switch (type) {
        case 'customer':
            return (
                <Typography variant='h6' sx={{ fontSize: '17px' }}>
                    Order Date: {order?.createdAt?.slice(0, 10)} <br />
                    Customer: {order?.user_id?.name}<br />
                    Phone: {order?.user_id?.phone}<br />
                    Payment Method: {order?.payment_information?.method}
                </Typography>
            )
        case 'amount':
            return (
                <Typography variant='h6' sx={{ fontSize: '17px' }}>
                    Price: {total - fee} <br />
                    Shipping Fee: {fee}<br />
                    Discount: {Number(order?.discount_amount) || 0}<br />
                    Total: {total -((Number(order?.discount_amount) || 0)) }
                </Typography>
            )
        case 'billing_information':
            return (
                <Typography variant='h6' sx={{ fontSize: '17px' }}>
                    Name: {order?.billing_address?.full_name}<br />
                    Address: {order?.billing_address?.address}<br />
                    Area: {order?.billing_address?.area}<br />
                    City: {order?.billing_address?.city}<br />
                    Region: {order?.billing_address?.region}
                </Typography>
            )
        case 'shipping_information':
            return (
                <Typography variant='h6' sx={{ fontSize: '17px' }}>
                    Name: {order?.shipping_address?.full_name}<br />
                    Address: {order?.shipping_address?.address}<br />
                    Area: {order?.shipping_address?.area}<br />
                    City: {order?.shipping_address?.city}<br />
                    Region: {order?.shipping_address?.region}
                </Typography>
            )
        default:
            return (
                null
            )
    }
}

export default OrderDetailsInformationFactory