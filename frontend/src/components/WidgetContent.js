import React from "react";
import "./css/WidgetContent.css";

function WidgetContent() {
  return (
    <div className=" widget__contents">
      <div className="widget__content">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJKOyKxVcZOjjsN4sFb07KHYs7C5V0bY_wx2_97gwVDA&s"
          alt=""
        />
        <div className="widget__contentTitle">
          <h5>Coffee</h5>
          <p>A coffee a day </p>
        </div>
      </div>
    </div>
  );
}

export default WidgetContent;
