import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, decrementQuantity, incrementQuantity } from "redux/slice";

function cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleIncrement = (item) => {
    dispatch(incrementQuantity(item));
  };

  const handleDecrement = (item) => {
    dispatch(decrementQuantity(item));
  };

  const emptyCart = () => {
    dispatch(clearCart());
  };

  console.log(cart.items);


  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cart.items.map((item) => (
          <li key={item.id}>
            <Image
                src={item.images}
                alt={item.title}
                width={80}
                height={80}
                />
            <div>
              <h3>{item.title}</h3>
              <p>{item.variantPrice}</p>
              <p>{item.variantQuantity}</p>
              <button onClick={() => handleIncrement(item)}>+</button>
              <button onClick={() => handleDecrement(item)}>-</button>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          emptyCart();
        }}
      >
        Clear cart
      </button>
    </div>
  );
}

export default cart;
