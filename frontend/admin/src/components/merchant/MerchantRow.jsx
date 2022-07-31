/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { Button, TableCell, TableRow } from "@mui/material";
import Swal from 'sweetalert2';
import { TryCatch } from "utils";
import { activeMerchant, deActiveMerchant } from 'services/merchant/MerchantService';

const MerchantRow = (props) => {
    const { merchant } = props;
    const merchantActiveHandle = async (id) => {
        const res = await Swal.fire({
            title: 'Do you want to Active this merchant?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `cancel`,
        })
        if (res?.isConfirmed) {
            TryCatch(async () => {
                await activeMerchant(id);
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'This Merchant has been Activated',
                    showConfirmButton: false,
                    timer: 1500
                })
                props?.getAllMerchantCountManage();
                props?.getAllMerchants()
            });
        }
    }
    const merchantDeActiveHandle = async (id) => {
        const res = await Swal.fire({
            title: 'Do you want to De-Active this merchant?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `cancel`,
        })
        if (res?.isConfirmed) {
            TryCatch(async () => {
                await deActiveMerchant(id);
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'This Merchant has been DeActivated',
                    showConfirmButton: false,
                    timer: 1500
                })
                props?.getAllMerchantCountManage();
                props?.getAllMerchants()
            });
        }
    }
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                </TableCell>
                <TableCell component="th" scope="row" title={merchant?._id} sx={{ cursor: 'pointer' }}>
                    <small>{merchant._id}</small>
                </TableCell>
                <TableCell component="th" scope="row">
                    <small>{merchant?.createdAt?.slice(0, 10)}</small>
                </TableCell>
                <TableCell component="th" scope="row" title={merchant?._id} sx={{ cursor: 'pointer' }}>
                    <small>
                        Name: {merchant?.name} <br />
                        Email: {merchant?.email} <br />
                        Phone: {merchant?.phone}
                    </small>
                </TableCell>
                <TableCell component="th" scope="row">
                    {merchant?.orders?.length}
                </TableCell>
                <TableCell component="th" scope="row">
                    {
                        merchant.merchant ? <>
                            {
                                merchant?.active ?
                                    <Button onClick={() => merchantDeActiveHandle(merchant._id)} variant="outlined" size="small" color="secondary">
                                        De Active
                                    </Button> : null
                            }
                            {
                                !merchant?.active ?
                                    <Button onClick={() => merchantActiveHandle(merchant._id)} variant="outlined" size="small" color="error">
                                        Active
                                    </Button> : null
                            }
                        </> : null
                    }
                </TableCell>
            </TableRow>
        </React.Fragment>
    );

}

export default MerchantRow