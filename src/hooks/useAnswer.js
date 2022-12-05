import { useEffect, useState } from "react";
import { get, getDatabase, orderByKey, query, ref } from "firebase/database";

export default function useAnswer(videoID) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [answers, setAnswer] = useState([]);

  useEffect(() => {
    async function fetchAnswer() {
      // database nested function
      const db = getDatabase();
      const answerRef = ref(db, `answers/${videoID}/questions`);
      const answerQuery = query(answerRef, orderByKey());

      try {
        setError(false);
        setLoading(true);
        // request firebase database
        const snapshot = await get(answerQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setAnswer((prevAnswer) => {
            return [...prevAnswer, ...Object.values(snapshot.val())];
          });
        }
      } catch (err) {
        console.log(err);
        setError(true);
        setLoading(false);
      }
    }

    fetchAnswer();
  }, [videoID]);

  return {
    loading,
    error,
    answers,
  };
}
