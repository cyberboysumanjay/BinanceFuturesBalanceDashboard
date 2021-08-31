import "./styles.css";
import React, { Component } from 'react'
import Binance from 'binance-api-node'
import logo from './binance.png'


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    // If you want to change the refresh frequency. Feel free to change the values below to your liking.
    // 1000 is the refresh rate in milliseconds.
    this.interval = setInterval(() => this.getBalance(), 1000);
  }
  componentWillUnmount() {
    clearTimeout(this.interval);
  }

  getBalance = () => {
    const client = Binance({
      apiKey: process.env.REACT_APP_API_KEY,
      apiSecret: process.env.REACT_APP_API_SECRET,
    })
    
    client.futuresAccountBalance().then(balance => {
      //console.log(balance);
      this.setState({data: balance, isLoaded: true});
    });
  }


  render() {
    const { data, isLoaded } = this.state;
    var USDTData = data[1];
    if (isLoaded){
      return (
        <div className="App">
          <img className="logo" src={logo} alt="Logo" />
          <h2>Margin Balance: {Math.round((parseFloat(USDTData.balance)+parseFloat(USDTData.crossUnPnl))*100)/100} {USDTData.asset}</h2>
          <h3>Balance: {Math.round(USDTData.balance*100)/100} {USDTData.asset}</h3>
          <h3>PnL: {Math.round(USDTData.crossUnPnl*100)/100} {USDTData.asset}</h3>
          <h3>Withdrawable: {Math.round(USDTData.availableBalance*100)/100} {USDTData.asset}</h3>
        </div>
      )
    }
    else{
      return(
        <div className="App">
          <h1>Fetching Futures Balance...</h1>
        </div>
      )
    }
  }
}

