/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, IconButton, TextField } from "@mui/material";
import { SuccessToast, TryCatch } from "utils";
import { Link } from "react-router-dom";
import { ActiveFreeShipping, DeActiveFreeShipping, deleteFreeShipment, getFreeShipping } from "services/promotions/Promotion.Service";
import { FilterByProperty } from "components/search/FilterBySearchOtherValue";
import Swal from "sweetalert2";

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
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export default function FreeShippingFactory({ type }) {
    const [freeShippings, setFreeShipping] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState("");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const deleteFreeShipping = async (id) => {
        const res = await Swal.fire({
            title: 'Do you want to Delete this Promotion?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `cancel`,
        })
        if (res?.isConfirmed) {
            TryCatch(async () => {
                await deleteFreeShipment(id);
                await Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'This Promotion has been Deleted',
                    showConfirmButton: false,
                    timer: 1500
                })
                getAllFreeShippings()
            });
        }
    };
    const activeFreeShipping = async (id) => {
        TryCatch(async () => {
            TryCatch(async () => {
                await ActiveFreeShipping(id);
                SuccessToast('This Promotion has been Activated');
                getAllFreeShippings();
            });
        });
    };
    const deActiveFreeShipping = async (id) => {
        TryCatch(async () => {
            await DeActiveFreeShipping(id);
            SuccessToast('This Promotion has been De Activated');
            getAllFreeShippings();
        });
    };
    const getAllFreeShippings = () => {
        TryCatch(async () => {
            if (type === 'all') {
                const res = await getFreeShipping('promotions/free-shippings');
                setFreeShipping(res?.data)
            } else if (type === 'active') {
                const res = await getFreeShipping('promotions/active-free-shippings');
                setFreeShipping(res?.data)
            } else if (type === 'deactive') {
                const res = await getFreeShipping('promotions/deactive-free-shippings');
                setFreeShipping(res?.data)
            } else {
                setFreeShipping([])
            }
        });
    }
    useEffect(() => {
        getAllFreeShippings();
    }, [type])

    const filterFreeShippings = FilterByProperty(freeShippings, searchValue, 'free_shipping_name');
    return (
        <>
            <Box
                sx={{
                    maxWidth: '100%',
                    mb: 1
                }}
            >
                <TextField
                    fullWidth
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    id="filled-search"
                    label="Search By Voucher Code"
                    type="search"
                    variant="filled"
                />
            </Box>
            <Paper sx={{ overflowX: "auto" }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Period</StyledTableCell>
                                <StyledTableCell>Condition</StyledTableCell>
                                <StyledTableCell>Details</StyledTableCell>
                                <StyledTableCell>Owner</StyledTableCell>
                                <StyledTableCell>Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filterFreeShippings.length > 0 && filterFreeShippings
                                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((freeShipping, index) => {
                                    return (
                                        <>
                                            <StyledTableRow
                                                key={index}
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
                                                <StyledTableCell component="th" scope="row">
                                                    {freeShipping?.name}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {
                                                        freeShipping?.period_type === 'LONG_TERM' ? <>
                                                            {freeShipping?.period_type}
                                                        </> : <>
                                                            {freeShipping?.specific_period?.start_date?.slice(0, 10)}
                                                            <br />
                                                            {freeShipping?.specific_period?.end_date?.slice(0, 10)}
                                                        </>
                                                    }
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <small> {freeShipping?.condition_type}</small>
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row">
                                                    <small>
                                                        {freeShipping?.condition_type === 'NO_CONDITION' ?
                                                            <> No Condition </> :
                                                            <>
                                                                {
                                                                    freeShipping?.condition_type === 'SHOP_ITEM_QUANTITY_ABOVE' ?
                                                                        <>Quantity: {freeShipping?.quantity}</> :
                                                                        <> Amount(BDT): {freeShipping?.amount}</>
                                                                }
                                                            </>
                                                        }
                                                    </small>
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row">
                                                    {freeShipping?.created_by === 'ADMIN' ? 'admin' :
                                                        <Link to={{
                                                            pathname: `/vendor/${freeShipping?.vendor_id?._id}`
                                                        }}>{freeShipping?.vendor_id?.seller_account?.shop_name}</Link>
                                                    }
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <IconButton
                                                        onClick={() => deleteFreeShipping(freeShipping?._id)}
                                                        size="small"
                                                        title="Delete"
                                                        className="px-1"
                                                    >
                                                        <i className="fa fa-trash text-danger"></i>
                                                    </IconButton>
                                                    {
                                                        (freeShipping?.is_active) ? <>
                                                            <IconButton
                                                                onClick={() => deActiveFreeShipping(freeShipping?._id)}
                                                                size="small"
                                                                title="DeActive"
                                                                className="px-1"
                                                            >
                                                                <i class="fa-solid fa-ban"></i>
                                                            </IconButton>
                                                        </> : <IconButton
                                                            onClick={() => activeFreeShipping(freeShipping?._id)}
                                                            size="small"
                                                            title="Active"
                                                            className="px-1"
                                                            sx={{ color: "green" }}
                                                        >
                                                            <i class="fa-solid fa-check"></i>
                                                        </IconButton>
                                                    }

                                                </StyledTableCell>
                                            </StyledTableRow>
                                        </>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 15, 20]}
                    component="div"
                    count={filterFreeShippings?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}
