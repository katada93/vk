import { createEffect, attach } from "effector";
import $session from "./session";
import promisify from "./promisify";
import VK from "./VK";

const logout = attach({
	source: $session,
	mapParams: (params, state) => state.isAuthenticated,

	effect: createEffect(async (isAuthenticated) => {
		if (isAuthenticated) {
			await promisify(VK.Auth.logout)();
		}
	}),
});

$session.on(logout, (state) => ({ ...state, loading: true }));
$session.on(logout.doneData, (state, user) => ({
	...state,
	user: null,
	isAuthenticated: false,
	loading: false,
}));

export default logout;
