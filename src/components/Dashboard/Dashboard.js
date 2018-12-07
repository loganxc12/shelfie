import React, { Component } from 'react';
import axios from "axios";
import Product from "../Product/Product";

class Dashboard extends Component {

     constructor(props) {
          super(props);
          this.state = {
               inventory: []
          }
          this.getInventory = this.getInventory.bind(this);
          this.deleteProduct = this.deleteProduct.bind(this);
     }

     componentDidMount() {
          this.getInventory();
     }

     getInventory() {
          axios.get("/api/inventory").then(response => {
            this.setState({
              inventory: response.data
            })
          })
        }

     deleteProduct(id) {
          axios.delete(`/api/product/${id}`).then(response => {
               this.getInventory();
          })
     }

     render() {

          const { inventory, getInventory } = this.state;
          const inventoryToDisplay = inventory.map(item => {
               return <Product 
                         item={item} 
                         deleteProduct={() => this.deleteProduct(item.product_id)} 
                      />
          })

          return (
               <div >
               { inventoryToDisplay }
               </div>
          );
     }

}

export default Dashboard;
