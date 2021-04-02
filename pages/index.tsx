import { useMemo } from 'react';
import Head from 'next/head'

import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

export default function Home() {
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
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
				<CssBaseline />
			{/* <Header>
			</Header> */}
			<Container maxWidth="lg">
				{/* <Main user={user} /> */}
			</Container>
		</ThemeProvider>
	)
}
