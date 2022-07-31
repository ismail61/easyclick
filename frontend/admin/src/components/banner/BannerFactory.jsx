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
import { dynamicBannerFeaturesHandler, getBanners } from "services/banner/BannerService";
import { imageHover } from "components/hoverImage/HoverImage";

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

export default function BannerFactory(props) {
    const [page, setPage] = useState(0);
    const [banners, setBanners] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const history = useNavigate();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const getAllBanner = async () => {
        TryCatch(async () => {
            const response = await getBanners(props.type);
            setBanners(response?.data);
        });
    };
    const editBanner = async (id) => {
        history(`/edit-banner/${id}`)
    };
    const activeShowHomePage = async (type, id) => {
        TryCatch(async () => {
            await dynamicBannerFeaturesHandler(type, id);
            SuccessToast('Updated Successful');
            getAllBanner();
        });
    };
    const deActiveShowHomePage = async (type, id) => {
        TryCatch(async () => {
            await dynamicBannerFeaturesHandler(type, id);
            SuccessToast('Updated Successful');
            getAllBanner();
        });
    };

    useEffect(() => {
        getAllBanner();;
    }, []);

    return (
        <Paper sx={{ overflowX: "auto" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Image</StyledTableCell>
                            <StyledTableCell>Redirect Url</StyledTableCell>
                            {props?.type !== 'home_banner' ? <StyledTableCell>Home Page</StyledTableCell> : null}
                            <StyledTableCell>Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {banners && banners
                            ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((banner, index) => {
                                return (
                                    <>
                                        <StyledTableRow
                                            key={index}
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <StyledTableCell onClick={() => imageHover(banner?.image?.url)} sx={{ cursor: 'pointer' }}>
                                                <img
                                                    height="100px"
                                                    width="80px"
                                                    className="img-fluid ml-5 m-2"
                                                    src={banner?.image?.url}
                                                    alt="Banner Image"
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {banner?.redirect_url}
                                            </StyledTableCell>
                                            {
                                                props?.type !== 'home_banner' ?
                                                    <StyledTableCell>
                                                        {
                                                            (banner.show_on_home_page) ? <i title="True" style={{ color: 'green' }} class="fa fa-check"></i> : <i class="fa fa-times" style={{ color: 'red' }} title="False"></i>
                                                        }
                                                    </StyledTableCell> : null
                                            }
                                            <StyledTableCell>
                                                <IconButton
                                                    onClick={() => editBanner(banner._id)}
                                                    size="small"
                                                    title="Edit"
                                                    className="px-1"
                                                    sx={{ color: "green" }}
                                                >
                                                    <i class="fas fa-edit"></i>
                                                </IconButton>
                                                {
                                                    (!banner.show_on_home_page) ? <>
                                                        <IconButton
                                                            onClick={() => activeShowHomePage('active_home_page', banner._id)}
                                                            size="small"
                                                            className="px-1"
                                                            title="Active Show on Home Page"
                                                            sx={{ color: "red" }}
                                                        >
                                                            <i class="fa fa-check-circle text-success"></i>
                                                        </IconButton>
                                                    </> : null
                                                }
                                                {
                                                    (banner.show_on_home_page) ? <>
                                                        <IconButton
                                                            onClick={() => deActiveShowHomePage('de_active_home_page', banner._id)}
                                                            size="small"
                                                            className="px-1"
                                                            title="De Active Show on Home Page"
                                                            sx={{ color: "red" }}
                                                        >
                                                            <i class="fa fa-times-circle"></i>
                                                        </IconButton>
                                                    </> : null
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
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={banners?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
