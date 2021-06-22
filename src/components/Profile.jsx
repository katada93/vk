import useVK from "../services/VK";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
	makeStyles,
	Grid,
	CardHeader,
	Avatar,
	IconButton,
} from "@material-ui/core";

import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import Friends from "./Friends";

const useStyles = makeStyles({
	wrap: {
		margin: "0 auto",
	},
	card: {
		marginBottom: 30,
	},
	count: {
		fontSize: 16,
		marginLeft: 5,
	},
});

const Profile = () => {
	const { call } = useVK();
	const { userId } = useParams();

	const classes = useStyles();
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchWall = async () => {
			const answer = await call("wall.get", {
				owner_id: userId,
			});

			setPosts(answer.response.items);
		};
		fetchWall();
	}, [userId, call]);

	// attachments[0].photo.photo_604

	return (
		<div>
			<Grid container>
				<Grid item xs={4}>
					<Friends />
				</Grid>
				<Grid item xs={8}>
					<Typography variant="h3" align="center">
						Profile
					</Typography>
					{posts.map((post) => (
						<Card key={post.id} className={classes.card}>
							<CardActionArea>
								<CardHeader
									avatar={
										<Avatar
											aria-label="recipe"
											className={classes.avatar}
										>
											R
										</Avatar>
									}
									title="Shrimp and Chorizo Paella"
									subheader="14.06.2021"
								/>
								<CardMedia
									component="img"
									alt="Contemplative Reptile"
									height="200"
									image={
										post.attachments?.[0].photo?.photo_807
									}
									title="Contemplative Reptile"
								/>
								<CardContent>
									<Typography
										variant="body2"
										color="textSecondary"
										component="p"
									>
										{post.text}
									</Typography>
								</CardContent>
							</CardActionArea>
							<CardActions>
								<IconButton aria-label="likes">
									<FavoriteIcon />
									<span className={classes.count}>
										{post.likes.count}
									</span>
								</IconButton>
								<IconButton aria-label="comments">
									<ChatBubbleOutlineIcon />
									<span className={classes.count}>
										{post.comments.count}
									</span>
								</IconButton>
								<IconButton aria-label="share">
									<ShareIcon />
									<span className={classes.count}>
										{post.reposts.count}
									</span>
								</IconButton>
							</CardActions>
						</Card>
					))}
				</Grid>
			</Grid>
		</div>
	);
};

export default Profile;
