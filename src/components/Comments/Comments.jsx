import { useEffect } from "react";
import { useStore } from "effector-react";
import { makeStyles, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { $commentsStore, loadComments } from "./store";

const Comments = ({ userId, postId }) => {
	const classes = useStyles();
	const { comments, profiles } = useStore($commentsStore);
	const history = useHistory();

	useEffect(() => {
		loadComments({ userId, postId });
	}, [userId, postId]);

	return (
		<div className="comments">
			<ul>
				{comments.map((comment) => {
					const profile = profiles.find(
						(x) => x.id === comment.from_id
					);

					return (
						<li key={comment.id} className={classes.listItem}>
							<img
								className={classes.userLogo}
								src={profile?.photo_50}
								alt="Logo"
							/>
							<div>
								<span
									onClick={() =>
										history.push(`/user/${comment.from_id}`)
									}
									className={classes.userName}
								>
									{profile.first_name}
								</span>
								<Attachment comment={comment} />
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

function Attachment(props) {
	const { comment } = props;

	if (comment.text) {
		return (
			<Typography variant="body2" component="p">
				{comment.text}
			</Typography>
		);
	}

	if (comment.attachments[0]?.sticker?.photo_128) {
		return (
			<Typography variant="body2" component="p">
				<img src={comment.attachments[0].sticker.photo_128} alt="" />
			</Typography>
		);
	}

	return null;
}

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
			cursor: "pointer",
		},
	},
});

export default Comments;
