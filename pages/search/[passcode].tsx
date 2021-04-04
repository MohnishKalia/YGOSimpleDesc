import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image'

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
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
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function Passcode() {
    const router = useRouter();
    const classes = useStyles();
    const { passcode } = router.query;
    const [value, setValue] = useState(0);

    const { data, error } = useSWR(`/api/search/${passcode}`, async (input: RequestInfo, init?: RequestInit) => {
        const res = await fetch(input, init);
        return res.json();
    });

    if (!data) return <span>loading</span>;
    if (error) return <span>error!</span>;

    return (
        <div className={classes.root}>
            <Typography variant="h4">The passcode is {passcode}</Typography>
            <AppBar position="static">
                <Tabs value={value} onChange={(_, newValue) => setValue(newValue)} aria-label="simple tabs example">
                    <Tab label="Item One" />
                    <Tab label="Item Two" />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                {data && <Image
                    src={data[0].card_images[0].image_url as string}
                    alt="Picture of the author"
                    width={500}
                    height={500}
                />}
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
        </div >
    );
}
