import { createStore } from "effector";

const $commentsStore = createStore({
	loading: false,
    comment: '',
	comments: [],
	profiles: [],
});

export default $commentsStore