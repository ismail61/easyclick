/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { Box, Button, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import Swal from 'sweetalert2';
import { TryCatch } from "utils";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { deleteMerchantTransaction, paidMerchantTransaction } from 'services/merchant/MerchantService';

const WalletRow = (props) => {
    const { wallet } = props;
    const [open, setOpen] = React.useState(false);
    const paidHandle = async (id, transaction_id, amount) => {
        const res = await Swal.fire({
            title: 'Do you want to Paid this transaction',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `cancel`,
        })
        if (res?.isConfirmed) {
            TryCatch(async () => {
                await paidMerchantTransaction(id, transaction_id,amount);
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'This Transaction has been Paid',
                    showConfirmButton: false,
                    timer: 1500
                })
                props?.getAllMerchantCountManage();
                props?.getAllWallets()
            });
        }
    }
    const deleteHandle = async (id, transaction_id) => {
        const res = await Swal.fire({
            title: 'Do you want to Delete this transaction?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `cancel`,
        })
        if (res?.isConfirmed) {
            TryCatch(async () => {
                await deleteMerchantTransaction(id, transaction_id);
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'This Transaction has been Deleted',
                    showConfirmButton: false,
                    timer: 1500
                })
                props?.getAllMerchantCountManage();
                props?.getAllWallets()
            });
        }
    }
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
                <TableCell component="th" scope="row" title={wallet?._id} sx={{ cursor: 'pointer' }}>
                    {wallet.user_id?._id}
                </TableCell>
                <TableCell component="th" scope="row">
                    <small>
                        Name: {wallet.user_id?.name} <br />
                        Email: {wallet.user_id?.email} <br />
                        Phone: {wallet.user_id?.phone}
                    </small>
                </TableCell>
                <TableCell component="th" scope="row">
                    BDT {wallet.total_amount}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Withdraw Request Transactions
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Withdraw Amount</TableCell>
                                        <TableCell>Requested Date</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        wallet?.transactions && wallet?.transactions?.map((transaction, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        BDT {transaction?.amount}
                                                    </TableCell>
                                                    <TableCell>{transaction?.createdAt?.slice(0, 10)}</TableCell>
                                                    <TableCell>
                                                        <small>
                                                            <Button variant="outlined" size="small" color="success" onClick={() => paidHandle(wallet?._id, transaction?._id,transaction?.amount)}>
                                                                Paid
                                                            </Button>
                                                            <br />
                                                            <Button variant="outlined" size="small" color="error" className='mt-1' onClick={() => deleteHandle(wallet?._id, transaction?._id)}>
                                                                Delete
                                                            </Button>
                                                        </small>

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

export default WalletRow