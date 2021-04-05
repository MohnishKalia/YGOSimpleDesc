import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Autocomplete from '@material-ui/lab/Autocomplete';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';

import prisma from '../lib/prisma';

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
	const router = useRouter();
	const classes = useStyles();

	return (
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
					router.push(`/search/${newValue.id}`);
			}}
			getOptionLabel={(option) => option.name}
			renderInput={(params) => (
				<TextField
					{...params}
					label="Enter card name..."
					variant="outlined"
					inputProps={{
						...params.inputProps,
						autoComplete: 'off', // disable autocomplete and autofill
					}}
				/>
			)}
		/>
	)
}

export const getStaticProps: GetStaticProps = async (context) => {
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

		return { ...option, type };
	}).sort((a, b) => -b.type.localeCompare(a.type));
	return {
		props: { options }
	}
}
