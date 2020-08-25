import React from "react";

const SelectCurrency = props => {
  return (
    <div>
      <h2>Select Currency</h2>
      <select onChange={props.change}>
        {props.currencies.map(
          (curr, ind) =>
            ind !== 0 && (
              <option key={curr.id} value={curr.code}>
                {curr.name}
              </option>
            )
        )}
      </select>
    </div>
  );
};

export default SelectCurrency;
