import React from "react";
import "./index.css";
import { currencies } from "./components/currencies";
import SelectCurrency from "./components/SelectCurrency";
import Converter from "./components/Converter";

class CurrencyConverter extends React.Component {
  state = {
    currencies: currencies,
    leftCurr: currencies[0],
    rightCurr: currencies[1],
    leftValue: "",
    rightValue: "",
  };
  selectHandler = e => {
    const code = e.target.value;
    const { currencies } = this.state;
    const ind = currencies.findIndex(item => item.code === code);
    console.log(ind);
    this.setState({ rightCurr: currencies[ind] });
    // recalculate the right hand value
    let rightValue = this.state.leftValue * currencies[ind].rate; // done
    rightValue = rightValue.toFixed(2);
    this.setState({ rightValue });
  };
  changeHandler = (e, atr) => {
    const value = e.target.value;
    if (atr === "left") {
      let rightValue = value * this.state.rightCurr.rate; // done
      rightValue = rightValue.toFixed(2);
      this.setState({ leftValue: value });
      this.setState({ rightValue });
    }
    if (atr === "right") {
      let leftValue = value / this.state.rightCurr.rate; // done
      leftValue = leftValue.toFixed(2);
      this.setState({ rightValue: value });
      this.setState({ leftValue });
    }
  };
  componentDidMount() {
    const { currencies } = this.state;
    let rates = {};
    const url =
      "http://data.fixer.io/api/latest?access_key=443ef2f31753d239068100ede5ebbbbb&symbols=USD,AUD,CAD,JPY,GBP,BAM,RSD";
    fetch(url)
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => (rates = data.rates))
      .then(() => {
        localStorage.setItem("rates", JSON.stringify(rates));
        for (let key in rates) {
          const ind = currencies.findIndex(item => item.code === key);
          currencies[ind].rate = rates[key];
        }
        this.setState({ currencies });
      })
      .catch(error => {
        console.log("there s an error");
        rates = JSON.parse(localStorage.getItem("rates"));
        console.log(rates);
        for (let key in rates) {
          const ind = currencies.findIndex(item => item.code === key);
          currencies[ind].rate = rates[key];
        }
        this.setState({ currencies });
      });
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
            {this.state.rightCurr.rate.toFixed(4)} {this.state.rightCurr.code}{" "}
          </div>
          <div className="signature">By Ljiljan Maksimovic</div>
        </div>
      </div>
    );
  }
}

export default CurrencyConverter;
