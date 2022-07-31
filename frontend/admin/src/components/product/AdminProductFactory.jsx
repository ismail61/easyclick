/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Box, TextField } from "@mui/material";
import { TryCatch } from "utils";
import { getAdminProducts } from "services/product/ProductService";
import { FilterByID } from "components/search/FilterBySearchValue";
import AdminProductRow from "./AdminProductRow";

export default function AdminProductFactory(props) {
    const [page, setPage] = useState(0);
    const [products, setProducts] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState("");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const getAllProducts = async () => {
        TryCatch(async () => {
            const response = await getAdminProducts(props.type);
            let temp = [];
            response?.data?.forEach(function (product) {
                product.variant_stock_price?.forEach((variant) => {
                    variant?.sizes?.map((nestedSize) => {
                        temp.push({
                            _id: product._id,
                            vendor: product?.vendor_id,
                            name: product.product_name,
                            created: product.createdAt,
                            updated: product.updatedAt,
                            color: variant.color_family,
                            image: variant.images[0].url,
                            size: nestedSize.size,
                            sku: nestedSize.seller_sku,
                            quantity: nestedSize.quantity,
                            price: nestedSize.pricing?.price,
                            special_price: nestedSize.pricing?.special_price,
                        });
                    });
                });
            });
            setProducts(temp);
        });
    };

    useEffect(() => {
        getAllProducts();;
    }, []);
    const filterProducts = FilterByID(products, searchValue);

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
                    label="Search By Product ID"
                    type="search"
                    variant="filled"
                />
            </Box>
            <Box sx={{ paddingY: 1 }}>
                <TableContainer component={Paper} sx={{ width: '100%' }}>
                    <Table stickyHeader aria-label="collapsible table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Product</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>SKU</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Stock</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filterProducts && filterProducts
                                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((product, index) => {
                                    return <AdminProductRow key={index} type={props.type} product={product} getAllProducts={getAllProducts} />
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={filterProducts?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </>
    );
}
