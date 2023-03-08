import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_CART, DEL_FROM_CART } from "redux/slice";
import { formatPrice } from "utils/helpers";

function cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const disableCart = cart.items.length === 0;

  const handleDeleteItem = (item) => {
    dispatch(DEL_FROM_CART(item));
  };

  const handleEmptyCart = () => {
    dispatch(CLEAR_CART());
  };

  const handleCheckout = async () => {
    const url = `/api/checkout/create`;

    if (disableCart) return;
    axios
      .post(url, {
        items: cart.items,
        cartId: cart.id,
      })
      .then((res) => {
        window.location.href = res.data.url;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section>
      <h1>Panier</h1>
      <h2>
        {cart.quantity} {cart.quantity > 1 ? "articles" : "article"}
      </h2>
      <h2>Total: {formatPrice(cart.chargeAmount)}</h2>
      <ul className="cart_list">
        {cart.items.map((products) => {
          const { title, handle } = products.item;
          const { image, price, quantityAvailable } =
            products.line.node.merchandise;
          const { quantity } = products.line.node;
          return (
            <li key={products.line.node.id}>
              <div
                style={{
                  flex: 1,
                }}
              >
                <Link href={`/products/${handle}`}>
                  <Image
                    src={image.url}
                    alt={image.altText}
                    width={100}
                    height={100}
                    priority
                  />
                </Link>
              </div>
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div>
                  <h3>{title}</h3>
                </div>
                <p>Quantity : {quantity}</p>
                <p>
                  {quantityAvailable <= 10
                    ? `Only ${quantityAvailable} left in stock`
                    : ""}
                </p>
                <p>{formatPrice(price.amount)}</p>
                <a
                  onClick={() => {
                    handleDeleteItem({
                      id: products.line.node.id,
                      cartId: cart.id,
                    });
                  }}
                >
                  Delete
                </a>
              </div>
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
      <button
        onClick={() => {
          handleCheckout();
        }}
        disabled={disableCart}
        className={disableCart ? "disabled" : ""}
      >
        Checkout
      </button>
    </section>
  );
}

export default cart;
