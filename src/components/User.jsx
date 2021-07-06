import { useEffect, useState } from "react";
import {
	Paper,
	Typography,
	Grid,
	ListItem,
	List,
	ListItemText,
	Divider,
} from "@material-ui/core";
import useVK from "../services/VK";
import { useStore } from "effector-react";
import { $session } from "../store";
// import { $user, setUser } from "../store";
import { call } from "../store";

const User = (props) => {
	const { user } = props;

	return (
		<Grid container justify="space-around">
			<Grid item xs={3}>
				<Paper style={{ padding: 10 }}>
					<img
						style={{
							display: "block",
							width: "100%",
							height: 300,
							borderRadius: 5,
						}}
						src={user.photo_400_orig}
						alt=""
					/>
				</Paper>
			</Grid>

			<Grid item xs={8}>
				<Paper style={{ padding: 20 }}>
					<Typography variant="h5">
						{user.first_name} {user.last_name}
					</Typography>
					<Typography variant="body1" color="textSecondary">
						{user.status}
					</Typography>
					<List>
						<ListItem>
							<ListItemText secondary="День рождения:" />
							<ListItemText primary={user.bdate} />
						</ListItem>
						<Divider />
						<ListItem>
							<ListItemText secondary="Город:" />
							<ListItemText primary={user.home_town} />
						</ListItem>
						<Divider />
						<ListItem>
							<ListItemText secondary="Сайт:" />
							<a
								target="_blank"
								rel="noreferrer"
								href={user.site}
							>
								{user.site}
							</a>
						</ListItem>
					</List>
					<Divider />
					<ul
						style={{
							display: "flex",
							listStyle: "none",
							justifyContent: "space-around",
						}}
					>
						<li>{user?.counters?.friends} друзей</li>
						<li>{user?.counters?.followers} подписчиков</li>
						<li>{user?.counters?.photos} фотографий</li>
						<li>{user?.counters?.articles} статей</li>
					</ul>
				</Paper>
			</Grid>
		</Grid>
	);
};

export default User;
