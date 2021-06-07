/* global VK */

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";

const VKContext = createContext();

export function useVK() {
	return useContext(VKContext);
}

export function VKProvider(props) {
	const { children } = props;

	const [authenticated, setAuthenticated] = useState(false);
	const [user, setUser] = useState(null);

	const login = useCallback(async () => {
		if (!authenticated) {
			VK.Auth.login((response) => {
				if (response.status === "connected") {
					setUser(response.session.user);
					setAuthenticated(true);
				}
			});
		}
	}, [authenticated]);

	const logout = useCallback(async () => {
		if (authenticated) {
			VK.Auth.logout((response) => {
				setAuthenticated(false);
				setUser(null);
			});
		}
	}, [authenticated]);

	useEffect(() => {
		VK.Auth.getLoginStatus((response) => {
			if (response.status === "connected") {
				setUser(response.session.user);
				setAuthenticated(true);
			}
		}, true);
	}, []);

	const call = useCallback((method, params = {}) => {
		return new Promise((resolve) => {
			VK.Api.call(method, { v: "5.54", ...params }, resolve);
		});
	}, []);

	return (
		<VKContext.Provider
			value={{ authenticated, login, logout, user, call }}
		>
			{children}
		</VKContext.Provider>
	);
}

export default useVK;
