import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../feature/userSlice";
import "./css/QuoraBox.css";

function QuoraBox() {
  const user = useSelector(selectUser);
  let name = "";

  if (user && user.email) {
    const parts = user.email.split("@");
    name = parts[0];
  }

  return (
    <div className="quoraBox">
      <div className="quoraBox__info" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="https://www.icegif.com/wp-content/uploads/coffee-icegif-4.gif" style={{ width: '200px', height: '150px' }} alt="Coffee pouring into a cup" />
      </div>

      <div className="quoraBox__quora">
        {user && (
          <h5>Welcome, {name}! You can post your thoughts from the button above ⬆️</h5>
        )}
        {!user && (
          <h5>You can post your thoughts from the button above ⬆️</h5>
        )}
      </div>
    </div>
  );
}

export default QuoraBox;