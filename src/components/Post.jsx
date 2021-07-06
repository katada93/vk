// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import useVK from "../services/VK";
// import {
// 	Grid,
// 	Paper,
// 	Typography,
// 	IconButton,
// 	Avatar,
// 	Divider,
// } from "@material-ui/core";
// import { useStore } from "effector-react";
// import { $user } from "../store";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import ShareIcon from "@material-ui/icons/Share";
// import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

// const Post = () => {
// 	const { postId } = useParams();
// 	const { call } = useVK();
// 	const [post, setPost] = useState(null);
// 	const user = useStore($user);

// 	console.log(post);

// 	useEffect(() => {
// 		const fetchWall = async () => {
// 			const answer = await call("wall.getById", {
// 				posts: postId,
// 			});
// 			setPost(answer.response[0]);
// 		};

// 		fetchWall();
// 	}, [call, postId, user.id]);

// 	return (
// 		<Grid container justify="center" style={{ marginTop: 20 }}>
// 			<Grid item xs={8}>
// 				{post && (
// 					<Paper style={{ padding: 10 }}>
// 						<div style={{ display: "flex", marginBottom: 20 }}>
// 							<Avatar
// 								alt="Remy Sharp"
// 								src={user.photo_400_orig}
// 							/>
// 							<span style={{ marginLeft: 20 }}>
// 								{user.first_name} {user.last_name}
// 							</span>
// 						</div>
// 						<img
// 							src={post.attachments?.[0].photo?.photo_807}
// 							alt="qwerty"
// 						/>
// 						<Typography>{post.text}</Typography>
// 						<Divider />
// 						<div>
// 							<IconButton aria-label="likes">
// 								<FavoriteIcon />
// 								<span>{post.likes.count}</span>
// 							</IconButton>
// 							<IconButton aria-label="comments">
// 								<ChatBubbleOutlineIcon />
// 								<span>{post.comments.count}</span>
// 							</IconButton>
// 							<IconButton aria-label="share">
// 								<ShareIcon />
// 								<span>{post.reposts.count}</span>
// 							</IconButton>
// 						</div>
// 					</Paper>
// 				)}
// 			</Grid>
// 		</Grid>
// 	);
// };

// export default Post;
