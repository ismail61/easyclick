import { Box, Button, } from '@mui/material'
import React, { useState } from 'react'
import { DatePicker } from 'antd'
import { getOrderOverview } from 'services/finance/FinanceService';
import { useParams } from 'react-router-dom';
import * as XLSX from 'xlsx'
import MaterialTable from 'material-table';

const orderData = [
  { title: 'Order ID', field: 'id' },
  { title: 'Order Date', field: 'order_date' },
  { title: 'Product', field: 'product' },
  {
    title: 'Price',
    field: 'price',
  },
  {
    title: 'Qty',
    field: 'qty',
  },
  {
    title: 'Commission',
    field: 'commission',
  },
  {
    title: 'Shipping Fees',
    field: 'shipping_fee',
  },
  {
    title: 'VAT',
    field: 'vat',
  },
  {
    title: 'Payout Amount',
    field: 'payout_amount',
  },
]

const OrderOverview = () => {
  const { RangePicker } = DatePicker;
  const [allData, setData] = useState(null)
  const [loader, setLoader] = useState(false)
  const { id } = useParams();
  const onChange = async (date, dateString) => {
    if (dateString && dateString?.length > 0) {
      const start_date = dateString[0];
      const end_date = dateString[1];
      try {
        setLoader(true);
        const response = await getOrderOverview(id, start_date, end_date);
        let data = [];
        response?.data && response?.data?.forEach(order => {
          if (order?.products?.length > 0) {
            order?.products?.map(product => {
              const commission = ((product?.total_price - product?.shipment_fee) * product?.product_id?.category[product?.product_id?.category?.length - 1]?._id?.commission_rate) / 100;
              const vat = ((product?.total_price - product?.shipment_fee) * product?.product_id?.category[product?.product_id?.category?.length - 1]?._id?.vat) / 100;
              const payout_amount = product?.total_price - (commission + vat)
              const tempObj = {
                id: order?._id,
                order_date: order.createdAt?.slice(0, 10),
                product: product,
                price: (product?.total_price - product?.shipment_fee),
                qty: product?.quantity,
                commission: commission,
                shipment_fee: product?.shipment_fee,
                vat: vat,
                payout_amount: payout_amount
              }
              data.push(tempObj)
            })
          }
        })
        setData(data)
      } catch (error) {

      } finally {
        setLoader(false)
      }
    }
  }

  const downloadExcel = () => {
    const workSheet = XLSX.utils.json_to_sheet(allData)
    const workBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workBook, workSheet, "orders")
    //Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" })
    //Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
    //Download
    XLSX.writeFile(workBook, `Balushai${Math.floor(Math.random() * 10090090) + 1}.xlsx`)
  }
  return (
    <Box sx={{ paddingX: 1 }}>
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <RangePicker
          size='medium'
          onChange={onChange}
          allowClear={false}
        />
        {loader ? <Button type="submit" variant="contained">
          <i className="fas fa-circle-notch fa-spin fa-xl"></i>
        </Button> : null}
      </Box>
      {
        allData ? <>
          <Box sx={{ paddingY: 1, paddingX: 2 }}>
            {
              allData && allData.length > 0 ? <>
                <MaterialTable
                  title="Order Preview"
                  columns={orderData}
                  data={allData?.map(dta => {
                    return {
                      id: dta?.id,
                      order_date: dta.order_date,
                      product: dta?.product?.name,
                      price: dta?.price,
                      qty: dta?.qty,
                      commission: dta?.commission,
                      shipping_fee: dta?.shipment_fee,
                      vat: dta?.vat,
                      payout_amount: dta?.payout_amount
                    }
                  })}
                  options={{
                    search: false,
                    paging: false,
                  }}
                  actions={[
                    {
                      icon: () => <span style={{ color: 'green' }}><i class="fa-solid fa-file-export"></i></span>,
                      tooltip: "Export to Excel",
                      onClick: () => downloadExcel(),
                      isFreeAction: true
                    }
                  ]}

                />
              </> : null
            }
          </Box>
        </> : null
      }

    </Box>
  )
}

export default OrderOverview