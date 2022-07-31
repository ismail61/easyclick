import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { TryCatch } from "utils";
import { Box, TextField } from "@mui/material";
import { FilterByID } from "components/search/FilterBySearchValue";
import { getMerchants } from "services/merchant/MerchantService";
import MerchantRow from "./MerchantRow";

export default function MerchantFactory(props) {
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);
    const [merchants, setMerchants] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState("");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const getAllMerchants = async () => {
        TryCatch(async () => {
            const response = await getMerchants(props.type);
            setMerchants(response?.data);
            setCount(response?.data?.length);
        });
    };

    useEffect(() => {
        getAllMerchants();;
    }, []);
    const filterMerchants = FilterByID(merchants, searchValue)

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
                    label="Search By Merchant ID"
                    type="search"
                    variant="filled"
                />
            </Box>
            <Box sx={{ paddingY: 1 }}>
                <TableContainer component={Paper} sx={{ width: '100%' }}>
                    <Table stickyHeader aria-label="collapsible table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>ID</TableCell>
                                <TableCell>Created</TableCell>
                                <TableCell>Information</TableCell>
                                <TableCell>Orders</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filterMerchants.length > 0 && filterMerchants
                                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((merchant, index) => {
                                    return <MerchantRow key={index} merchant={merchant} getAllMerchants={getAllMerchants} getAllMerchantCountManage={props?.getAllMerchantCountManage} />
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination    
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </>
    );
}
