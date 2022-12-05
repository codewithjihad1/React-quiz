import classes from "../styles/Signup.module.css";

export default function Illustration({ image, alt }) {
  return (
    <div className={classes.illustration}>
      <img src={image} alt={alt} />
    </div>
  );
}
