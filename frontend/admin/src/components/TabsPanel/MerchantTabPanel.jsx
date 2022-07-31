import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { merchant_variation } from "constants/index";
import CaseDecision from "components/switch/CaseDecision";
import { useEffect, useState } from "react";
import { TryCatch } from "utils";
import { getMerchantCount, getWithdrawRequestMerchantCount } from "services/merchant/MerchantService";

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
                        <CaseDecision type={children} getAllMerchantCountManage={props?.getAllMerchantCountManage} />
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

export default function MerchantTabs() {
    const [value, setValue] = useState(0);
    const [deActiveMerchantsCount, setDeActiveMerchantsCount] = useState(0);
    const [activeMerchantsCount, setActiveMerchantsCount] = useState(0);
    const [requestWalletMerchantsCount, setRequestWalletMerchantsCount] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const getDeActiveMerchantsCount = () => {
        TryCatch(async () => {
            const cnt = await getMerchantCount('de_active');
            setDeActiveMerchantsCount(cnt?.data || 0);
        });
    }

    const getActiveMerchantsCount = () => {
        TryCatch(async () => {
            const cnt = await getMerchantCount('active');
            setActiveMerchantsCount(cnt?.data || 0);
        });
    }

    const getWithdrawRequestMerchantsCount = () => {
        TryCatch(async () => {
            const response = await getWithdrawRequestMerchantCount();
            setRequestWalletMerchantsCount(response?.data?.length);
        });
    }

    const getAllMerchantCountManage = async () => {
        await Promise.all([
            getDeActiveMerchantsCount(),
            getActiveMerchantsCount(),
            getWithdrawRequestMerchantsCount(),
        ])
    }
    useEffect(() => {
        getAllMerchantCountManage();
    }, [])


    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab sx={{ textTransform: 'capitalize' }} label={`Active (${activeMerchantsCount})`} {...a11yProps(0)} />
                    <Tab sx={{ textTransform: 'capitalize' }} label={`De Active (${deActiveMerchantsCount})`} {...a11yProps(1)} />
                    <Tab sx={{ textTransform: 'capitalize' }} label={`Withdraw Request (${requestWalletMerchantsCount})`} {...a11yProps(1)} />
                </Tabs>
            </Box>
            {
                merchant_variation?.map((type, index) => {
                    return (<TabPanel value={value} index={index} getAllMerchantCountManage={getAllMerchantCountManage}>
                        {type}
                    </TabPanel>)
                })
            }
        </Box>
    );
}