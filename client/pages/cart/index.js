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
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h1>Panier</h1>
        <h2>
          {cart.quantity} {cart.quantity > 1 ? "articles" : "article"} |{" "}
          {formatPrice(cart.chargeAmount)}
        </h2>
      </div>

      {cart.items.length === 0 ? (
        <p>Votre panier est vide</p>
      ) : (
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
                  <p className="orange_warn">
                    {quantityAvailable <= 5
                      ? "Plus que quelques exemplaires disponibles. Commandez vite."
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
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      viewBox="0 0 24 24"
                      role="img"
                      width="24px"
                      height="24px"
                      fill="none"
                    >
                      <path
                        stroke="currentColor"
                        strokeMiterlimit="10"
                        strokeWidth="1.5"
                        d="M14.25 7.5v12m-4.5-12v12M5.25 6v13.5c0 1.24 1.01 2.25 2.25 2.25h9c1.24 0 2.25-1.01 2.25-2.25V5.25h2.75m-2.75 0H21m-12-3h5.25c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H3"
                      ></path>
                    </svg>
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <div>
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
          Paiement
        </button>
      </div>
    </section>
  );
}

export default cart;
