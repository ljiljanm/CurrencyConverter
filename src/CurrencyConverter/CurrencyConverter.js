import React from "react";
import "./index.css";
import { currencies } from "./components/currencies";
import SelectCurrency from "./components/SelectCurrency";
import Converter from "./components/Converter";

class CurrencyConverter extends React.Component {
  state = {
    currencies,
    leftCurr: currencies[0],
    rightCurr: currencies[1],
    leftValue: "",
    rightValue: "",
  };
  selectHandler = e => {
    const code = e.target.value;
    const { currencies } = this.state;
    const ind = currencies.findIndex(item => item.code === code);
    // recalculate the right hand value
    let rightValue = (this.state.leftValue * currencies[ind].rate).toFixed(2);
    this.setState({ rightCurr: currencies[ind], rightValue });
  };
  changeHandler = (e, atr) => {
    const value = e.target.value;
    if (atr === "left") {
      let rightValue = (value * this.state.rightCurr.rate).toFixed(2);
      this.setState({ leftValue: value, rightValue });
    }
    if (atr === "right") {
      let leftValue = (value / this.state.rightCurr.rate).toFixed(2);
      this.setState({ rightValue: value, leftValue });
    }
  };

  fetchData = async () => {
    const { currencies } = this.state;
    let rates = {};
    try {
      const url =
        "http://data.fixer.io/api/latest?access_key=443ef2f31753d239068100ede5ebbbbb&symbols=USD,AUD,CAD,JPY,GBP,BAM,RSD";
      const response = await fetch(url);
      const data = await response.json();
      rates = data.rates;
    } catch (error) {
      console.error("there's an error", error);
      rates = JSON.parse(localStorage.getItem("rates"));
    }

    localStorage.setItem("rates", JSON.stringify(rates));
    for (let key in rates) {
      const ind = currencies.findIndex(item => item.code === key);
      currencies[ind].rate = rates[key];
    }
    this.setState({ currencies });
  };

  async componentDidMount() {
    this.fetchData();
  }
  render() {
    return (
      <div className="main">
        <h1>CURRENCY CONVERTER</h1>
        <div className="container">
          <div className="select">
            <SelectCurrency currencies={this.state.currencies} change={this.selectHandler} />
          </div>
          <Converter
            leftCurr={this.state.leftCurr}
            rightCurr={this.state.rightCurr}
            change={this.changeHandler}
            leftValue={this.state.leftValue}
            rightValue={this.state.rightValue}
          />
          <div className="rate">
            <strong>Exchange rate: </strong>1 {this.state.leftCurr.code} ={" "}
            {this.state.rightCurr.rate ? this.state.rightCurr.rate.toFixed(4) : null}{" "}
            {this.state.rightCurr.code}{" "}
          </div>
          <div className="signature">By Ljiljan Maksimovic</div>
        </div>
      </div>
    );
  }
}

export default CurrencyConverter;
