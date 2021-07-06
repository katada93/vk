import { createEffect } from "effector";
import $session from "./session";
import promisify from "./promisify";
import VK from "./VK";

const sessionContinue = createEffect(async () => {
	const response = await promisify(VK.Auth.getLoginStatus, true)();
	return response.status === "connected" ? response.session.user : null;
});

$session.on(sessionContinue, (state) => ({ ...state, loading: true }));
$session.on(sessionContinue.doneData, (state, user) => ({
	...state,
	user,
	isAuthenticated: Boolean(user),
	loading: false,
}));

export default sessionContinue;
