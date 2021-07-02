import useVK from "../services/VK";
import { Typography, Grid } from "@material-ui/core";
import Friends from "./Friends";
import Wall from "./Wall";
import User from "./User";
import { useParams } from "react-router-dom";

const Profile = () => {
	const { call, user } = useVK();
	const { userId } = useParams();

	return (
		<Grid container>
			<Grid item xs={12} style={{ marginBottom: 30 }}>
				<User userId={userId} />
			</Grid>
			<Grid item xs={4}>
				<Friends userId={userId} />
			</Grid>
			<Grid item xs={8}>
				<Wall userId={userId} />
			</Grid>
		</Grid>
	);
};

export default Profile;
