import { useEffect } from "react";
import { Link } from "react-router-dom";
import useVK from "../services/VK";
import { Typography, makeStyles } from "@material-ui/core";
import { $friends, setFriends } from "../store";
import { useStore } from "effector-react";

const Friends = ({ userId }) => {
	const { call } = useVK();
	const classes = useStyles();
	const { items } = useStore($friends);

	useEffect(() => {
		const fetchFriends = async () => {
			const answer = await call("friends.get", {
				user_id: userId,
				fields: "city,domain,photo_50",
			});

			setFriends(answer.response.items);
		};
		fetchFriends();
	}, [call, userId]);
	return (
		<div className="friends">
			<ul className={classes.list}>
				{items.map((item) => (
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

const useStyles = makeStyles({
	list: {
		padding: 0,
		listStyle: "none",
		display: "flex",
		flexWrap: "wrap",
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

export default Friends;
