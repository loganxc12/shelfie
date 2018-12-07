import React from "react";
export default function Product(props) {
    const { item, deleteProduct, setSelected } = props;
    return (
        <div>
            <img src={item.image}></img>
            <h1>{item.name}</h1>
            <h3>{item.price}</h3>
            <button onClick={deleteProduct}>Delete</button>
            <button onClick={setSelected}>Edit</button>
        </div>
    )
}