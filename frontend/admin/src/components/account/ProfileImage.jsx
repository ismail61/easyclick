import { Box, Button, Card, CardContent, CardHeader } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getSellerProfileImage, updateProfileImage } from 'services/account/AcountInformation'
import { SuccessToast, TryCatch } from 'utils'
const ProfileImage = () => {
    const [image, setImage] = useState({})
    const ImageUpload = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        TryCatch(async () => {
            const res = await updateProfileImage(formData);
            SuccessToast('Profile Image Uploaded Successful')
            setImage(res?.data);
        });
    }
    const getSellerProfile = async () => {
        TryCatch(async () => {
            const res = await getSellerProfileImage()
            setImage(res?.data);
        });
    }
    useEffect(() => {
        getSellerProfile()
    }, [])
    return (
        <div>
            <Card>
                <CardHeader
                    title="Profile Photo"
                />
                <CardContent item md={9} xs={12} sx={{ display: 'flex' }}>
                    <Button
                        variant="contained"
                        component="label"
                    >
                        Upload Profile
                        <input
                            type="file"
                            onChange={ImageUpload}
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
                alt="Profile Image."
                src={image?.url}
            />

        </div>
    )
}

export default ProfileImage