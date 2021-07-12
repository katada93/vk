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
import Comments from "./Comments/Comments";

const formater = new Intl.DateTimeFormat("ru-RU", {
	year: "numeric",
	month: "short",
	day: "numeric",
});

const format = (x) => {
	const date = new Date(x * 1000);
	const format = formater.format(date);
	return format;
};

const Wall = ({ posts, user }) => {
	const classes = useStyles();
	const history = useHistory();

	if (!posts || !posts.length) {
		return null;
	}

	return (
		<div>
			{posts.map((post) => (
				<Post key={post.id} post={post} />
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
