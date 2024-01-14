import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { createData } from "../store/signup/createData.thunk";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/register.module.css";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  R E G U L A R      ------  E X P R E S S I O N S
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const fullNameRef = useRef(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [passWord, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [course, setcourse] = useState("");
  const role = "user";

  //    C H E C K   ------    S T A T E

  const checkValues = () => {
    if (fullName.length < 8) {
      alert(` NEED MORE THEN 8 symbols`);
      return false;
    }
    if (!emailRegex.test(email)) {
      alert(`IS NOT VALID EMAIL `);
      return false;
    }
    if (!passwordRegex.test(passWord)) {
      alert(` AT LEAST 1, CAPITAL, 1 LOWER CASE , 1 speacial character `);

      return false;
    }
    if (passWord !== confirmPassword) {
      alert(` PASSWORDS DOESNT MATCH`);
      return false;
    }
    return true;
  };

  // H A N D L E -------  S U B M I T

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkValues()) {
      dispatch(createData({ fullName, email, passWord, course, role }));
      navigate("/quizapp/welcomeuser");
    }
  };

  // useEffect(() => {
  //   fullNameRef.current.focus();
  // }, []);
  // //  J S X ___

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 id="register-h1" className={styles.bFont}>
          Sign Up{" "}
        </h1>
        <input
          type="text"
          className={styles.authInput}
          placeholder="Full Name"
          onChange={(e) => setFullName(e.target.value)}
          ref={fullNameRef}
        />
        <input
          type="email"
          className={styles.authInput}
          placeholder="Email  Adress"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className={styles.authInput}
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className={styles.authInput}
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <select
          value={course}
          onChange={(e) => setcourse(e.target.value)}
          className={styles.courseSelect}
          required
        >
          <option className={styles.selectPlaceholder} value="" disabled selected>
            Which course are you?
          </option>
          <option value="Front-End React">Front End React</option>
          <option value="Python Django">Python Django</option>
          <option value="UI/UX Design">UI/UX Design</option>
          <option value="QA/DIGITAL PRODUCTS">QA/DIGITAL PRODUCTS</option>
        </select>
        <button
          className={styles.authButton}
          disabled={!fullName || !passWord || !confirmPassword || !course}
        >
          Sign Up
        </button>
        <Link className={styles.navigateLogin} to={"/quizapp/login"}>
          {" "}
          Already have an account? 
        </Link>
      </form>
    </div>
  );
};

export default RegisterPage;
