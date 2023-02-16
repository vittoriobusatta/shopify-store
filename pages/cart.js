import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementQuantity, incrementQuantity } from "redux/slice";

function cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleIncrement = (itemId) => {
    dispatch(incrementQuantity(itemId));
  };

  const handleDecrement = (itemId) => {
    dispatch(decrementQuantity(itemId));
  };

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cart.items.map((item) => (
          <li key={item.id}>
            <p>
              {item.title} - {item.quantity}
            </p>
            <Image
              src={item.images.edges[0].node.url}
              alt={item.images.edges[0].node.altText}
              width={80}
              height={80}
              priority
            />
            <button onClick={() => handleIncrement(item.id)}>+</button>
            <button onClick={() => handleDecrement(item.id)}>-</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default cart;
