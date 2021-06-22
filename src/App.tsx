import { Header, Login } from "./components";
import { Route, Switch } from "react-router-dom";
import { Container } from "@material-ui/core";
import Profile from "./components/Profile";

function App() {
	return (
		<div className="App" style={{ backgroundColor: "#edeef0" }}>
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
