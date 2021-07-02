import {
	AppBar,
	Toolbar,
	Typography,
	makeStyles,
	Container,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import useVK from "../services/VK";
import FacebookIcon from "@material-ui/icons/Facebook";

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
		textDecoration: "none",
		color: "inherit",
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
						<Link
							to={!user ? "/" : `/user/${user?.id}`}
							className={classes.title}
						>
							<Typography variant="h4" component="span">
								Home
							</Typography>
						</Link>
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
