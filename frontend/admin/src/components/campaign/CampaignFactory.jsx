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
import { Box, Button, IconButton, TextField } from "@mui/material";
import { SuccessToast, TryCatch } from "utils";
import { Link, useNavigate } from "react-router-dom";
import { ActiveCampaign, DeActiveCampaign, getCampaigns } from "services/promotions/Promotion.Service";
import { FilterByProperty } from "components/search/FilterBySearchOtherValue";

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

export default function CampaignFactory({ type }) {
    const [campaigns, setCampaigns] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState("");
    const history = useNavigate();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const editCampaign = async (id) => {
        history(`/edit-campaign/${id}`)
    };

    const activeCampaign = async (id) => {
        TryCatch(async () => {
            await ActiveCampaign(id);
            SuccessToast('Campaign Activated');
            getAllCampaigns();
        });
    };
    const deActiveCampaign = async (id) => {
        TryCatch(async () => {
            await DeActiveCampaign(id);
            SuccessToast('Campaign De Activated');
            getAllCampaigns();
        });
    };
    const getAllCampaigns = () => {
        TryCatch(async () => {
            if (type === 'all') {
                const res = await getCampaigns('promotions/campaigns');
                setCampaigns(res?.data)
            } else if (type === 'active') {
                const res = await getCampaigns('promotions/active-campaigns');
                setCampaigns(res?.data)
            } else if (type === 'deactive') {
                const res = await getCampaigns('promotions/deactive-campaigns');
                setCampaigns(res?.data)
            } else {
                setCampaigns([])
            }
        });
    }
    useEffect(() => {
        getAllCampaigns();
    }, [type])


    const filterCampaigns = FilterByProperty(campaigns, searchValue, 'campaign_name');
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
                    label="Search By Campaign Name"
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
                                <StyledTableCell>Title</StyledTableCell>
                                <StyledTableCell>Period</StyledTableCell>
                                <StyledTableCell>Registration Ends</StyledTableCell>
                                <StyledTableCell>Description</StyledTableCell>
                                <StyledTableCell>Actions</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filterCampaigns.length > 0 && filterCampaigns
                                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((campaign, index) => {
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
                                                    {campaign.name}
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row">
                                                    {campaign.title}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {campaign.campaign_start_time?.slice(0, 10)}
                                                    <br /> -<br></br>
                                                    {campaign.campaign_end_time?.slice(0, 10)}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {campaign.registration_end_time?.slice(0, 10)}
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <small>
                                                        <div dangerouslySetInnerHTML={{ __html: campaign.description }} />
                                                    </small>
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    <IconButton
                                                        onClick={() => editCampaign(campaign?._id)}
                                                        size="small"
                                                        title="Edit"
                                                        className="px-1"
                                                        sx={{ color: "green" }}
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </IconButton>
                                                    {
                                                        (campaign?.is_active) ? <>
                                                            <IconButton
                                                                onClick={() => deActiveCampaign(campaign._id)}
                                                                size="small"
                                                                title="DeActive"
                                                                className="px-1"
                                                            >
                                                                <i className="fa-solid fa-ban"></i>
                                                            </IconButton>
                                                        </> : <IconButton
                                                            onClick={() => activeCampaign(campaign._id)}
                                                            size="small"
                                                            title="Active"
                                                            className="px-1"
                                                            sx={{ color: "green" }}
                                                        >
                                                            <i className="fa-solid fa-check"></i>
                                                        </IconButton>
                                                    }
                                                </StyledTableCell>
                                                <StyledTableCell component="th" scope="row">
                                                    <Button variant="outlined" size="small" color="secondary">
                                                        <Link to={{
                                                            pathname: `/campaign/${campaign?._id}`
                                                        }}>More</Link>
                                                    </Button>
                                                </StyledTableCell>
                                            </StyledTableRow>
                                        </>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 20, 30]}
                    component="div"
                    count={filterCampaigns?.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </>

    );
}
