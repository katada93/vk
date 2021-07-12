import { createEffect } from "effector";
import { call } from "../../../store";
import $commentsStore from "./$commentsStore";

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

export default loadComments;
