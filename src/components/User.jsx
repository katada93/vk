import {
	Paper,
	Typography,
	Grid,
	ListItem,
	List,
	ListItemText,
	Divider,
} from "@material-ui/core";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";

const User = (props) => {
	const { user } = props;

	return (
		<Grid
			container
			justify="space-between"
			style={{ marginTop: 30, marginBottom: 30 }}
		>
			<Grid item xs={3}>
				<Paper style={{ padding: 10 }}>
					<img
						style={{
							display: "block",
							width: 200,
							height: 300,
							borderRadius: 5,
							margin: "0 auto",
						}}
						src={user.photo_400_orig}
						alt=""
					/>
				</Paper>
			</Grid>

			<Grid item xs={8}>
				<Paper style={{ padding: 20 }}>
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<Typography variant="h5">
							{user.first_name} {user.last_name}
						</Typography>
						<div
							style={{
								display: "flex",
								alignItems: "center",
							}}
						>
							<Typography color="textSecondary">
								{user.online ? "online" : null}
							</Typography>
							{user.online_mobile ? (
								<PhoneAndroidIcon fontSize="small" />
							) : null}
						</div>
					</div>
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
							color: "#2a5885",
							fontWeight: 700,
						}}
					>
						<li
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<span>{user?.counters?.friends}</span>
							<Typography variant="body2" color="textSecondary">
								друзей
							</Typography>
						</li>
						<li
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<span>{user?.counters?.followers}</span>
							<Typography variant="body2" color="textSecondary">
								подписчиков
							</Typography>
						</li>
						<li
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<span>{user?.counters?.photos}</span>
							<Typography variant="body2" color="textSecondary">
								фотографий
							</Typography>
						</li>
						<li
							style={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
								alignItems: "center",
							}}
						>
							<span>{user?.counters?.articles ?? 0}</span>
							<Typography variant="body2" color="textSecondary">
								статей
							</Typography>
						</li>
					</ul>
				</Paper>
			</Grid>
		</Grid>
	);
};

export default User;
