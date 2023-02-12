import React, { useEffect, useState } from "react";
import { emptyCart, removeFromCart } from "utils/slice";
import { useSelector, useDispatch } from "react-redux";
import { formatPrice } from "pages/api/storefront";

function Cart({ quantity, setQuantity }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleEmptyCart = () => {
    dispatch(emptyCart());
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleInputChange = (e) => {
    const newQuantity = e.target.value;
    setQuantity(newQuantity);
  };

  return (
    <section className="cart">
      {cart.items.map((item) => {
        return (
          <div className="cart__row" key={item.id}>
            <div>
              <h1>{item.title}</h1>
              <p>{formatPrice(item.priceRange.minVariantPrice.amount)}</p>
              <img
                src={item.images.edges[0].node.url}
                alt={item.images.edges[0].node.altText}
                height="80"
                width="80"
              />
            </div>
            <div>
              <p>Quantity: </p>
              <input
                type="number"
                value={quantity}
                onChange={handleInputChange}
              />
              <button onClick={() => handleRemoveFromCart(item.id)}>
                Remove
              </button>
            </div>
          </div>
        );
      })}
      <button onClick={handleEmptyCart}>Clear Cart</button>
    </section>
  );
}

export default Cart;
