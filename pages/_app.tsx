import React, { useMemo } from 'react';
import Head from 'next/head'

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Header from '../components/Header';
import { AppProps } from 'next/dist/next-server/lib/router/router';

function MyApp({ Component, pageProps }: AppProps) {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
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
				<Grid container spacing={3}>
					<Grid container item alignItems="center">
						<Grid item md={3}></Grid>
						<Grid item xs={12} md={6}>
							<Component {...pageProps} />
						</Grid>
						<Grid item md={3}></Grid>
					</Grid>
				</Grid>
			</Container>
		</ThemeProvider>
	);
}

export default MyApp;
