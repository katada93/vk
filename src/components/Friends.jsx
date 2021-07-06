import { useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { useStore } from "effector-react";

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
			width: "25%",
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

const Friends = (props) => {
	const classes = useStyles();
	const { friends } = props;

	return (
		<div className="friends">
			<ul className={classes.list}>
				{friends.map((item) => (
					<li key={item.id}>
						<Link to={`/user/${item.id}`} className={classes.link}>
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
		</div>
	);
};

export default Friends;
