/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { cancelOrder, deliveryOrder, failOrder, readyToShipOrder, returnOrder, shipOrder } from "services/order/OrderService";
import { Box, Button, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Swal from 'sweetalert2';
import Countdown from 'react-countdown';
import { cancel_reasons } from 'constants/index';
import { Link } from "react-router-dom";
import { ErrorToast, TryCatch } from "utils";

const OrderRow = (props) => {
    const { order } = props;
    const [open, setOpen] = React.useState(false);
    let total = 0;
    let qty = 0;
    order?.products?.forEach(product => {
        total += product?.total_price;
        qty += product?.quantity
    })
    const orderCancelHandle = async (order_id, product_id) => {
        const res = await Swal.fire({
            title: 'Select The Cancel Reason',
            input: 'select',
            inputOptions: cancel_reasons,
            showCancelButton: true,
            confirmButtonText: 'Submit',
            inputPlaceholder: 'Select a reason',
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to select a option!'
                }
            }
        })
        if (res?.isConfirmed && res?.value) {
            TryCatch(async () => {
                await cancelOrder(order_id, product_id, res?.value);
                props?.getAllOrders();
                props?.getAllOrderCountManage();
                ErrorToast('Order Canceled Successful')
            });
        }
    }
    const orderReadyToShipHandle = async (order_id, product_id) => {
        const res = await Swal.fire({
            title: 'Do you want to ready to ship this order?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `cancel`,
        })
        if (res?.isConfirmed) {
            TryCatch(async () => {
                await readyToShipOrder(order_id, product_id);
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your order has been Ready to Shipped',
                    showConfirmButton: false,
                    timer: 1500
                })
                props?.getAllOrderCountManage();
                props?.getAllOrders()
            });
        }
    }
    const orderShipHandle = async (order_id, product_id) => {
        const res = await Swal.fire({
            title: 'Do you want to Shipped this order?',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            inputPlaceholder: 'Enter Delivery Service',
            denyButtonText: `cancel`,
        })
        if (res?.isConfirmed) {
            TryCatch(async () => {
                await shipOrder(order_id, product_id, { delivery: res?.value });
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'This order has been Shipped',
                    showConfirmButton: false,
                    timer: 1500
                })
                props?.getAllOrderCountManage();
                props?.getAllOrders()
            });
        }
    }
    const orderDeliveryHandle = async (order_id, product_id) => {
        const res = await Swal.fire({
            title: 'Do you want to delivered this order?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `cancel`,
        })
        if (res?.isConfirmed) {
            TryCatch(async () => {
                await deliveryOrder(order_id, product_id);
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'This order has been Delivered',
                    showConfirmButton: false,
                    timer: 1500
                })
                props?.getAllOrderCountManage();
                props?.getAllOrders()
            });
        }
    }
    const orderFailHandle = async (order_id, product_id) => {
        const res = await Swal.fire({
            title: 'Do you want to Failed this order?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `cancel`,
        })
        if (res?.isConfirmed) {
            TryCatch(async () => {
                await failOrder(order_id, product_id);
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'This order has been Deliver Failed',
                    showConfirmButton: false,
                    timer: 1500
                })
                props?.getAllOrderCountManage();
                props?.getAllOrders()
            });
        }
    }
    const orderReturnHandle = async (order_id, product_id) => {
        const res = await Swal.fire({
            title: 'Do you want to Returned this order?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `cancel`,
        })
        if (res?.isConfirmed) {
            TryCatch(async () => {
                await returnOrder(order_id, product_id);
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'This order has been Returned',
                    showConfirmButton: false,
                    timer: 1500
                })
                props?.getAllOrderCountManage();
                props?.getAllOrders()
            });
        }
    }
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
        return completed ? <span style={{ color: 'red' }}>SLA Beached</span> : <span>{days}d : {hours}h : {minutes}m : {seconds}s</span>;
    };
    if (order?.products?.length === 0) {
        return null;
    } else {
        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row" title={order?._id} sx={{ cursor: 'pointer' }}>
                        <Link to={{
                            pathname: `/order/${order?._id}`
                        }}>{order._id}</Link>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {order?.createdAt?.slice(0, 10)}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {order?.payment_information?.method}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {total}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {qty}
                    </TableCell>
                    <TableCell component="th" scope="row" sx={{ fontSize: '12px' }}>
                        {order?.products?.length === 1 ? <><small>{order?.products[0].status}</small></> : <>*</>}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        <Button variant="outlined" size="small" color="secondary">
                            <Link to={{
                                pathname: `/order/${order?._id}`
                            }}>More</Link>
                        </Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Order Details #{order?._id}
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Customer</TableCell>
                                            <TableCell>Product</TableCell>
                                            <TableCell>Image</TableCell>
                                            <TableCell>More</TableCell>
                                            <TableCell>Qty</TableCell>
                                            <TableCell>Price</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell title="Ship On Time SLA">SLA</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            order?.products && order?.products?.map((product, index) => {
                                                return (
                                                    <TableRow key={index}>
                                                        <TableCell>
                                                            <small>
                                                                {
                                                                    order?.billing_address ? <>
                                                                        {order?.billing_address?.full_name}<br></br>
                                                                        {order?.billing_address?.address}<br></br>
                                                                        {order?.billing_address?.area}<br></br>
                                                                        {order?.billing_address?.city}<br></br>
                                                                        {order?.billing_address?.region}<br></br>
                                                                        {order?.billing_address?.phone}
                                                                    </> : <span>*</span>
                                                                }
                                                            </small>
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                <small>
                                                                    {product?.name}<br></br>
                                                                    color: {product?.color}<br></br>
                                                                    size: {product?.size}
                                                                </small>
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            <img
                                                                height="100px"
                                                                width="80px"
                                                                className="img-fluid ml-5 m-2"
                                                                src={product?.image}
                                                                alt="Product Image"
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                <small>
                                                                    drop off: {product?.provider?.drop_off}<br></br>
                                                                    delivery: {product?.provider?.delivery}<br></br>
                                                                    tracking: <small sx={{ fontSize: '12px' }}>{product?.tracking_number}</small>
                                                                </small>
                                                            }
                                                        </TableCell>
                                                        <TableCell><small>{product?.quantity}</small></TableCell>
                                                        <TableCell>
                                                            <small>{product?.total_price}</small>
                                                        </TableCell>
                                                        <TableCell sx={{ fontSize: '12px' }} title={product?.status === 'CANCELLED' ? `${product?.cancellation_reasons}` : null}><small>{product?.status}</small></TableCell>
                                                        <TableCell><small>
                                                            {product?.ship_on_time?.slice(0, 10)}<br></br>
                                                            <span style={{ color: 'blue' }}>
                                                                <Countdown date={new Date(product?.ship_on_time)}
                                                                    renderer={renderer} />
                                                            </span>
                                                        </small></TableCell>
                                                        <TableCell>
                                                            {(product && (product?.status === 'PENDING' || product?.status === 'READY_TO_SHIP')) ? <><small>{
                                                                <small>
                                                                    <br />
                                                                    <Button variant="outlined" size="small" color="error" onClick={() => orderCancelHandle(order?._id, product?.product_id)}>
                                                                        Cancel
                                                                    </Button>
                                                                </small>
                                                            }</small></> : <> </>}
                                                            {(product && (product?.status === 'PENDING')) ? <><small>{
                                                                <small>
                                                                    <Button variant="outlined" size="small" color="success" sx={{ marginY: 1 }} onClick={() => orderReadyToShipHandle(order?._id, product?.product_id)}>
                                                                        Ready To Ship
                                                                    </Button>
                                                                    <br />
                                                                </small>
                                                            }</small></> : <> </>}
                                                            {(product && (product?.status === 'READY_TO_SHIP')) ? <><small>{
                                                                <small>
                                                                    <Button sx={{ my: 1 }} variant="outlined" size="small" color="success" onClick={() => orderShipHandle(order?._id, product?.product_id)}>
                                                                        Shipped
                                                                    </Button>
                                                                    <br />
                                                                </small>
                                                            }</small></> : <> </>}
                                                            {(product && (product?.status === 'SHIPPED')) ? <><small>{
                                                                <small>
                                                                    <Button sx={{ my: 1 }} variant="outlined" size="small" color="success" onClick={() => orderDeliveryHandle(order?._id, product?.product_id)}>
                                                                        Delivered
                                                                    </Button>
                                                                    <br />
                                                                    <Button sx={{ my: 1 }} variant="outlined" size="small" color="error" onClick={() => orderFailHandle(order?._id, product?.product_id)}>
                                                                        Failed
                                                                    </Button>
                                                                </small>
                                                            }</small></> : <> </>}
                                                            {(product && (product?.status === 'DELIVERY_FAILED')) ? <><small>{
                                                                <small>
                                                                    <Button sx={{ my: 1 }} variant="outlined" size="small" color="error" onClick={() => orderReturnHandle(order?._id, product?.product_id)}>
                                                                        Returned
                                                                    </Button>
                                                                </small>
                                                            }</small></> : <> </>}
                                                            {(product && product?.return_request) ? <><small>{
                                                                <small>
                                                                    <Button sx={{ my: 1 }} variant="outlined" size="small" color="error" onClick={() => orderReturnHandle(order?._id, product?.product_id)}>
                                                                        Returned
                                                                    </Button>
                                                                </small>
                                                            }</small></> : <> </>}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

}

export default OrderRow