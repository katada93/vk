import {
	AppBar,
	Toolbar,
	Typography,
	makeStyles,
	Container,
} from "@material-ui/core";
import { useStore } from "effector-react";
import { Link } from "react-router-dom";
import { $session } from "../store";

const Header = () => {
	const classes = useStyles();
	const { user } = useStore($session);

	return (
		<div className={classes.root}>
			<Container maxWidth="md">
				<AppBar
					position="sticky"
					color="transparent"
					className={classes.appBar}
				>
					<Toolbar style={{ minHeight: 48 }}>
						<Link
							to={!user ? "/" : `/user/${user?.id}`}
							className={classes.title}
						>
							<img
								width="24"
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/VK.com-logo.svg/2048px-VK.com-logo.svg.png"
								alt="Logo"
							/>
							<Typography
								className={classes.logo}
								variant="body1"
								component="span"
							>
								Вконтакте
							</Typography>
						</Link>
						<Typography variant="body1" component="span">
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

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: "#fff",
	},
	appBar: {
		boxShadow: "none",
	},
	title: {
		textDecoration: "none",
		color: "inherit",
		display: "flex",
		alignItems: "center",
		marginRight: "auto",
	},
	link: {
		textDecoration: "none",
		color: "inherit",
	},
	logo: {
		marginLeft: 10,
		textTransform: "uppercase",
		fontWeight: 700,
	},
}));

export default Header;
