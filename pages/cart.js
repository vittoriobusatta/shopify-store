import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_CART, DEL_FROM_CART } from "redux/slice";
import { formatPrice } from "utils/helpers";

const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST_KEY);

function cart() {
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const handleDeleteItem = (item) => {
    dispatch(DEL_FROM_CART(item));
  };

  const handleEmptyCart = () => {
    dispatch(CLEAR_CART());
  };

  return (
    <div>
      <h1>Cart</h1>
      <h2>Total: {totalPrice}</h2>
      <ul>
        {cart.items.map((item) => {
          return (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.quantity}</p>
              <Link href={`/products/${item.handle}`}>
                {
                  console.log(item)
                }
                <Image
                  src={item.images.url}
                  alt={item.images.altText}
                  width={100}
                  height={100}
                />
              </Link>
              <p>{formatPrice(item.variantPrice)}</p>
              <button
                onClick={() => {
                  handleDeleteItem(item);
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      <button
        onClick={() => {
          handleEmptyCart();
        }}
      >
        Clear cart
      </button>
      <button>Checkout</button>
    </div>
  );
}

export default cart;
