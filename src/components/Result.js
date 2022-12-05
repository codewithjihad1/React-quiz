import Analysis from "./Analysis";
import Summary from "./Summary";
import useAnswer from "../hooks/useAnswer";
import { useLocation, useParams } from "react-router-dom";
import _ from "lodash";

export default function Result() {
  const { id } = useParams();
  const location = useLocation();
  const { state } = location;
  const qna = state;
  const { loading, error, answers } = useAnswer(id);

  // console.log(answers);

  function calculate() {
    let score = 0;

    answers.forEach((question, index) => {
      let correctIndex = [],
        checkedIndex = [];

      question.options.forEach((option, index2) => {
        if (option.correct) correctIndex.push(index2);
        if (qna[index].options[index2].checked) {
          checkedIndex.push(index2);
          option.checked = true;
        }
      });
      // Check two array
      if (_.isEqual(correctIndex, checkedIndex)) {
        score = score + 5;
      }
    });
    return score;
  }

  const userCalculate = calculate();

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error... </div>}
      {answers && answers.length > 0 && (
        <>
          <Summary score={userCalculate} noq={answers.length} />
          <Analysis answers={answers} />
        </>
      )}
    </>
  );
}
