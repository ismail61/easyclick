import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Box, CardHeader, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import FormikInput from "components/Input/FormikInput";
import FormikSelect from "components/Input/FormikSelect";
import {
  SellerReturnAddress,
  updateReturnAddress,
} from "services/account/AcountInformation";
import { SetAllDistricts, SetAllPostCodes, SuccessToast, TryCatch } from "utils";
import { useEffect, useState } from "react";
import * as address from '@bangladeshi/bangladesh-address';

export default function ReturnAddressInfoCard() {
  const [user, setUser] = useState({});
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [postCodes, setPostCodes] = useState([]);
  const onSubmit = (values) => {
    TryCatch(async () => {
      await updateReturnAddress(values);
      SuccessToast("Return Address Updated Successful");
    });
  };
  const getSellerReturnAddressInfo = () => {
    TryCatch(async () => {
      const response = await SellerReturnAddress();
      setUser(response?.data);
    });
  };
  const setAllDivisions = () => {
    const allDivision = address.allDivision();
    const tmp = [];
    allDivision?.forEach(division => {
      tmp.push({name : division})
    })
    setDivisions(tmp);
  };
  const divisionHandler = (e, setFieldValue) => {
    setDistricts([]);
    setPostCodes([]);
    setFieldValue('city', undefined);
    setFieldValue('post_code', undefined);
    const {value} = e.target;
    const allDis = address?.districtsOf(value?.toLowerCase()); // allDis means All Districts
    const setAllDis = SetAllDistricts(allDis);
    setDistricts(setAllDis);
    setFieldValue('division', value);
  }
  const districtHandler = (e, setFieldValue) => {
    setPostCodes([]);
    setFieldValue('post_code', undefined);
    const {value} = e.target;
    const allUpazila = address?.upazilasOf(value?.toLowerCase()); // allDis means All Upazila
    const setAllUpa = SetAllPostCodes(allUpazila);
    setPostCodes(setAllUpa);
    setFieldValue('city', value);
  }
  const postCodeHandler = (e, setFieldValue) => {
    const {value} = e.target;
    setFieldValue('post_code', value);
  }
  useEffect(() => {
    getSellerReturnAddressInfo();
    setAllDivisions();
  }, []);
  return (
    <Card>
      <CardHeader title="Return Address" />
      <CardContent item md={9} xs={12}>
        <Formik
          enableReinitialize={true}
          initialValues={{
            name: user?.return_address?.name || undefined,
            address: user?.return_address?.address || undefined,
            phone: user?.return_address?.phone || undefined,
            city_or_town: user?.return_address?.city_or_town || undefined,
            country: user?.return_address?.country || undefined,
            division: user?.return_address?.division || undefined,
            city: user?.return_address?.city || undefined,
            post_code: user?.return_address?.post_code || undefined,
          }}
          onSubmit={onSubmit}
        >
          {({ values , setFieldValue}) => (
            <Form>
              <Box
                sx={{
                  backgroundColor: "white",
                  boxShadow: 2,
                  p: 2,
                }}
              >
                <FormikInput
                  id="name"
                  name="name"
                  label="Full Name"
                  value={values.name}
                />
                <FormikInput
                  id="address"
                  name="address"
                  label="Address"
                  value={values.address}
                />
                <FormikInput
                  id="phone"
                  name="phone"
                  label="Phone"
                  type="number"
                  value={values.phone}
                />
                <FormikInput
                  id="city_or_town"
                  name="city_or_town"
                  label="City/Town"
                  value={values.city_or_town}
                />
                <FormikSelect
                  id="country"
                  name="country"
                  label="Country"
                  options={[
                    { name: "Bangladesh" },
                  ]}
                  value={values.country}
                />
                <FormikSelect
                  id="division"
                  name="division"
                  label="Division"
                  options={divisions}
                  value={values.division}
                  onChange={(e)=> divisionHandler(e,setFieldValue)}
                />
                <FormikSelect
                  id="city"
                  name="city"
                  label="City"
                  options={districts}
                  value={values.city}
                  onChange={(e)=> districtHandler(e,setFieldValue)}
                />
                <FormikSelect
                  id="post_code"
                  name="post_code"
                  label="Post Code"
                  options={postCodes}
                  value={values.post_code}
                  onChange={(e)=> postCodeHandler(e,setFieldValue)}
                />
              </Box>
              <Grid item sm={6} sx={{ my: 2 }}>
                <Box display="flex" justifyContent="flex-end">
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </Box>
              </Grid>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
