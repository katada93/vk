import {
	AppBar,
	Toolbar,
	Typography,
	makeStyles,
	Container,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import useVK from "../services/VK";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: "#fff",
	},
	appBar: {
		boxShadow: "none",
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
			<Container>
				<AppBar
					position="static"
					color="transparent"
					className={classes.appBar}
				>
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
			</Container>
		</div>
	);
};

export default Header;
