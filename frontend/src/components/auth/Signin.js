import { useState } from "react";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./Signin.css";

function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSignIn = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User is signed in successfully
        const user = userCredential.user;
        console.log(user);
        setDisplayName(user.displayName || user.email);
        props.onSignIn(displayName);
      })
      .catch((error) => {
        // Handle errors here
        setError(error.message);
        console.log(error);
      });
  };

  const handleLoginButtonClick = () => {
    setShowForm(true);
  };

  const handleBackButtonClick = () => {
    setShowForm(false);
  };

  return (
    <div className="signin-container">
      {showForm ? (
        <form onSubmit={handleSignIn} className="signin-form">
          <h2>Log in</h2>
          {error && <p className="error">{error}</p>}
          {displayName && (
            <p className="welcome">Welcome, {displayName}!</p>
          )}
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
          <div className="form-group button-container">
            <button type="button" onClick={handleBackButtonClick}>
              Back
            </button>            
            <button type="submit">Log in</button>
          </div>
        </form>
      ) : (
        <div className="login-button-container">
          <button onClick={handleLoginButtonClick} >Log-in
          </button>
          </div>
      )}
    </div>
  );
}

export default SignIn;