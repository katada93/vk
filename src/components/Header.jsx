import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
import useVK from "../services/VK";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	title: {
		flexGrow: 1,
	},
	link: {
		textDecoration: "none",
		color: "inherit",
	},
}));

const Header = () => {
	const classes = useStyles();
	const { user } = useVK();

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography
						variant="h4"
						component="span"
						className={classes.title}
					>
						<Link to="/" className={classes.link}>
							Home
						</Link>
					</Typography>
					<Typography variant="h5" component="span">
						<Link to="/login" className={classes.link}>
							{user?.first_name || "Login"}
						</Link>
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Header;
