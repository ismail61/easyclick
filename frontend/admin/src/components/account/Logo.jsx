import { Box, Button, Card, CardContent, CardHeader } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getSellerShopLogo, updateLogo } from 'services/account/AcountInformation';
import { SuccessToast, TryCatch } from 'utils';
const Logo = () => {
  const [logo, setLogo] = useState({})
  const LogoUpload = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    TryCatch(async () => {
      const res = await updateLogo(formData);
      SuccessToast('Logo Uploaded Successful')
      setLogo(res?.data);
    });
  }
  const getSellerLogo = async () => {
    TryCatch(async () => {
      const res = await getSellerShopLogo()
      setLogo(res?.data);
    });
  }
  useEffect(() => {
    getSellerLogo()
  }, [])

  return (
    <div>
      <Card>
        <CardHeader
          title="Logo"
        />
        <CardContent item md={9} xs={12} sx={{ display: 'flex' }}>
          <Button
            variant="contained"
            component="label"
          >
            Upload Shop Logo
            <input
              type="file"
              onChange={LogoUpload}
              hidden
            />
          </Button>
        </CardContent>
      </Card>
      <Box
        component="img"
        sx={{
          marginTop: '30px',
          height: 233,
          width: 350,
          maxHeight: { xs: 233, md: 167 },
          maxWidth: { xs: 350, md: 250 },
        }}
        alt="Shop Logo."
        src={logo?.url}
      />

    </div>
  )
}

export default Logo