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
import { dynamicCategoryFeaturesHandler } from "services/category/CategoryService";
import { deleteBrand, editBrand, getBrands } from "services/brand/BrandService";
import Swal from "sweetalert2";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        padding: 8
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        padding: 8
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

export default function BrandFactory() {
    const [page, setPage] = useState(0);
    const [brands, setBrands] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const getAllBrand = async () => {
        TryCatch(async () => {
            const response = await getBrands();
            setBrands(response?.data);
        });
    };
    const editBrandHandle = async (id, name) => {
        const res = await Swal.fire({
            title: 'Enter The Brand Name',
            input: 'text',
            inputValue: name,
            showCancelButton: true,
            confirmButtonText: 'Update',
            showLoaderOnConfirm: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!'
                } else if (value === name) {
                    return "The same name can not be updated.!"
                }
            }
        });
        if (res?.isConfirmed) {
            TryCatch(async () => {
                await editBrand(id, { name: res?.value });
                await Swal.fire(
                    'Updated!',
                    'success'
                )
                getAllBrand()
            });
        }

    };
    const deleteBrandHandle = async (id) => {
        const res = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });
        if (res.isConfirmed) {
            TryCatch(async () => {
                await deleteBrand(id);
                await Swal.fire(
                    'Deleted!',
                    'Your Brand has been deleted.',
                    'success'
                )
                getAllBrand()
            });
        }
    };

    useEffect(() => {
        getAllBrand();;
    }, []);

    return (
        <Paper sx={{ overflowX: "auto" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {brands && brands
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((brand, index) => {
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
                                                {brand.name}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <IconButton
                                                    onClick={() => editBrandHandle(brand._id, brand?.name)}
                                                    size="small"
                                                    title="Edit"
                                                    className="px-1"
                                                    sx={{ color: "green" }}
                                                >
                                                    <i class="fas fa-edit"></i>
                                                </IconButton>
                                                <IconButton
                                                    onClick={() => deleteBrandHandle(brand._id)}
                                                    size="small"
                                                    className="px-1"
                                                    title="Delete"
                                                    sx={{ color: "red" }}
                                                >
                                                    <i class="fa fa-trash-alt text-danger"></i>
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
                count={brands?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
