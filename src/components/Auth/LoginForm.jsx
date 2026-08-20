import { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function LoginForm({ onLogin }) {
  const [credentials, setCredentials] = useState({
    login: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onLogin();
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        name="login"
        type="text"
        onChange={handleChange}
        value={credentials.login}
        placeholder="Login"
      />
      <input
        name="password"
        type="password"
        className="login-password"
        onChange={handleChange}
        value={credentials.password}
        placeholder="Password"
      />
      <button className="submit-button" type="submit">
        <ArrowForwardIcon fontSize="medium" />
      </button>
    </form>
  );
}

export default LoginForm;
