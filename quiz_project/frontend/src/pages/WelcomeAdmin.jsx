import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GetCategories from "./GetCategoriesAdmin";
import styles from "../styles/homepageadmin.module.css";

const getUser = () => {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
};

const WelcomeAdmin = () => {
  const [user, setUser] = useState(getUser());
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  return (
   

   <>
      {user ? (
        <div className={styles.dflex}>
          <aside className={styles.Hsettings}>
          {/* <div className={styles.overlay}></div>  */}


            <h3 className={`${styles.Hfont} ${styles.zindex} `}>Welcome user {user.fullName}</h3>

            <div className={styles.navigation}>
              <Link className={`${styles.Hfont} ${styles.zindex} `} to="/quizapp/createquiz">
                Create Quiz
              </Link>
              
              <Link className={`${styles.Hfont} ${styles.zindex} `} to="/quizapp/userScores">
                User Scores
              </Link>
              <Link className={styles.Hfont} to="/quizapp/managecategories">
                Manage categories
              </Link>
            </div>
            <button className={styles.Hbutton} onClick={handleLogout}>
              Logout
            </button>
          </aside>
          <GetCategories />
        </div>
      ) : (
        navigate("/quizapp")
      )}
    </>

     
  
  );
};

export default WelcomeAdmin;
