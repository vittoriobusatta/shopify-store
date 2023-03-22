import { DeleteIcon } from "@/components/Vector";
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
    <section className="cart">
      <div className="cart__head">
        <h1>Panier</h1>
        <h2>
          {cart.quantity} {cart.quantity > 1 ? "articles" : "article"} |{" "}
          {formatPrice(cart.chargeAmount)}
        </h2>
      </div>

      {cart.items.length === 0 ? (
        <p>Votre panier est vide</p>
      ) : (
        <ul className="cart__list">
          {cart.items.map((products) => {
            const { title, handle } = products.item;
            const { image, price, quantityAvailable } =
              products.line.node.merchandise;
            const { quantity } = products.line.node;
            return (
              <li className="cart__item" key={products.line.node.id}>
                <div className="cart__item__picture">
                  <Link href={`/products/${handle}`}>
                    <div className="placeholder" />
                    <Image
                      src={image.url}
                      alt={image.altText}
                      width={100}
                      height={100}
                      priority
                      className="placeholder__image"
                    />
                  </Link>
                </div>
                <div className="cart__item__info">
                  <h3>{title}</h3>
                  <p>Quantité : {quantity}</p>
                  <p className="orange_warn">
                    {quantityAvailable <= 5
                      ? "Plus que quelques exemplaires disponibles. Commandez vite."
                      : ""}
                  </p>
                  <p>{formatPrice(price.amount * quantity)}</p>
                  <a
                    onClick={() => {
                      handleDeleteItem({
                        id: products.line.node.id,
                        cartId: cart.id,
                      });
                    }}
                  >
                    <DeleteIcon />
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <div className="cart__button">
        <button
          onClick={() => {
            handleEmptyCart();
          }}
          className="cart__button__clear"
        >
          Clear cart
        </button>
        <button
          onClick={() => {
            handleCheckout();
          }}
          disabled={disableCart}
          className={disableCart ? "cart__button__checkout disabled" : "cart__button__checkout"}
        >
          Paiement
        </button>
      </div>
    </section>
  );
}

export default cart;
