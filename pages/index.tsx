import React, { useMemo, useState } from 'react';
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
import { GetStaticProps } from 'next';
import { PrismaClient } from '@prisma/client';

interface SQLOption {
	id: number;
	name: string;
	type: number;
}

interface Option {
	id: number;
	name: string;
	type: string;
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

export default function Home({ options }: { options: Option[] }) {
	const [id, setId] = useState(0);

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
				<title>Simple Descriptions</title>
				<link rel="icon" href="/favicon.ico" />
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
			</Head>
			<CssBaseline />
			<Header />
			<Container maxWidth="lg">
				<Grid container spacing={3} direction="column">
					<Grid container item alignItems="center">
						<Grid item md={3}></Grid>
						<Grid item xs={12} md={6}>
							<Autocomplete
								id="card-select"
								options={options}
								classes={{
									option: classes.option,
								}}
								groupBy={(option) => option.type}
								autoHighlight
								onChange={(_, newValue: Option | null) => {
									if (newValue)
										setId(newValue.id);
								}}
								getOptionLabel={(option) => option.name}
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
						<Grid item md={3}></Grid>

						<Grid item md={3}></Grid>
						<Grid container item xs={12} md={6}>
							<Typography variant="h3">{(id).toString().padStart(8, '0')}</Typography>
						</Grid>
						<Grid item md={3}></Grid>
					</Grid>
				</Grid>
			</Container>
		</ThemeProvider>
	)
}

// https://db.ygoprodeck.com/api/v7/cardinfo.php?id=03298689

export const getStaticProps: GetStaticProps = async (context) => {
	const prisma = new PrismaClient();
	const results: SQLOption[] = await prisma.$queryRaw`
		SELECT d.id, t.name, d.type from texts t
		inner join datas d
			on t.id = d.id
		`;
	const options: Option[] = results.map((option) => {
		let type = '';
		if ((option.type & 1) === 1) type = 'Monster';
		if ((option.type & 2) === 2) type = 'Spell';
		if ((option.type & 4) === 4) type = 'Trap';
		if ((option.type & 8) === 8) type = 'N/A';

		return {...option, type};
	}).sort((a, b) => -b.type.localeCompare(a.type));
	return {
		props: { options }
	}
}
