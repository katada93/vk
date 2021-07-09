import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
	makeStyles,
	CardHeader,
	Avatar,
	Divider,
	IconButton,
} from "@material-ui/core";

import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { useHistory } from "react-router-dom";

const Wall = ({ posts, user }) => {
	const classes = useStyles();
	let history = useHistory();

	return (
		<div>
			{posts &&
				posts.map((post) => (
					<Card
						onClick={() =>
							history.push(`/post/${user.id}_${post.id}`)
						}
						key={post.id}
						className={classes.card}
					>
						<CardActionArea>
							<CardHeader
								avatar={
									<Avatar aria-label="recipe">
										<img
											src={user?.photo_400_orig}
											alt=""
										/>
									</Avatar>
								}
								title={`${user.first_name} ${user.last_name}`}
								subheader="14.06.2021"
							/>
							<CardMedia
								component="img"
								alt="Contemplative Reptile"
								height="400"
								image={post.attachments?.[0].photo?.photo_807}
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
						<Divider />
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
						<Divider />
					</Card>
				))}
		</div>
	);
};

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

export default Wall;
