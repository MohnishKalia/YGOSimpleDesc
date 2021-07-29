import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Alert from '@material-ui/lab/Alert';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import type { SearchResponse } from '../api/search/[passcode]';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
    className?: string;
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
    center: {
        textAlign: 'center',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    button: {
        marginBottom: theme.spacing(1),
    },
    imgCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

const fetcher = async (url: string) => {
    const res = await fetch(url);
    const json = await res.json();
    if (!res.ok)
        throw new Error(json.error);
    return json;
}

export default function Passcode() {
    const router = useRouter();
    const classes = useStyles();
    const { passcode } = router.query;
    const [value, setValue] = useState(0);

    const { data, error } = useSWR<SearchResponse, Error>(`/api/search/${passcode}`, fetcher);

    if (error) return <Alert severity="error">{error.message}</Alert>;
    if (!data) return <LinearProgress />;

    return (
        <>
            <Link href="/">
                <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<ArrowBack />}
                >
                    Go Back
                </Button>
            </Link>
            <Paper elevation={0}>
                <AppBar position="static">
                    <Typography variant="button" className={classes.center}>{data.name}</Typography>
                    <Tabs
                        value={value}
                        onChange={(_, newValue) => setValue(newValue)}
                        aria-label="description selection"
                        variant="fullWidth"
                        centered
                    >
                        <Tab label="Simplified" />
                        <Tab label="Actual" />
                        <Tab label="Card Image" />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    {data.sdesc
                        ? <Typography variant="body2">{data.sdesc}</Typography>
                        : <Alert severity="info">There currently is no simplified description for this card.</Alert>
                    }
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Typography variant="body2">{data.desc}</Typography>
                </TabPanel>
                <TabPanel value={value} index={2} className={classes.imgCenter}>
                    <Image
                        src={data.url}
                        alt="card image"
                        width={420}
                        height={615}
                    />
                </TabPanel>
            </Paper>
        </>
    );
}
