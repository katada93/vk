import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useVK from "../services/VK";
import { Typography } from "@material-ui/core";
import useStyles from "./Friends";

const Friends = () => {
	const { call } = useVK();
	const { userId } = useParams();
	const classes = useStyles();

	const [items, setItems] = useState([]);

	console.log(items);

	useEffect(() => {
		const fetchFriends = async () => {
			const answer = await call("friends.get", {
				user_id: userId,
				fields: "city,domain,photo_50",
			});

			console.log(answer.response.items);

			setItems(answer.response.items);
		};
		fetchFriends();
	}, [call, userId]);
	return (
		<div className="friends">
			<Typography variant="h4" align="center">
				Friends
			</Typography>
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

export default Friends;
