import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import ViewCarousel from '@material-ui/icons/ViewCarousel';

import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(2),
        alignItems: 'center'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Header() {
    const classes = useStyles();
    return (
        <AppBar className={classes.root} position="static">
            <Toolbar>
                <Link href="/">
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <ViewCarousel />
                    </IconButton>
                </Link>
                <Typography variant="h6" className={classes.title}>
                    YGO Simple Descriptions
                </Typography>
            </Toolbar>
        </AppBar>
    );
}