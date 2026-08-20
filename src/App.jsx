import { useState } from "react";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLogin() {
    setIsLoggedIn(true);
  }

  return isLoggedIn ? <MainPage /> : <LoginPage onLogin={handleLogin} />;
}

export default App;
