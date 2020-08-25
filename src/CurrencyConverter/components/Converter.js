import React from "react";
import "../index.css";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

const Converter = props => {
  return (
    <div>
      <div className="converter">
        <LeftSide leftCurr={props.leftCurr} change={props.change} value={props.leftValue} />
        <div className="center">=</div>
        <RightSide rightCurr={props.rightCurr} change={props.change} value={props.rightValue} />
      </div>
    </div>
  );
};

export default Converter;
