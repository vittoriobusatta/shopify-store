import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_CART, CREATE_CHECKOUT, DEL_FROM_CART } from "redux/slice";
import { formatPrice } from "utils/helpers";

const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST_KEY);

function cart() {
  const cart = useSelector((state) => state.cart);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const checkout = useSelector((state) => state.cart.checkout);

  const dispatch = useDispatch();

  const handleDeleteItem = (item) => {
    dispatch(DEL_FROM_CART(item));
  };

  const handleEmptyCart = () => {
    dispatch(CLEAR_CART());
  };

  const handleCheckout = () => {
    console.log("checkout", checkout);
  };

  console.log("cart", cart, "totalPrice", totalPrice, "checkout", checkout);

  // const handleCheckout = async () => {
  //   const lineItems = cart.items.map((item) => {
  //     return {
  //       id: item.id,
  //       variantQuantity: item.variantQuantity,
  //     };
  //   });

  //   for (const item of lineItems) {
  //     const checkout = await createCheckout(item.id, item.variantQuantity);
  //     // console.log(checkout.id);
  //     const session = await stripe.checkout.sessions
  //       .create({
  //         payment_method_types: ["card"],
  //         line_items: cart.items.map((item) => {
  //           return {
  //             price_data: {
  //               currency: "eur",
  //               product_data: {
  //                 name: item.title,
  //               },
  //               unit_amount: item.variantPrice * 100,
  //             },
  //             quantity: item.variantQuantity,
  //           };
  //         }),
  //         mode: "payment",
  //         success_url: "http://localhost:3000/success",
  //         cancel_url: "http://localhost:3000/cart",
  //         metadata: {
  //           checkout_id: checkout.id,
  //         },
  //       })

  //       .then((response) => {
  //         window.location.assign(response.url);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         alert("An error occurred while creating the session.");
  //       });
  //   }
  // };

  return (
    <div>
      <h1>Cart</h1>
      <h2>Total: {totalPrice}</h2>
      <ul>
        {cart.items && cart.items.length > 0 ? (
          cart.items.map((item) => {
            return (
              <li key={item.id}>
                <Link href={`/products/${item.handle}`}>
                  <Image
                    src={item.images}
                    alt={item.title}
                    width={100}
                    height={100}
                  />
                </Link>
                <h3>{item.title}</h3>
                <p>{formatPrice(item.variantPrice)}</p>
                <p>Quantity: {item.variantQuantity}</p>
                <button
                  onClick={() => {
                    handleDeleteItem(item);
                  }}
                >
                  Delete
                </button>
              </li>
            );
          })
        ) : (
          <p>Cart is empty</p>
        )}
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
      >
        Checkout
      </button>
    </div>
  );
}

export default cart;
