import Button from "./Button";
import From from "./From";
import TextInput from "./TextInput";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginFrom() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("login failed");
    }
  }
  return (
    <From style={{ height: "330px" }} onSubmit={handleSubmit}>
      <TextInput
        type="email"
        placeholder="Enter email"
        icon="alternate_email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextInput
        type="password"
        placeholder="Enter password"
        icon="lock"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" disabled={loading}>
        <span>Login now</span>
      </Button>

      {error && <p className="error">{error}</p>}

      <div className="info">
        Don't have an account? <Link to="/signup">Signup </Link> instead.
      </div>
    </From>
  );
}
