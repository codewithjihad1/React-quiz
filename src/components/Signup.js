import image from "../assets/images/signup.svg";
import SignupFrom from "./SignupFrom";
import Illustration from "./Illustration";

export default function Signup() {
  return (
    <>
      <h1>Create an account</h1>
      <div className="column">
        <Illustration image={image} alt="Signup" />
        <SignupFrom />
      </div>
    </>
  );
}
