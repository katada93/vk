import { Header, Login } from "./components";
import { Route } from "react-router-dom";
import { Container } from "@material-ui/core";

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <Route path="/login">
          <Login />
        </Route>
      </Container>
    </div>
  );
}

export default App;
