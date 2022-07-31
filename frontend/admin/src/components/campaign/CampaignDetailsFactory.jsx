import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import { FilterByProperty } from 'components/search/FilterBySearchOtherValue';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TryCatch } from 'utils';

const CampaignDetailsFactory = ({ type, campaign }) => {
    const [searchVendorValue, setSearchVendorValue] = useState("");
    const [searchProductValue, setSearchProductValue] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const activeCampaign = async (id) => {
        TryCatch(async () => {
            
        });
    };
    const deActiveCampaign = async (id) => {
        TryCatch(async () => {
            
        });
    };
    const filterVendors = FilterByProperty(campaign?.vendors, searchVendorValue, 'campaign_name');
    switch (type) {
        case 'vendors':
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
                            value={searchVendorValue}
                            onChange={(e) => setSearchVendorValue(e.target.value)}
                            id="filled-search"
                            label="Search By Shop Name or ID"
                            type="search"
                            variant="filled"
                        />
                    </Box>
                    <Paper sx={{ overflowX: "auto" }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Shop Name</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filterVendors?.length > 0 && filterVendors
                                        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((campaign, index) => {
                                            return (
                                                <>
                                                    <TableRow
                                                        key={index}
                                                        hover
                                                        role="checkbox"
                                                        tabIndex={-1}
                                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row">
                                                            {campaign.name}
                                                        </TableCell>
                                                        <TableCell component="th" scope="row">
                                                            {campaign.title}
                                                        </TableCell>
                                                        <TableCell>
                                                            {campaign.campaign_start_time?.slice(0, 10)}
                                                            <br /> -<br></br>
                                                            {campaign.campaign_end_time?.slice(0, 10)}
                                                        </TableCell>
                                                        <TableCell>
                                                            {campaign.registration_end_time?.slice(0, 10)}
                                                        </TableCell>
                                                        <TableCell>
                                                            <small>
                                                                <div dangerouslySetInnerHTML={{ __html: campaign.description }} />
                                                            </small>
                                                        </TableCell>
                                                        <TableCell>
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
                                                        </TableCell>
                                                        <TableCell component="th" scope="row">
                                                            <Button variant="outlined" size="small" color="secondary">
                                                                <Link to={{
                                                                    pathname: `/campaign/${campaign?._id}`
                                                                }}>More</Link>
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                </>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 20, 30]}
                            component="div"
                            count={filterVendors?.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </>
            )
        case 'products':
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
                            value={searchProductValue}
                            onChange={(e) => setSearchProductValue(e.target.value)}
                            id="filled-search"
                            label="Search By Product Name or ID"
                            type="search"
                            variant="filled"
                        />
                    </Box>
                </>
            )
        default:
            return (
                null
            )
    }
}

export default CampaignDetailsFactory