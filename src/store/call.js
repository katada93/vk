import { createEffect } from "effector";
import promisify from "./promisify";
import VK from "./VK";

const call = createEffect(async ({ method, params }) => {
	return await promisify(VK.Api.call)(method, { v: "5.54", ...params });
});

export default call;
