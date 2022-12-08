import { useRef, useState } from "react";
import classes from "../styles/MiniPlayer.module.css";
import ReactPlayer from "react-player/youtube";
import { useLocation } from "react-router-dom";

export default function MiniPlayer({ videoID }) {
  const buttonRef = useRef();
  const [status, setStatus] = useState(false);
  const location = useLocation();
  const title = location.state?.title;
  const videoUrl = `https://www.youtube.com/watch?v=${videoID}`;

  // Toggle minelayer button
  function toggleMiniPlayer() {
    if (status) {
      buttonRef.current.classList.add(classes.floatingBtn);
      setStatus(false);
    } else {
      buttonRef.current.classList.remove(classes.floatingBtn);
      setStatus(true);
    }
  }

  return (
    <div
      className={`${classes.miniPlayer} ${classes.floatingBtn}`}
      ref={buttonRef}
    >
      <span
        className={`material-icons-outlined ${classes.open}`}
        onClick={toggleMiniPlayer}
      >
        play_circle_fille
      </span>
      <span
        className={`material-icons-outlined ${classes.close}`}
        onClick={toggleMiniPlayer}
      >
        close
      </span>
      <ReactPlayer
        class={classes.player}
        url={videoUrl}
        playing={status}
        width="300px"
        height="168px"
        controls
      />
      <p>{title ? title : "Video title was not found! "}</p>
    </div>
  );
}
