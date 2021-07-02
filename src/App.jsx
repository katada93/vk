import { Header, Login, Profile } from "./components";
import { Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";

function App() {
	return (
		<div
			className="App"
			style={{ backgroundColor: "#edeef0", minHeight: "100vh" }}
		>
			<Header />
			<Container>
				<Switch>
					<Route exact path="/login">
						<Login />
					</Route>

					<Route exact path="/user/:userId">
						<Profile />
					</Route>
				</Switch>
			</Container>
		</div>
	);
}

export default App;