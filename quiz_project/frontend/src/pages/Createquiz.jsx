import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/createquiz.module.css";
import { Link } from "react-router-dom";

const Modal = ({ isOpen, onClose, categories, handleSave, showSuccess }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <span className={styles.closeButton} onClick={onClose}>
          X
        </span>{" "}
        <h2 className={styles.categoriesHeader}>My Categories</h2>
        <div className={styles.categories}>
          {categories &&
            categories.map((category) => (
              <button
                key={category.category_id}
                className={styles.category}
                onClick={handleSave}
              >
                {category.category}
              </button>
            ))}
        </div>
        {showSuccess && (
          <div className={styles.successMessage}>Quiz saved successfully!</div>
        )}
      </div>
    </div>
  );
};

const Createquiz = () => {
  const [questions, setQuestions] = useState([
    {
      quizName: "",
      text: "",
      answers: ["", "", "", ""],
      correctAnswerIndex: null,
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const [categories, setCategories] = useState([]);
  const [quizName, setQuizName] = useState("");

  useEffect(() => {
    const handleCategories = async () => {
      try {
        const response = await axios.get(
          "https://crudapi.co.uk/api/v1/categories",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer xqV72-moMK_a_u_QJTHyybjqNfiMlQpZaoyCWPP_St1hs-a3Lw`,
            },
          }
        );

        const categories = response.data;

        setCategories(categories.items);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };
    handleCategories();
  }, []);

  const handleQuestionChange = (index, newText) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = newText;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (answerIndex, newValue) => {
    const updatedQuestions = [...questions];
    updatedQuestions[selectedQuestionIndex].answers[answerIndex] = newValue;
    setQuestions(updatedQuestions);
    console.log(newValue, answerIndex);
  };

  const handleRadioChange = (answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[selectedQuestionIndex].correctAnswerIndex = answerIndex;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        quizName,
        text: "",
        answers: ["", "", "", ""],
        correctAnswerIndex: null,
        category: "",
      },
    ]);

    setSelectedQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleSave = async () => {
    try {
      const quizData = [
        {
          category: categories[0].category,
          quizname: quizName,
          quizquestions: questions.map((question) => ({
            question: question.text,
            answers: question.answers,
            correctAnswerIndex: question.correctAnswerIndex.toString(),
          })),
        },
      ];

      const response = await axios.post(
        "https://crudapi.co.uk/api/v1/quiz",
        quizData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer xqV72-moMK_a_u_QJTHyybjqNfiMlQpZaoyCWPP_St1hs-a3Lw",
          },
        }
      );

      console.log("Quiz saved successfully:", response.data);
      setShowSuccess(true);
    } catch (error) {
      console.error("Error saving quiz:", error.message);
    }
  };

  return (
    <>
      <nav>
        <Link
          to="/welcomeuser"
          className={`${styles.f30} ${styles.f200} `}
        >

          Quizz
        </Link>
      </nav>

      <div className={styles.createquiz}>
        <aside className={styles.settings}>
          <input
            type="text"
            placeholder="Untitled Quiz"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            className={styles.quizNameInput}
          />
          {questions.map((_, index) => (
            <button
              key={index}
              className={styles.qButton}
              onClick={() => setSelectedQuestionIndex(index)}
            >
              {index + 1}
            </button>
          ))}
          <button onClick={handleAddQuestion} className={styles.qButton}>
            +
          </button>
          <button className={styles.btnSaveQuiz} onClick={toggleModal}>
            Save
          </button>
        
        </aside>

        <form className={styles.addQuiz}>
          <input
            type="text"
            className={styles.qInput}
            placeholder="question"
            value={questions[selectedQuestionIndex].text}
            onChange={(e) =>
              handleQuestionChange(selectedQuestionIndex, e.target.value)
            }
          />
          <div className={styles.answersInputs}>
            {questions[selectedQuestionIndex].answers.map(
              (answer, answerIndex) => (
                <div key={answerIndex} className={styles.answerFormat}>
                  <input
                    type="radio"
                    name="correctAnswer"
                    className={styles.answerRadio}
                    id={`radio${answerIndex}`}
                    checked={
                      questions[selectedQuestionIndex].correctAnswerIndex ===
                      answerIndex
                    }
                    onChange={() => handleRadioChange(answerIndex)}
                  />
                  <input
                    key={answerIndex}
                    className={`${styles[`Answer${answerIndex + 1}`]} ${
                      styles.aInput
                    }`}
                    type="text"
                    name=""
                    id=""
                    placeholder={`Answer ${answerIndex + 1}`}
                    value={answer}
                    onChange={(e) =>
                      handleAnswerChange(answerIndex, e.target.value)
                    }
                  />

                  <label htmlFor={`radio${answerIndex}`}></label>
                </div>
              )
            )}
          </div>
        </form>
        <Modal
          isOpen={isModalOpen}
          onClose={toggleModal}
          categories={categories}
          handleSave={handleSave}
          showSuccess={showSuccess}
        />
      </div>
    </>
  );
};

export default Createquiz;
