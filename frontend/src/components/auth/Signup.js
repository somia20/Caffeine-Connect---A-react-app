import { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  login } from "../../feature/userSlice";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [error, setError] = useState("");
  const [showBackButton, setShowBackButton] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = (event) => {
    event.preventDefault();

    if (userType === "admin" && adminCode !== "1234") {
      setError("Invalid admin code");
      return;
    }

        // Validate email address
        const emailRegex = /^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
          setError("Invalid email address");
          return;
        }
    
        // Disallow email addresses that start with numbers
        if (/^\d/.test(email)) {
          setError("Email address cannot start with a number");
          return;
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("User created successfully");
          const { user } = userCredential;
          const userData = {
            userName: user.displayName,
            photo: user.photoURL,
            email: user.email,
            uid: user.uid,
          };
          dispatch(login(userData));
          if (userType === "admin") {
            // navigate("/AllUsers");
          } else {
            navigate("/Quora");
          }
        })
        .catch((error) => {
          setError(error.message);
          console.log(error);
        });
    };

  const handleUserTypeSelection = (selectedUserType) => {
    setUserType(selectedUserType);
    setShowBackButton(true);
  };

  const handleBackButtonClick = () => {
    setUserType("");
    setShowBackButton(false);
  };

  const handleSignupButtonClick = () => {
    setUserType("select");
  };

  return (
    <div className="signup-container">
      {userType === "" && (
        <div>
          <button onClick={handleSignupButtonClick}>Signup</button>
        </div>
      )}
      {userType === "select" && (
        <div>
          <form className="signup-form">
            <h2>Select user type:</h2>
            <button onClick={() => handleUserTypeSelection("user")}>User</button>
            <button onClick={() => handleUserTypeSelection("admin")}>Admin</button>
          </form>
        </div>
      )}
      {userType !== "" && userType !== "select" && (
        <form onSubmit={handleSignup} className="signup-form">
          <h2>{userType === "user" ? "User Signup" : "Admin Signup"}</h2>
          {error && <p className="error">{error}</p>}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {userType === "admin" && (
            <div className="form-group">
              <label>Admin Code</label>
              <input
                type="text"
                name="admin-code"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
              />
            </div>
          )}
          <div className="form-group button-container">
            {showBackButton && (
              <button type="button" onClick={handleBackButtonClick}>
                Back
              </button>
            )}
            <button type="submit">Sign up</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Signup;