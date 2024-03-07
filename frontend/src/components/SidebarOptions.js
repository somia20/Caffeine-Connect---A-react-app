// import { Add } from "@material-ui/icons";
import React from "react";
import "./css/SidebarOptions.css";

function SidebarOptions() {
  return (
    <div className="sidebarOptions">
      <div className="sidebarOption">
        <img
          src="latte.png"
          alt=""
        />
        <p>Latte</p>
      </div>

      <div className="sidebarOption">
        <img
          src="coffee.png"
          alt=""
        />

        <p>Cappuccino</p>
      </div>
      <div className="sidebarOption">
        <img
          src="americano.png"
          alt=""
        />
        <p>Americano</p>
      </div>

      <div className="sidebarOption">
        <img
          src="espresso.png"
          alt=""
        />
        <p>Espresso</p>
      </div>

    </div>
  );
}

export default SidebarOptions;

