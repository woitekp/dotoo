import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import LoginForm from "../components/Auth/LoginForm";


function LoginPage({ onLogin }) {
  return (
    <div className="app">
      <Header />

      <div className="main">
        <LoginForm onLogin={onLogin} />
      </div>

      <Footer />
    </div>
  );
}

export default LoginPage;
