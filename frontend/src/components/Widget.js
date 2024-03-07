import React from "react";
// import WidgetContent from "./WidgetContent";
import "./css/Widget.css";
import QuoraBox from "./QuoraBox";

function Widget() {
  return (
    <div className="widget">
      <QuoraBox />
      {/* <div className="widget__header">
        <h5>Space to follow</h5>
      </div>
      <div className="widget__contents">
        <WidgetContent />
      </div> */}
    </div>
  );
}

export default Widget;