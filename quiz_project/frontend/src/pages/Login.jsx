import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../store/login/UserSlice";
import { useNavigate } from "react-router-dom";
import styles from "../styles/login.module.css"

const Login = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(loginUser(email)).then((result) => {
      console.log(result)
      if (result.payload && result.payload[0].role) {
        if (result.payload.role === "admin") {
          setEmail("");
          setPwd("");
          navigate("/quizapp/welcomeadmin");
        } else {
          setEmail("");
          setPwd("");
          navigate("/quizapp/welcomeuser");
        }
      } else {
        console.error("Invalid server response:", result);
      }
    });
  };

  const { loading, error } = useSelector((state) => state.user);
  const handleUserInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPwd(e.target.value);

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  return (
    <div className={styles.container}>
    

      <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.bFont}>Login</h1>
        <input
          type="text"
          id="username"
          placeholder="Email address"
          value={email}
          onChange={handleUserInput}
          autoComplete="off"
          required
          className={styles.authInput}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handlePwdInput}
          value={pwd}
          required
          className={styles.authInput}
        />


        <button type="submit"   className={styles.authButton}>
          {loading ? "Loading..." : "Log In"}
        </button>
        {error && <div style={{ color: "red" }}> {error}</div>}

        <Link to="/quizapp/signup" className={styles.navigateLogin}>
          Don't have an account?
        </Link>
      </form>
   </div>
  );
};

export default Login;
