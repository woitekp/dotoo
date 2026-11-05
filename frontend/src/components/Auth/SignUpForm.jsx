import { useState } from "react";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import useAuth from "@/context/auth/useAuth";

function SignUpForm() {
  const { register } = useAuth();
  const [credentials, setCredentials] = useState({
    login: "",
    password: "",
    passwordConfirmation: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (credentials.password !== credentials.passwordConfirmation) {
      setError("Passwords do not match");
      return;
    }

    if (Object.values(credentials).some((value) => !value.trim())) {
      setError("Fill in all fields");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await register({
        login: credentials.login,
        password: credentials.password,
      });
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="form-card signup-form" onSubmit={handleSubmit}>
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
      <input
        name="passwordConfirmation"
        type="password"
        className="password-field"
        onChange={handleChange}
        value={credentials.passwordConfirmation}
        placeholder="Confirm Password"
        required
      />

      {error && <p className="form-error">{error}</p>}

      <button
        className="icon-button submit-button"
        type="submit"
        disabled={isSubmitting}
      >
        <PersonAddAlt1Icon fontSize="small" />
      </button>
    </form>
  );
}

export default SignUpForm;
