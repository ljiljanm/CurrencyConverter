import React from "react";
import "../index.css";

const RightSide = props => {
  return (
    <div className="right">
      <div className={`icon ${props.rightCurr.code.toLowerCase()}`}>
        {props.rightCurr.name}
      </div>
      <div className="input">
        {/* <div className="sign"></div> */}
        <input
          type="text"
          onChange={e => props.change(e, "right")}
          value={props.value}
        />
        <div className="sign">{props.rightCurr.code}</div>
      </div>
    </div>
  );
};

export default RightSide;
