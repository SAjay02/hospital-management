import React, { useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase-config";
import "./login.css";
import Main from "../pages/Main";
import HomePage from "../pages/HomePage";

const SignIn = ({ setLoginEmail, setLoginPassword, onLogin, errorMessage }) => {
  return (
    <div className="body" >
      <div className="container-login">
        <div className="heading">Sign In</div>
        {errorMessage && <div className="error" style={{color:'red', fontSize:"13px",fontStyle:'italic'}}>{errorMessage}</div>}

        <div className="form">
          <input
            required=""
            className="input"
            onChange={(event) => setLoginEmail(event.target.value)}
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
          />
          <input
            required=""
            className="input"
            onChange={(event) => setLoginPassword(event.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <span className="forgot-password">
            <a href="#">Forgot Password?</a>
          </span>
          <button
            className="login-button"
            defaultValue="Sign In"
            onClick={onLogin}
          >
            Submit
          </button>
        </div>
        <div className="social-account-container">
          <span className="title">Or Sign in with</span>
          <div className="social-accounts">
            {/* ... (social login buttons) */}
          </div>
        </div>
        <span className="agreement">
          <a href="#">Learn user licence agreement</a>
        </span>
      </div>
    </div>
  );
};

let currentUser1;
const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      currentUser1 = user;
      setLoggedIn(!!currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(userCredential.user);
      setLoggedIn(true);
    } catch (error) {
      console.error("Login error:", error.message);
      setLoggedIn(false);
      setErrorMessage("Incorrect email or password. Please try again.");

    }
  };
  {
    console.log("user : ", user?.email);
  }

  const logout = async () => {
    try {
      console.log("first");
      await signOut(auth);
      setLoggedIn(false);
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <Main currentUser={user} onLogout={logout} />
      ) : (
        <SignIn
          loginEmail={loginEmail}
          setLoginEmail={setLoginEmail}
          loginPassword={loginPassword}
          setLoginPassword={setLoginPassword}
          onLogin={login}
          currentUser={user}
          errorMessage ={errorMessage}
        />
      )}
    </div>
  );
};

export default Login;
export { currentUser1 };
