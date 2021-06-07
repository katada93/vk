import {
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	makeStyles,
	TextField,
	Typography,
} from "@material-ui/core";

import useVK from "../services/VK";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

const Login = () => {
	const classes = useStyles();
	const { user, login, authenticated, logout } = useVK();

	if (authenticated) {
		return (
			<span>
				{user.first_name} {user.last_name}{" "}
				<button onClick={logout}>Logout</button>
			</span>
		);
	}

	return (
		<Grid item md={4} style={{ margin: "0 auto" }}>
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Login
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={login}
					>
						Sign In
					</Button>
				</form>
			</div>
		</Grid>
	);
};

export default Login;
