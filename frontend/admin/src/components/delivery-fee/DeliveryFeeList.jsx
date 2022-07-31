/* eslint-disable jsx-a11y/img-redundant-alt */
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
import { IconButton } from "@mui/material";
import { SuccessToast, TryCatch } from "utils";
import { useNavigate } from "react-router-dom";
import { imageHover } from "components/hoverImage/HoverImage";
import { editADeliveryFee, getDeliverFees } from "services/deliver-fee/DeliveryFeeService";
import Swal from "sweetalert2";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        padding: 5
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        padding: 5
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

export default function DeliveryFeeList(props) {
    const [page, setPage] = useState(0);
    const [deliveryFees, setDeliveryFee] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const getAllDeliveryFee = async () => {
        TryCatch(async () => {
            const response = await getDeliverFees();
            setDeliveryFee(response?.data);
        });
    };
    const editDeliveryFee = async (id) => {
        const res = await Swal.fire({
            text: `Delivery Fee`,
            input: 'text',
            confirmButtonText: 'Submit',
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to input!'
                }
            },
        })
        if (res?.isConfirmed && res?.value) {
            await editADeliveryFee(id, { fee: res?.value });
            SuccessToast('Deliver Fee updated!');
            getAllDeliveryFee()
        }
    };

    useEffect(() => {
        getAllDeliveryFee();;
    }, []);

    return (
        <Paper sx={{ overflowX: "auto", marginTop: '10px' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>District/City</StyledTableCell>
                            <StyledTableCell>Delivery Fee</StyledTableCell>
                            <StyledTableCell>Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {deliveryFees && deliveryFees
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((deliveryFee, index) => {
                                return (
                                    <>
                                        <StyledTableRow
                                            key={index}
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >

                                            <StyledTableCell>
                                                {deliveryFee?.city}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                BDT {deliveryFee?.fee}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <IconButton
                                                    onClick={() => editDeliveryFee(deliveryFee._id)}
                                                    size="small"
                                                    title="Edit"
                                                    className="px-1"
                                                    sx={{ color: "green" }}
                                                >
                                                    <i class="fas fa-edit"></i>
                                                </IconButton>

                                            </StyledTableCell>
                                        </StyledTableRow>
                                    </>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={deliveryFees?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
