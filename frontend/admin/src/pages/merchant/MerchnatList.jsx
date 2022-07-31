import { Box, Button, Typography } from '@mui/material'
import { MerchantTabs } from 'components/TabsPanel'
import React, { useEffect, useState } from 'react'
import { getMerchantDiscount, updateMerchantDiscount } from 'services/merchant/MerchantService'
import Swal from 'sweetalert2'
import { TryCatch } from 'utils'

const MerchantList = () => {
  const [discount, setDiscount] = useState(null);
  const [loader, setLoader] = useState(false)
  const MerchantDiscount = () => {
    TryCatch(async () => {
      const response = await getMerchantDiscount();
      setDiscount(response?.data?.discount || 0);
    });
  }

  const updateDiscount = async () => {
    try {
      const res = await Swal.fire({
        text: `Merchant Discount(BDT)`,
        input: 'number',
        confirmButtonText: 'Submit',
        inputPlaceholder: discount,
        allowEscapeKey: false,
        inputValidator: (value) => {
          if (!value) {
            return 'You need to input discount!'
          }
        },
      })
      if (res?.isConfirmed && res?.value) {
        setLoader(true)
        await updateMerchantDiscount({ discount: res?.value });
        setLoader(false);
        MerchantDiscount();
      }
    } catch (error) {
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    MerchantDiscount()
  }, [])

  return (
    <Box sx={{ paddingX: 4, paddingY: 2 }}>
      <Typography variant="h5" gutterBottom component="div">
        Merchants Manage
      </Typography>
      <Box
        sx={{
          backgroundColor: "white",
          my: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" gutterBottom component="div">
          Discount: BDT {discount || 0}
        </Typography>
        {
          loader ? <i className="fa fa-refresh fa-spin"></i> :
            <Button onClick={updateDiscount} type="submit" variant="contained">
              Update Discount
            </Button>
        }
      </Box>
      <MerchantTabs />
    </Box>
  )
}

export default MerchantList