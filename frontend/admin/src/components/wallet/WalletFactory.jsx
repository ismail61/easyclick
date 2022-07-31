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
import { getMerchants, getWithdrawRequestMerchantCount } from "services/merchant/MerchantService";
import WalletRow from "./WalletRow";

export default function WalletFactory(props) {
    const [page, setPage] = useState(0);
    const [count, setCount] = useState(0);
    const [wallets, setWallets] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const getAllWallets = async () => {
        TryCatch(async () => {
            const response = await getWithdrawRequestMerchantCount();
            setWallets(response?.data);
        });
    };

    useEffect(() => {
        getAllWallets();;
    }, []);

    return (
        <>
            <Box sx={{ paddingY: 1 }}>
                <TableContainer component={Paper} sx={{ width: '100%' }}>
                    <Table stickyHeader aria-label="collapsible table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Customer ID</TableCell>
                                <TableCell>Customer Info</TableCell>
                                <TableCell>Total Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {wallets.length > 0 && wallets
                                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((wallet, index) => {
                                    return <WalletRow key={index} wallet={wallet} getAllWallets={getAllWallets} getAllMerchantCountManage={props?.getAllMerchantCountManage}  />
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
