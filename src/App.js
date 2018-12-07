import React, { Component } from 'react';
import axios from "axios";
import { HashRouter, Route, Switch, NavLink } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Form from "./components/Form/Form";
import Header from "./components/Header/Header";
import './App.css';

class App extends Component {

  constructor(props) {

    super(props);
    this.state = {
        //  inventory: [],
        //  selectedProduct: {}
    }
    // this.getInventory = this.getInventory.bind(this);
    // this.setSelectedProduct = this.setSelectedProduct.bind(this);
  }

  // componentDidMount() {
  //   this.getInventory();
  // }

  // getInventory() {
  //   axios.get("/api/inventory").then(response => {
  //     this.setState({
  //       inventory: response.data
  //     })
  //   })
  // }

  // setSelectedProduct(product) {
  //   this.setState({
  //     selectedProduct: product
  //   })
  // }


  render() {
    const { inventory, selectedProduct } = this.state;
    return (
      <div className="App">
        <Header />
        <Dashboard inventory={inventory} getInventory={this.getInventory} setSelected={this.setSelectedProduct}/> 
        <Form getInventory={this.getInventory} selectedProduct={selectedProduct} />
      </div>
    );
  }
}

export default App;
