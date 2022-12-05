import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import Checkbox from "./Checkbox";
import From from "./From";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "./TextInput";

export default function SignupFrom() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [agree, setAgree] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const { signup } = useAuth();

  // Handle submit
  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Your password din't match!");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password, username);
      navigate("/");
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to Signup?");
    }
  }

  return (
    <From style={{ height: "500px" }} onSubmit={handleSubmit}>
      <TextInput
        type="name"
        placeholder="Enter name"
        icon="person"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

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

      <TextInput
        type="password"
        placeholder="Confirm password"
        icon="lock_clock"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      <Checkbox
        text="I agree to the Terms &amp; Conditions"
        value={agree}
        onChange={(e) => setAgree(e.target.value)}
        required
      />

      <Button disabled={loading} type="submit">
        <span>Submit Now</span>
      </Button>

      {error && <p className="error">{error}</p>}

      <div className="info">
        Already have an account? <Link to="/login">Login</Link> instead.
      </div>
    </From>
  );
}
