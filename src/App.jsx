import { useState } from "react";
import Login from "./Login";
import MainApp from "./MainApp";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return loggedIn
    ? <MainApp />
    : <Login setLoggedIn={setLoggedIn} />;
}

export default App;