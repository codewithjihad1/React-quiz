import image from "../assets/images/signup.svg";
import Illustration from "./Illustration";
import LoginFrom from "./LoginFrom";

export default function Login() {
  return (
    <>
      <h1>Login to your account</h1>
      <div className="column">
        <Illustration image={image} alt="Login" />
        <LoginFrom />
      </div>
    </>
  );
}
