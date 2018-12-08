import React from "react";
import { NavLink } from "react-router-dom";
export default function Product(props) {
    const { item, deleteProduct, setSelected } = props;
    return (
        <div className="product-wrapper">
            <img src={item.image_url}></img>
            <h1>{item.name}</h1>
            <h3>${item.price}</h3>
            <button onClick={deleteProduct}>Delete</button>
            <NavLink to={`/edit/${item.product_id}`}><button>Edit</button></NavLink>
        </div>
    )
}