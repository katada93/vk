import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
	Grid,
	Paper,
	Typography,
	IconButton,
	Avatar,
	Divider,
	CircularProgress,
} from "@material-ui/core";
import { useStore } from "effector-react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { $store } from "./Profile";
import { createEffect, createStore } from "effector";
import { call } from "../store";
import Comments from "./Comments";

const $postStore = createStore({
	loading: false,
	post: null,
});

const postLoad = createEffect(async (userId) => {
	const answer = await call({
		method: "wall.getById",
		params: {
			posts: userId,
		},
	});

	return answer.response[0];
});

$postStore.on(postLoad, (state) => ({ ...state, loading: true }));
$postStore.on(postLoad.doneData, (state, post) => ({
	...state,
	post,
	loading: false,
}));

const Post = () => {
	const { postId } = useParams();
	const { user } = useStore($store);
	const { post, loading } = useStore($postStore);

	useEffect(() => {
		postLoad(postId);
	}, [postId]);

	if (loading) {
		return <CircularProgress />;
	}

	return (
		<Grid container justify="center" style={{ marginTop: 20 }}>
			<Grid item xs={8}>
				{post && (
					<Paper style={{ padding: 10 }}>
						<div style={{ display: "flex", marginBottom: 20 }}>
							<Avatar
								alt="Remy Sharp"
								src={user.photo_400_orig}
							/>
							<span style={{ marginLeft: 20 }}>
								{user.first_name} {user.last_name}
							</span>
						</div>
						<img
							src={post.attachments?.[0].photo?.photo_807}
							alt="qwerty"
						/>
						<Typography>{post.text}</Typography>
						<Divider />
						<div>
							<IconButton aria-label="likes">
								<FavoriteIcon />
								<span>{post.likes.count}</span>
							</IconButton>
							<IconButton aria-label="comments">
								<ChatBubbleOutlineIcon />
								<span>{post.comments.count}</span>
							</IconButton>
							<IconButton aria-label="share">
								<ShareIcon />
								<span>{post.reposts.count}</span>
							</IconButton>
						</div>
						<Divider />
						<Comments userId={user.id} postId={post.id} />
					</Paper>
				)}
			</Grid>
		</Grid>
	);
};

export default Post;
