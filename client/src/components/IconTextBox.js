import React from "react";
import familyIcon from "../images/icon-family.svg";
import "./icontextbox.css";

const IconTextBox = (props) => {
  return (
    <div className="text-input-wrapper">
      <img
        src={familyIcon}
        style={{ width: 20, height: 20, paddingRight: 5 }}
      />
      <input type="text" style={{ height: 30, width: '100%',border: "none" }} />
    </div>
  );
};

export default IconTextBox;
