import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditQuiz = () => {
  const { uuid } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const handleCategories = async () => {
      try {
        const response = await axios.get(
          `https://crudapi.co.uk/api/v1/quiz/${uuid}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer xqV72-moMK_a_u_QJTHyybjqNfiMlQpZaoyCWPP_St1hs-a3Lw`,
            },
          }
        );

        const quizData = response.data;
        setQuiz(quizData);
      } catch (error) {
        console.error("Error fetching quiz:", error.message);
      }
    };

    handleCategories();
  }, [uuid]);
  console.log(quiz);

  const handleQuestionChange = (questionIndex, value) => {
    const updatedQuiz = { ...quiz };
    updatedQuiz.quizquestions[questionIndex].question = value;
    setQuiz(updatedQuiz);
  };

  const handleAnswerChange = (questionIndex, answerIndex, value) => {
    const updatedQuiz = { ...quiz };
    updatedQuiz.quizquestions[questionIndex].answers[answerIndex] = value;
    setQuiz(updatedQuiz);
  };

  const handleEdit = async () => {
    try {
      await axios.put(`https://crudapi.co.uk/api/v1/quiz/${uuid}`, quiz, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer xqV72-moMK_a_u_QJTHyybjqNfiMlQpZaoyCWPP_St1hs-a3Lw`,
        },
      });

      setQuiz(quiz);
      console.log(quiz);
    } catch (error) {
      console.error("Error updating quiz:", error.message);
    }
  };

  return (
    <div>
      <h2>Edit Quiz: {uuid}</h2>
      <h2>{quiz && quiz.quizname}</h2>
      {quiz && (
        <div>
          {quiz.quizquestions.map((question, questionIndex) => (
            <div key={questionIndex}>
              <h3>Question {questionIndex + 1}</h3>
              <p>Question:</p>
              <input
                type="text"
                value={question.question}
                onChange={(e) =>
                  handleQuestionChange(questionIndex, e.target.value)
                }
              />
              <ul>
                {question.answers.map((answer, answerIndex) => (
                  <li key={answerIndex}>
                    <input
                      type="text"
                      value={answer}
                      onChange={(e) =>
                        handleAnswerChange(
                          questionIndex,
                          answerIndex,
                          e.target.value
                        )
                      }
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button onClick={handleEdit}>Save Changes</button>
        </div>
      )}
    </div>
  );
};

export default EditQuiz;
