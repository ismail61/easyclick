import React, { useEffect, useRef, useState } from 'react'
import PropTypes from "prop-types";
import { Box, Button, Divider, Paper, Tab, Table, TableBody, TableContainer, TableHead, TableRow, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import CaseDecision from 'components/switch/CaseDecision';
import { order_details_variation } from 'constants/index';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrder } from 'services/order/OrderService';
import ReactToPrint from 'react-to-print';
import { ErrorToast } from 'utils';
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>
            <CaseDecision type={children} />
          </Typography>
        </Box>
      )}
    </div>
  );
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
export class ComponentToPrint extends React.PureComponent {
  render() {
    return (
      <div>My cool content here!</div>
    );
  }
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const OrderDetails = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const componentRef = useRef();
  const history = useNavigate();
  const [order, setOrder] = useState({})
  const [total, setTotal] = useState(0);
  const [fee, setFee] = useState(0);
  const { id } = useParams();
  const getVendorSingleOrder = async () => {
    try {
      const res = await getOrder(id);
      setOrder(res?.data);
      let tk = 0, shipping = 0;
      res?.data?.products?.forEach(product => {
        tk += product?.total_price;
        shipping += product?.shipment_fee
      });
      setTotal(tk);
      setFee(shipping);
    } catch (error) {
      ErrorToast("Order Not Found");
      history('/order/list')
    }
  }

  useEffect(() => {
    getVendorSingleOrder();
  }, [])
  return (
    <>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", margin: 1, marginTop: 5 }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Customer" {...a11yProps(0)} />
            <Tab label="Amount" {...a11yProps(1)} />
            <Tab label="Billing Address" {...a11yProps(2)} />
            <Tab label="Shipping Address" {...a11yProps(3)} />
          </Tabs>
        </Box>
        {
          order_details_variation.map((type, index) => {
            return (<TabPanel value={value} index={index}>
              {type}
            </TabPanel>)
          })
        }
        <Box
          sx={{
            backgroundColor: "white",
            my: 2,
            display: "flex",
            justifyContent: "space-between",
            px: 2
          }}
        >
          <span></span>
          <ReactToPrint
            trigger={() => <button><i className="fas fa-print"></i></button>}
            content={() => componentRef.current}
          />
        </Box>
        <div style={{display: 'none'}}>
        <div class="container mt-5 mb-5" ref={componentRef}>
          <div class="d-flex justify-content-center row">
            <div class="col-md-10">
              <div class="receipt bg-white py-3 rounded"><img src="images/balushai.jpg" width="120" />
                <h6 class="name">Hello {order?.user_id?.name}.</h6><span class="fs-12 text-black-50"></span>
                <hr />
                <div class="d-flex flex-row justify-content-between align-items-center order-details">
                  <div><span class="d-block fs-12 mx-4">Ordered date</span><span class="font-weight-bold" style={{whiteSpace: 'nowrap'}}>{order?.createdAt?.slice(0, 10)}</span></div>
                  <div><span class="d-block fs-12">Shipping Address</span><span class="font-weight-bold text-success">
                    Name: {order?.shipping_address?.full_name}<br />
                    Address: {order?.shipping_address?.address}<br />
                    Area: {order?.shipping_address?.area}<br />
                    City: {order?.shipping_address?.city}<br />
                    Region: {order?.shipping_address?.region}
                  </span></div> 
                </div>

                <div><span class="d-block fs-12">Order ID</span><span class="font-weight-bold">{order?._id}</span></div>
                <hr />
                {
                  order?.products && order?.products?.map(product => {
                    return (
                      <>
                        <div class="d-flex justify-content-between align-items-center product-details">
                          <div class="d-flex flex-row product-name-image"><img class="rounded" src={product?.image} width="80" />
                            <div class="d-flex flex-column justify-content-between ml-2 mx-3">
                              <div><span class="d-block font-weight-bold p-name">
                                {product?.name}
                              </span>
                                <span class="fs-12">{product?.color}</span>
                                <span class="fs-12 mx-3">{product?.size}</span>
                              </div>
                              <span class="fs-12">
                                Qty: {product?.quantity}
                              </span>
                            </div>
                          </div>
                          <div class="product-price">
                            <b>
                              ৳ {product?.total_price}
                            </b>
                          </div>
                        </div>
                      </>
                    )
                  })
                }

                <div class="mt-5 amount row">
                  <div class="d-flex justify-content-center col-md-6"></div>
                  <div class="col-md-6">
                    <div class="billing">
                      <div class="d-flex justify-content-between"><span>Subtotal</span><span class="font-weight-bold">৳ {total}</span></div>
                      <div class="d-flex justify-content-between mt-2"><span>Shipping fee</span><span class="font-weight-bold">৳ {fee}</span></div>
                      <div class="d-flex justify-content-between mt-2"><span class="text-success">Discount</span><span class="font-weight-bold text-success">
                        ৳ {order?.discount_amount || 0}</span></div>
                      <hr />
                      <div class="d-flex justify-content-between mt-1"><span class="font-weight-bold">Total</span><span class="font-weight-bold text-success">
                        ৳ {total - ((Number(order?.discount_amount) || 0))}</span></div>
                    </div>
                  </div>
                </div><span class="d-block mt-3 text-black-50 fs-15">We will be sending a confirmation email when the item is delivered!</span>
                <hr />
                <div class="d-flex justify-content-between align-items-center footer">
                  <div class="thanks"><span class="d-block font-weight-bold">Thanks for shopping</span><strong>Balushai.com</strong></div>
                  <div class="d-flex flex-column justify-content-end align-items-end"><span class="d-block font-weight-bold">Need Help?</span><span>Call - 974493933</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <Divider>Items</Divider>
        <center style={{ margin: '10px 0' }}>ID: {order?._id}</center>
        <Divider sx={{ marginX: 2 }}></Divider>

        <Box sx={{ padding: 1 }}>
          <TableContainer component={Paper} sx={{ width: '100%' }}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>SKU</StyledTableCell>
                  <StyledTableCell>Product</StyledTableCell>
                  <StyledTableCell>More</StyledTableCell>
                  <StyledTableCell>Qty</StyledTableCell>
                  <StyledTableCell>Price</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Shipping</StyledTableCell>
                  <StyledTableCell>Refunds</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order?.products?.map((product, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                      {product?.seller_sku}
                    </StyledTableCell>
                    <StyledTableCell>
                      {
                        <small>
                          {product?.name}<br></br>
                          color: {product?.color}<br></br>
                          size: {product?.size}<br></br>
                          vendor: {product?.vendor_id}
                        </small>
                      }
                    </StyledTableCell>
                    <StyledTableCell>
                      {
                        <small>
                          drop off: {product?.provider?.drop_off}<br></br>
                          delivery: {product?.provider?.delivery}<br></br>
                          tracking: <small sx={{ fontSize: '12px' }}>{product?.tracking_number}</small>
                        </small>
                      }
                    </StyledTableCell>
                    <StyledTableCell> <small>{product?.quantity}</small> </StyledTableCell>
                    <StyledTableCell><small>{Number(product?.price)}</small></StyledTableCell>
                    <StyledTableCell><small>{product?.status}</small> </StyledTableCell>
                    <StyledTableCell> <small>{product?.shipment_fee}</small> </StyledTableCell>
                    <StyledTableCell> <small>{product?.refunds}</small> </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

    </>
  );
}

export default OrderDetails