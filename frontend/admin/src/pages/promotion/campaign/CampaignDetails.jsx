import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types";
import { Box, Tab, Tabs, Typography } from '@mui/material';
import CaseDecision from 'components/switch/CaseDecision';
import { campaign_details_variation } from 'constants/index';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorToast } from 'utils';
import { getSingleCampaign } from 'services/promotions/Promotion.Service';
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>
                        <CaseDecision type={children} campaign={props?.campaign} />
                    </Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const CampaignDetails = () => {
    const [value, setValue] = useState(0);
    const [campaign, setCampaign] = useState("");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const history = useNavigate();
    const { id } = useParams();
    const CampaignIdCheck = async () => {
        try {
            const res = await getSingleCampaign(id);
            setCampaign(res?.data);
        } catch (error) {
            ErrorToast("Campaign Not Found");
            //history("/campaign/list");
        }
    };

    useEffect(() => {
        CampaignIdCheck();
    }, []);
    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", margin: 1, marginTop: 5 }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab label="Vendors" {...a11yProps(0)} />
                    <Tab label="Products" {...a11yProps(1)} />
                </Tabs>
            </Box>
            {
                campaign_details_variation.map((type, index) => {
                    return (<TabPanel value={value} index={index} campaign={campaign}>
                        {type}
                    </TabPanel>)
                })
            }
        </Box>
    );
}

export default CampaignDetails