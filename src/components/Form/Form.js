import React, { Component } from 'react';
import axios from "axios";

class Form extends Component {
     constructor(props) {
          super(props);
          this.state = {
               imageUrl: "",
               productName: "",
               price: 0,
               selectedProductId: null,
               addUpdateButtonValue: "Add to Inventory"
          }
          this.handleInputChange = this.handleInputChange.bind(this);
          this.resetState = this.resetState.bind(this);
          this.postNewProduct = this.postNewProduct.bind(this);
          this.updateProduct = this.updateProduct.bind(this);
     }

     componentDidUpdate(prevProps) {
          if (this.props.selectedProduct !== prevProps.selectedProduct) {
               this.setState({
                    selectedProductId: this.props.selectedProduct.product_id,
                    addUpdateButtonValue: "Save Changes"
               })
          }
     }

     handleInputChange(e) {
          this.setState({
               [e.target.name] : e.target.value
          })
     }

     resetState() {
          this.setState({
               imageUrl: "",
               productName: "",
               price: 0
          })
     }

     postNewProduct() {
          const { imageUrl, productName, price } = this.state;
          const newProduct = {
               name: productName,
               price: price,
               imageUrl: imageUrl
          }
          axios.post("/api/product", newProduct).then(response => {
               this.props.getInventory();
               this.resetState();
          })
     }

     updateProduct(id) {
          const { imageUrl, productName, price } = this.state;
          const updatedProduct = {
               name: productName,
               price: price,
               imageUrl: imageUrl
          }
          axios.put(`/api/product/${id}`, updatedProduct).then(response => {
               this.props.getInventory();
               this.resetState();
          })
     }

     render() {

          const { imageUrl, productName, price, addUpdateButtonValue, selectedProductId} = this.state;
          const addUpdateButton = (addUpdateButtonValue === "Add to Inventory") ?
               <button onClick={this.postNewProduct}>Add to Inventory</button>
                    :
               <button onClick={() => this.updateProduct(selectedProductId)}>Save Changes</button>

          return (
               <div >
                    <input placeholder="image url" name="imageUrl" onChange={this.handleInputChange} value={imageUrl}></input>
                    <input placeholder="product name" name="productName" onChange={this.handleInputChange} value={productName}></input>
                    <input name="price" onChange={this.handleInputChange} value={price}></input>
                    <button onClick={this.resetState}>Cancel</button>
                    {addUpdateButton}
               </div>
          );
     }
}

export default Form;