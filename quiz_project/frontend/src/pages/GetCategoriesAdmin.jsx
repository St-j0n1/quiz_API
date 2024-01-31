import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "../styles/homepageadmin.module.css"


function GetCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const handleCategories = async () => {
      try {
        const response = await axios.get("https://crudapi.co.uk/api/v1/quiz", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer xqV72-moMK_a_u_QJTHyybjqNfiMlQpZaoyCWPP_St1hs-a3Lw`,
          },
        });

        const quizData = response.data.items;

        const groupedQuizzes = quizData.reduce((acc, quiz) => {
          const category = quiz.category;

          if (!acc[category]) {
            acc[category] = [];
          }
          const { _created, _data_type, _is_deleted, _modified, _self_link, _user, category: quizCategory, ...quizInfo } = quiz;
          acc[category].push(quizInfo);

          return acc;
        }, {});

        setCategories(groupedQuizzes);
        console.log(groupedQuizzes)

      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };
    handleCategories();
  }, []);

  return (
    <div className={`${styles.dflex} ${styles.dcolumn}`}>
      {Object.entries(categories).map(([category, quizzes]) => (
        <div key={category} className={`${styles.dflex} ${styles.dcolumn}`}>
          <h2>{category}</h2>
          <div className={`${styles.dgrid}`}>
          {quizzes.map((quiz) => (
            <div key={quiz._uuid} className={styles.quiz}>
              <h3>{quiz.quizname}</h3>
              <Link
                to={`/quizapp/editquiz/${encodeURIComponent(quiz._uuid)}`}
              >
                Edit
              </Link>
            </div>
          ))}
          </div>
         
        </div>
      ))}
    </div>
  );
}

export default GetCategories;
