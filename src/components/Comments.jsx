import { useEffect } from "react";
import { createEffect, createStore } from "effector";
import { call } from "../store";
import { useStore } from "effector-react";
import { $store } from "./Profile";
import { makeStyles, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

const $commentsStore = createStore({
	loading: false,
	comments: [],
	profiles: [],
});

const loadComments = createEffect(async ({ userId, postId }) => {
	const answer = await call({
		method: "wall.getComments",
		params: {
			owner_id: userId,
			post_id: postId,
			need_likes: 1,
			count: 100,
			extended: 1,
		},
	});

	return answer.response;
});

$commentsStore.on(loadComments, (state) => ({ ...state, loading: true }));
$commentsStore.on(loadComments.doneData, (state, { items, profiles }) => ({
	...state,
	comments: items,
	profiles: profiles,
	loading: false,
}));

const Comments = ({ userId, postId }) => {
	const { comments, profiles } = useStore($commentsStore);
	const { user } = useStore($store);
	const classes = useStyles();

	console.log(profiles);

	useEffect(() => {
		loadComments({ userId, postId });
	}, [userId, postId]);

	return (
		<div className="comments">
			<ul>
				{comments.map((comment) => (
					<li key={comment.id} className={classes.listItem}>
						<img
							className={classes.userLogo}
							src={
								profiles.find((x) => x.id === comment.from_id)
									?.photo_50
							}
							alt="Logo"
						/>
						<div>
							<Link to="/" className={classes.userName}>
								{
									profiles.find(
										(x) => x.id === comment.from_id
									)?.first_name
								}
							</Link>
							<Typography variant="body2" component="p">
								{comment.text || (
									<img
										src={
											comment.attachments[0]?.sticker
												?.photo_128
										}
										alt=""
									/>
								)}
							</Typography>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

const useStyles = makeStyles({
	listItem: {
		padding: 10,
		marginBottom: 10,
		display: "flex",
	},
	userLogo: {
		width: 50,
		height: 50,
		borderRadius: "50%",
		marginRight: 10,
	},
	userName: {
		display: "block",
		textDecoration: "none",
		color: "#2a5885",
		fontSize: 13,
		fontWeight: 500,
		marginBottom: 5,
		"&:hover": {
			textDecoration: "underline",
		},
	},
});

export default Comments;
