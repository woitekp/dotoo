import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import LoginForm from "../components/Auth/LoginForm";


function LoginPage() {
  return (
    <div className="app">
      <Header />

      <div className="main">
        <LoginForm />
      </div>

      <Footer />
    </div>
  );
}

export default LoginPage;
