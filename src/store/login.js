import { createEffect, attach } from "effector";
import $session from "./session";
import promisify from "./promisify";
import VK from "./VK";

const login = attach({
	source: $session,
	mapParams: (params, state) => state.isAuthenticated,

	effect: createEffect(async (isAuthenticated) => {
		if (!isAuthenticated) {
			const response = await promisify(VK.Auth.login)();

			return response.status === "connected"
				? response.session.user
				: null;
		}
	}),
});

$session.on(login, (state) => ({ ...state, loading: true }));
$session.on(login.doneData, (state, user) => ({
	...state,
	user,
	isAuthenticated: Boolean(user),
	loading: false,
}));

export default login;
