import { createStore, createEvent } from "effector";

export const setUser = createEvent("setUser");
export const setPosts = createEvent("setPosts");
export const setFriends = createEvent("setFriends");

export const $user = createStore(0).on(setUser, (state, user) => user);

export const $posts = createStore({ items: [] }).on(
	setPosts,
	(state, payload) => ({ ...state, items: payload })
);
export const $friends = createStore({ items: [] }).on(
	setFriends,
	(state, payload) => ({ ...state, items: payload })
);

$user.watch((n) => console.log(n));
