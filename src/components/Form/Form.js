import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import axios from "axios";

class Form extends Component {
     constructor(props) {
          super(props);
          this.state = {
               imageUrl: "",
               productName: "",
               price: "",
               selectedProductId: null,
               addUpdateButtonValue: "Add to Inventory",
               redirect: false
          }
          this.handleInputChange = this.handleInputChange.bind(this);
          this.resetState = this.resetState.bind(this);
          this.postNewProduct = this.postNewProduct.bind(this);
          this.updateProduct = this.updateProduct.bind(this);
          this.getSingleProduct = this.getSingleProduct.bind(this);
          this.toggleRedirect = this.toggleRedirect.bind(this);
     }

     componentDidMount() {
          if (this.props.match.params.id) {
               this.getSingleProduct(this.props.match.params.id);
          }
     }

     componentDidUpdate(prevProps) {
          if (!(this.props.match.params.id) && (this.props !== prevProps)) {
               this.resetState();
          }
          // console.log(prevProps);
          // if (this.props.selectedProduct !== prevProps.selectedProduct) {
          //      this.setState({
          //           selectedProductId: this.props.selectedProduct.product_id,
          //           addUpdateButtonValue: "Save Changes"
          //      })
          // }
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
               price: ""
          })
     }

     toggleRedirect() {
          const redirectVal = this.state.redirect;
          this.setState({
               redirect: !redirectVal
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
               // this.props.getInventory();
               this.resetState();
               this.setState({
                    redirect: true
               })
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
               // this.props.getInventory();
               this.resetState();
               this.setState({
                    redirect: true
               })
          })
     }

     getSingleProduct(id) {
          axios.get(`/api/product/${id}`).then(response => {
               const singleProduct = response.data[0];
               console.log(singleProduct);
               this.setState({
                    productName: singleProduct.name,
                    price: singleProduct.price,
                    imageUrl: singleProduct.image_url
               })
          })
     }

     render() {
          const { redirect } = this.state;

          if (redirect) {
          return <Redirect to='/' />;
          }

          const { imageUrl, productName, price } = this.state;
          const addUpdateButton = (this.props.match.params.id) ?
               <button onClick={() => this.updateProduct(this.props.match.params.id)}>Save Changes</button>
                    :
               <button onClick={this.postNewProduct}>Add to Inventory</button>

          return (
               <div className="form-wrapper">
                    <div className="form">
                         <p>Image URL:</p>
                         <input name="imageUrl" onChange={this.handleInputChange} value={imageUrl}></input>
                         <p>Product Name:</p>
                         <input name="productName" onChange={this.handleInputChange} value={productName}></input>
                         <p>Price:</p>
                         <input name="price" onChange={this.handleInputChange} value={price}></input>
                         <div className="button-box">
                              <button onClick={this.toggleRedirect}>Cancel</button>
                              {addUpdateButton}
                         </div>
                    </div>
               </div>
          );
     }
}

export default Form;