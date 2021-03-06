import { createStore, createEffect, combine, sample } from "effector";
import { useStore } from "effector-react";
import { Grid, CircularProgress } from "@material-ui/core";
import Friends from "./Friends";
import Wall from "./Wall";
import User from "./User";
import { useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { call } from "../store";
import { loadComments } from "./Comments/model";

const $userStore = createStore({
	loading: false,
	user: null,
});

const userLoad = createEffect(async (userId) => {
	const answer = await call({
		method: "users.get",
		params: {
			user_ids: userId,
			fields: "photo_400_orig,sex,bdate,home_town,common_count,site,counters,status,online",
		},
	});

	return answer.response[0];
});

$userStore.on(userLoad, (state) => ({ ...state, loading: true }));
$userStore.on(userLoad.doneData, (state, user) => ({
	...state,
	user,
	loading: false,
}));

const $friendsStore = createStore({
	loading: false,
	friends: [],
});

const friendsLoad = createEffect(async (userId) => {
	const answer = await call({
		method: "friends.get",
		params: {
			user_id: userId,
			fields: "city,domain,photo_50",
		},
	});

	return answer.response.items;
});

$friendsStore.on(friendsLoad, (state) => ({ ...state, loading: true }));
$friendsStore.on(friendsLoad.doneData, (state, friends) => ({
	...state,
	friends,
	loading: false,
}));

const $wallStore = createStore({
	loading: false,
	posts: [],
});

const wallLoad = createEffect(async (userId) => {
	const answer = await call({
		method: "wall.get",
		params: {
			owner_id: userId,
			filter: "owner",
		},
	});

	return answer.response.items;
});

$wallStore.on(wallLoad, (state) => ({ ...state, loading: true }));
$wallStore.on(wallLoad.doneData, (state, posts) => ({
	...state,
	posts: posts.map((post) => ({ ...post, comments: [] })),
	loading: false,
}));

const loadPostsComments = sample({
	clock: wallLoad.doneData,

	fn: (posts) =>
		posts.map((post) => ({ postId: post.id, userId: post.owner_id })),

	target: createEffect(async (pairs) => {
		return await Promise.all(pairs.map((pair) => loadComments(pair)));
	}),
});

$wallStore.on(loadPostsComments, (state) => ({ ...state, loading: true }));
$wallStore.on(loadPostsComments.doneData, (state, postsComments) => ({
	...state,
	loading: false,
	posts: state.posts.map((post) => {
		const comments = postsComments.find(({ postId }) => postId === post.id);

		if (comments && comments.length) {
			return {
				...post,
				comments,
			};
		}

		return post;
	}),
}));

export const $store = combine(
	$userStore,
	$friendsStore,
	$wallStore,
	(userStore, friendsStore, wallStore) => ({
		user: userStore.user,
		friends: friendsStore.friends,
		posts: wallStore.posts,
		loading: userStore.loading || friendsStore.loading || wallStore.loading,
	})
);

const Profile = () => {
	const { userId } = useParams();

	useEffect(() => window.scrollTo(0, 0), [userId]);
	const store = useStore($store);
	const { user, friends, posts, loading } = store;

	useEffect(() => {
		userLoad(userId);
		friendsLoad(userId);
		wallLoad(userId);
	}, [userId]);

	const userSegment = useMemo(() => {
		if (loading || !user) {
			return <CircularProgress />;
		}

		return <User user={user} />;
	}, [loading, user]);

	return (
		<Grid container justify="space-between">
			{userSegment}
			<Grid item xs={3}>
				<Friends friends={friends} />
			</Grid>
			<Grid item xs={8}>
				<Wall posts={posts} user={user} />
			</Grid>
		</Grid>
	);
};

export default Profile;
