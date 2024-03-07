import React from "react";
import "./Login.css";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";

function Login() {
  const handleSubmit = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="login">
    <div className="login">
    <div className="login-container">
      <div className="login-content">
        <img
          src="coffee.gif"
          alt="logo"
        />
        
        <button onClick={handleSubmit} className="btn-login">
          Login with Google        
        </button>
        
      </div>
    </div>   
    </div> 
    </div>
  );
}

export default Login;