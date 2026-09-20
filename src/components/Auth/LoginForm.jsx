import { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useAuth from "@/context/auth/useAuth";

function LoginForm() {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    login: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (Object.values(credentials).some((value) => !value.trim())) {
      setError("Fill in all fields");
      return;
    }

    setError("");

    login(credentials);
  }

  return (
    <form className="form-card login-form" onSubmit={handleSubmit}>
      <input
        name="login"
        type="text"
        onChange={handleChange}
        value={credentials.login}
        placeholder="Login"
        required
      />
      <input
        name="password"
        type="password"
        className="password-field"
        onChange={handleChange}
        value={credentials.password}
        placeholder="Password"
        required
      />

      {error && <p className="form-error">{error}</p>}

      <button className="icon-button submit-button" type="submit">
        <ArrowForwardIcon fontSize="medium" />
      </button>
    </form>
  );
}

export default LoginForm;
