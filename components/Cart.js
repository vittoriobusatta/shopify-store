import React from "react";
import { emptyCart, removeFromCart, updateQuantity } from "utils/slice";
import { useSelector, useDispatch } from "react-redux";
import { formatPrice } from "pages/api/storefront";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleEmptyCart = () => {
    dispatch(emptyCart());
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const totalPrice = cart.items.reduce((acc, item) => {
    return acc + item.priceRange.minVariantPrice.amount * item.quantity;
  }, 0);

  return (
    <>
      {cart.items.length > 0 ? (
        <section className="cart">
          <h1>
            <p>Panier</p>
            <p>
              {cart.items.reduce((acc, item) => {
                return acc + item.quantity;
              }, 0)}{" "}
              {cart.items.reduce((acc, item) => {
                item.quantity > 1 ? (acc = "articles") : (acc = "article");
                return acc;
              }, 0)}
            </p>
            <p>| {formatPrice(totalPrice)}</p>
          </h1>
          {cart.items.map((item) => {
            return (
              <div className="cart__row" key={item.id}>
                <div>
                  <img
                    src={item.images.edges[0].node.url}
                    alt={item.images.edges[0].node.altText}
                    height="80"
                    width="80"
                  />
                </div>
                <div>
                  <h2>{item.title}</h2>
                  <div>
                    <p>Quantity: </p>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        dispatch(
                          updateQuantity({
                            id: item.id,
                            quantity: Math.max(0, parseInt(e.target.value)),
                          })
                        );
                      }}
                      min="0"
                    />
                  </div>
                  <svg
                    onClick={() => handleRemoveFromCart(item.id)}
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
                </div>
              </div>
            );
          })}
          <button onClick={handleEmptyCart}>Vider le panier</button>
        </section>
      ) : null}
    </>
  );
}

export default Cart;
