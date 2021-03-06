import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { useStore } from "effector-react";
import { $session, login, logout } from "../store";

const Login = () => {
	const classes = useStyles();
	const { loading, user, isAuthenticated } = useStore($session);

	console.log(user);

	if (isAuthenticated) {
		return (
			<Grid item md={4} style={{ margin: "0 auto" }}>
				<div className={classes.paper}>
					<Typography component="h1" variant="h5" gutterBottom>
						{user?.first_name} {user?.last_name}
					</Typography>
					<Button
						variant="contained"
						color="primary"
						onClick={logout}
					>
						Logout
					</Button>
				</div>
			</Grid>
		);
	}

	return (
		<Grid item md={4} style={{ margin: "0 auto" }}>
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Авторизвация
				</Typography>
				<form className={classes.form} noValidate>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={login}
					>
						log in
					</Button>
				</form>
			</div>
		</Grid>
	);
};

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default Login;
