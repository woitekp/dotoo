import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import useAuth from "./context/auth/useAuth";

function App() {
  const { user } = useAuth();

  return user ? <MainPage /> : <LoginPage />;
}

export default App;
