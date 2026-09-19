import { Link } from "react-router-dom";

import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import SignUpForm from "@/components/Auth/SignUpForm";

function SignUpPage() {
  return (
    <div className="app">
      <Header />

      <div className="main">
        <div className="auth-panel">
          <SignUpForm />

          <p className="form-divider">or</p>

          <p className="form-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default SignUpPage;
