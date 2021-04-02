import React, { useMemo } from 'react';
import Head from 'next/head'

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

import Header from '../components/Header';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface Option {
    id: number;
    name: string;
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(2)
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    option: {
        fontSize: 15,
        '& > span': {
          marginRight: 10,
          fontSize: 18,
        },
    },
}));

const options = [{
	id: 10000,
	name: 'Ten Thousand Dragon'
}, {
	id: 27551,
	name: 'Limit Reverse'
}, {
	id: 32864,
	name: 'The 13th Grave'
}, {
	id: 35699,
	name: 'SPYRAL Sleeper'
}, {
	id: 39015,
	name: 'Assault Sentinel'
}, {
	id: 41546,
	name: 'D/D Savant Thomas'
}, {
	id: 41777,
	name: 'Gem-Enhancement'
}, {
	id: 50755,
	name: "Dark Magician's Circle"
}, {
	id: 56889,
	name: 'Cross-Dimensional Duel'
}, {
	id: 62121,
	name: 'Castle of Dark Illusions'
}, {
	id: 96540,
	name: 'Downbeat'
}, {
	id: 98905,
	name: 'Cipher Spectrum'
}] as Option[]

export default function Home() {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
	const classes = useStyles();

    const theme = useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );
	
	return (
		<ThemeProvider theme={theme}>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
			</Head>
			<CssBaseline />
			<Header/>
			<Container maxWidth="lg">
				<Grid container spacing={3} direction="column">
					<Grid container item alignItems="center">
						<Grid item md={3}>
						</Grid>
						<Grid item xs={12} md={6}>
							<Autocomplete
								id="card-select"
								options={options}
								classes={{
									option: classes.option,
								}}
								autoHighlight
								getOptionLabel={(option) => option.name}
								renderOption={(option) => (
									<span>{option.name}</span>
								)}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Enter card name..."
										variant="outlined"
										inputProps={{
											...params.inputProps,
											autoComplete: 'new-password', // disable autocomplete and autofill
										}}
									/>
								)}
							/>
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</ThemeProvider>
	)
}
