import { createStore } from "effector";

const $session = createStore({
	loading: false,
	isAuthenticated: false,
	user: null,
});

export default $session;
