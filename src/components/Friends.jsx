import { Link } from "react-router-dom";
import { makeStyles, Paper } from "@material-ui/core";

const Friends = (props) => {
	const { friends } = props;
	const classes = useStyles();

	return (
		<div className="friends">
			<Paper>
				<ul className={classes.list}>
					{friends.map((item) => (
						<li key={item.id}>
							<Link
								to={`/user/${item.id}`}
								className={classes.link}
							>
								<img
									style={{
										borderRadius: "50%",
									}}
									src={item.photo_50}
									alt="User img"
									mb={5}
								/>
								<span>{item.first_name}</span>
							</Link>
						</li>
					))}
				</ul>
			</Paper>
		</div>
	);
};

const useStyles = makeStyles({
	list: {
		height: 380,
		overflowY: "scroll",
		padding: 0,
		listStyle: "none",
		display: "flex",
		flexWrap: "wrap",
		"&::-webkit-scrollbar": {
			display: "none",
		},
		"& li": {
			width: "33%",
		},
	},
	link: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		margin: 5,
		textDecoration: "none",
		color: "#2a5885",
		"& span": {
			fontSize: "13px",
			"&:hover": {
				textDecoration: "underline",
			},
		},
	},
});

export default Friends;
