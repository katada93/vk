// import useVK from "../services/VK";
// import { useEffect } from "react";
// import {
// 	Card,
// 	CardActionArea,
// 	CardActions,
// 	CardContent,
// 	CardMedia,
// 	Typography,
// 	makeStyles,
// 	CardHeader,
// 	Avatar,
// 	Divider,
// 	IconButton,
// } from "@material-ui/core";

// import FavoriteIcon from "@material-ui/icons/Favorite";
// import ShareIcon from "@material-ui/icons/Share";
// import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
// import { useStore } from "effector-react";
// import { $posts, $user, setPosts } from "../store";
// import { useHistory } from "react-router-dom";

// const Wall = ({ userId }) => {
// 	let history = useHistory();
// 	const { call } = useVK();
// 	const { items } = useStore($posts);
// 	const user = useStore($user);

// 	const classes = useStyles();

// 	const onLike = async (userId, itemId) => {
// 		console.log(userId, itemId);
// 		const answer = await call("likes.add", {
// 			type: "post",
// 			owner_id: userId,
// 			item_id: itemId,
// 		});

// 		console.log(answer);
// 	};

// 	useEffect(() => {
// 		const fetchWall = async () => {
// 			const answer = await call("wall.get", {
// 				owner_id: userId,
// 				filter: "owner",
// 			});

// 			setPosts(answer.response.items);
// 		};
// 		fetchWall();
// 	}, [userId, call]);

// 	return (
// 		<div>
// 			{items &&
// 				items.map((post) => (
// 					<Card
// 						onClick={() =>
// 							history.push(`/post/${user.id}_${post.id}`)
// 						}
// 						key={post.id}
// 						className={classes.card}
// 					>
// 						<CardActionArea>
// 							<CardHeader
// 								avatar={
// 									<Avatar
// 										aria-label="recipe"
// 										className={classes.avatar}
// 									>
// 										{user.first_name[0]}
// 									</Avatar>
// 								}
// 								title={`${user.first_name} ${user.last_name}`}
// 								subheader="14.06.2021"
// 							/>
// 							<CardMedia
// 								component="img"
// 								alt="Contemplative Reptile"
// 								height="400"
// 								image={post.attachments?.[0].photo?.photo_807}
// 								title="Contemplative Reptile"
// 							/>
// 							<CardContent>
// 								<Typography
// 									variant="body2"
// 									color="textSecondary"
// 									component="p"
// 								>
// 									{post.text}
// 								</Typography>
// 							</CardContent>
// 						</CardActionArea>
// 						<Divider />
// 						<CardActions>
// 							<IconButton aria-label="likes">
// 								<FavoriteIcon />
// 								<span className={classes.count}>
// 									{post.likes.count}
// 								</span>
// 							</IconButton>
// 							<IconButton aria-label="comments">
// 								<ChatBubbleOutlineIcon />
// 								<span className={classes.count}>
// 									{post.comments.count}
// 								</span>
// 							</IconButton>
// 							<IconButton aria-label="share">
// 								<ShareIcon />
// 								<span className={classes.count}>
// 									{post.reposts.count}
// 								</span>
// 							</IconButton>
// 						</CardActions>
// 						<Divider />
// 					</Card>
// 				))}
// 		</div>
// 	);
// };

// const useStyles = makeStyles({
// 	wrap: {
// 		margin: "0 auto",
// 	},
// 	card: {
// 		marginBottom: 30,
// 	},
// 	count: {
// 		fontSize: 16,
// 		marginLeft: 5,
// 	},
// });

// export default Wall;
