import { Link } from "react-router-dom";

import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import LoginForm from "@/components/Auth/LoginForm";

function LoginPage() {
  return (
    <div className="app">
      <Header />

      <div className="main">
        <div className="auth-panel">
          <LoginForm />

          <p className="form-divider">or</p>

          <p className="form-switch">
            No account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LoginPage;
