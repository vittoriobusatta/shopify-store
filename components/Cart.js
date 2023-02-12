import React, { useEffect } from "react";
import { emptyCart, removeFromCart } from "utils/slice";
import { useSelector, useDispatch } from "react-redux";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleEmptyCart = () => {
    dispatch(emptyCart());
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart({ id }));
  };

  return (
    <section className="cart">
      {cart.items.map((item) => {
        return (
          <div key={item.id}>
            <div>
              <h1>{item.title}</h1>
              <p>{item.priceRange.minVariantPrice.amount}</p>
              <img
                src={item.images.edges[0].node.url}
                alt={item.images.edges[0].node.altText}
                height="80"
                width="80"
              />
            </div>
            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
          </div>
        );
      })}
      <button onClick={handleEmptyCart}>Empty Cart</button>
    </section>
  );
}

export default Cart;
