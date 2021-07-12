import { createEffect } from "effector";
import { call } from "./store";

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

export default loadComments;
