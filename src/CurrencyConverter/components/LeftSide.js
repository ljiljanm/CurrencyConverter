import React from "react";
import "../index.css";

const LeftSide = props => {
  return (
    <div className="left">
      <div className={`icon ${props.leftCurr.code.toLowerCase()}`}>{props.leftCurr.name}</div>
      <div className="input">
        <div className="sign">$</div>
        <input type="text" onChange={e => props.change(e, "left")} value={props.value} />
        <div className="sign">{props.leftCurr.code}</div>
      </div>
    </div>
  );
};

export default LeftSide;
