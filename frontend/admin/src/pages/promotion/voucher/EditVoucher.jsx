/* eslint-disable jsx-a11y/alt-text */
import { Box, Grid } from "@mui/material";
import FormikInput from "components/Input/FormikInput";
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import FormikSelect from "components/Input/FormikSelect";
import { Button } from "@mui/material";
import { ErrorToast, SuccessToast, TryCatch } from "utils";
import { useNavigate, useParams } from "react-router-dom";
import DateRangePicker from "components/Date/DateRangePicker";
import { editVoucher, getSingleVoucher } from "services/promotions/Promotion.Service";

export default function EditVoucher() {
  const { id } = useParams();
  const [discountType, setDiscountType] = useState("");
  const [voucher, setVoucher] = useState("");
  const history = useNavigate();

  const onSubmit = (values) => {
    TryCatch(async () => {
      await editVoucher(id, values);
      SuccessToast("Voucher Updated Successful");
      history('/voucher/list')
  });
  };
  const VoucherIdCheck = async () => {
    try {
      const res = await getSingleVoucher(id);
      setVoucher(res?.data);
      setDiscountType(res?.data?.discount_type);
    } catch (error) {
      ErrorToast("Voucher Not Found");
      history("/voucher/list");
    }
  };
  const StartDateHandler = (date, dateString, setFieldValue) => {
    setFieldValue("start_from", dateString);
  };
  const EndDateHandler = (date, dateString, setFieldValue) => {
    setFieldValue("end_time", dateString);
  };

  useEffect(() => {
    VoucherIdCheck();
  }, []);

  return (
    <>
      <Box sx={{ p: { xs: 2, md: 2 } }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {/* Formik Form handler */}
            <Formik
              enableReinitialize={true}
              onSubmit={onSubmit}
              initialValues={{
                name: voucher?.name || undefined,
                start_from: voucher?.start_from || undefined,
                end_time: voucher?.end_time || undefined,
                code: voucher?.code || undefined,
                discount_type: voucher?.discount_type || undefined,
                discount_amount: voucher?.discount_amount || undefined,
                discount_amount_percentage: voucher?.discount_amount_percentage || undefined,
                max_discount_amount: voucher?.max_discount_amount || undefined,
                min_amount_to_apply: voucher?.min_amount_to_apply || undefined,
                total_issued_voucher:
                  voucher?.total_issued_voucher || undefined,
              }}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <Box
                    sx={{
                      backgroundColor: "white",
                      boxShadow: 2,
                      p: 2,
                    }}
                  >
                    <FormikInput id="name" name="name" label="Voucher Name" fixed={values.name} />
                    <DateRangePicker
                      id="start_from"
                      name="start_from"
                      edit={true}
                      label="Start Date"
                      defaultValue={values?.start_from?.slice(0, 10)}
                      placeholder="Start Date"
                      setFieldValue={setFieldValue}
                      StartDateHandler={StartDateHandler}
                    />
                    <DateRangePicker
                      id="end_time"
                      name="end_time"
                      edit={true}
                      defaultValue={values?.end_time?.slice(0, 10)}
                      label="End Time"
                      placeholder="End Date"
                      EndDateHandler={EndDateHandler}
                      setFieldValue={setFieldValue}
                    />
                    <FormikInput
                      id="code"
                      name="code"
                      label="Voucher Code"
                      placeholder="Use letters and numbers. e.g. BALUSHAI123"
                      fixed={values.code}
                    />
                    <span
                      onClick={(e) =>
                        setDiscountType(e.target.value || discountType)
                      }
                    >
                      <FormikSelect
                        id="discount_type"
                        name="discount_type"
                        label="Discount Type"
                        disabled
                        options={[
                          { name: "MONEY_VALUE_VOUCHER" },
                          { name: "PERCENTAGE_VALUE_VOUCHER" },
                        ]}
                      />
                    </span>
                    {discountType && discountType === "MONEY_VALUE_VOUCHER" ? (
                      <FormikInput
                        id="discount_amount"
                        name="discount_amount"
                        label="Discount Amount"
                        type="number"
                      />
                    ) : null}
                    {discountType &&
                      discountType === "PERCENTAGE_VALUE_VOUCHER" ? (
                      <>
                        <FormikInput
                          id="discount_amount_percentage"
                          name="discount_amount_percentage"
                          label="Discount Value %"
                          type="number"
                        />
                        <FormikInput
                          id="max_discount_amount"
                          name="max_discount_amount"
                          label="Maximum Discount(BDT)"
                          type="number"
                        />
                      </>
                    ) : null}

                    <FormikInput
                      id="min_amount_to_apply"
                      name="min_amount_to_apply"
                      label="Minimum Amount to apply(BDT)"
                      type="number"
                    />
                    <FormikInput
                      id="total_issued_voucher"
                      name="total_issued_voucher"
                      label="Total Issued Voucher"
                      type="number"
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
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
