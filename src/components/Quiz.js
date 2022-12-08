import { useEffect, useReducer, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useQuestion from "../hooks/useQuestion";
import Answer from "./Answer";
import MiniPlayer from "./MiniPlayer";
import ProgressBar from "./ProgressBar";
import _ from "lodash";
import { useAuth } from "../context/AuthContext";
import { getDatabase, ref, set } from "firebase/database";

const initialState = null;
const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case "answer":
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;

      return questions;
    default:
      return state;
  }
};

export default function Quiz() {
  const { id } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { questions, loading, error } = useQuestion(id);
  const [qna, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    });
  }, [questions]);

  // Handle Answer Change events
  function handleAnswerChange(e, index) {
    dispatch({
      type: "answer",
      optionIndex: index,
      questionID: currentQuestion,
      value: e.target.checked,
    });
  }

  // When user clicks next button then Changed the next question
  function nextQuestion() {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevQue) => prevQue + 1);
    }
  }

  // When user clicks prev button then Change the prev question
  function prevQuestion() {
    if (currentQuestion >= 1 && currentQuestion < questions.length) {
      setCurrentQuestion((prevQue) => prevQue - 1);
    }
  }

  // Submit quiz when user clicks
  async function submitQuiz() {
    const { uid } = currentUser;

    const db = getDatabase();
    const resultRef = ref(db, `/results/${uid}`);

    await set(resultRef, { [id]: qna });

    navigate(`/results/${id}`, { state: qna });
  }

  // Percentage calculate of progressbar value
  const percentage =
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error! </div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers </h4>
          <Answer
            input
            options={qna[currentQuestion].options}
            handleChange={handleAnswerChange}
          />
          <ProgressBar
            next={nextQuestion}
            prev={prevQuestion}
            progress={percentage}
            submit={submitQuiz}
          />
          <MiniPlayer videoID={id} />
        </>
      )}
    </>
  );
}
