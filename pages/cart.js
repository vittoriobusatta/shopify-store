import { createCheckout } from "libs/shopify";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, decrementQuantity, incrementQuantity } from "redux/slice";
import { formatPrice } from "utils/helpers";
const stripe = require("stripe")(
  "sk_test_51MatPNAqhd3qwoqxLzJyRAOtU2HUmxaDsIYYbbBJnEm0AyHYOvTunDBlrBQfWaHK2DUdAqqDCFUMgaZbU1abaSBL00ysDA5FWH"
);

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

  let cartTotal = 0;
  cart.items.map((item) => {
    cartTotal += item?.variantPrice * item?.variantQuantity;
  });

  const handleCheckout = async () => {
    const lineItems = cart.items.map((item) => {
      return {
        id: item.id,
        variantQuantity: item.variantQuantity,
      };
    });

    for (const item of lineItems) {
      const checkout = await createCheckout(item.id, item.variantQuantity);

      const session = await stripe.checkout.sessions
        .create({
          payment_method_types: ["card"],
          line_items: cart.items.map((item) => {
            return {
              price_data: {
                currency: "eur",
                product_data: {
                  name: item.title,
                },
                unit_amount: item.variantPrice * 100,
              },
              quantity: item.variantQuantity,
            };
          }),
          mode: "payment",
          success_url: "http://localhost:3000/success",
          cancel_url: "http://localhost:3000/cart",
          metadata: {
            checkout_id: checkout.id,
          },
        })

        .then((response) => {
          window.location.assign(response.url);
        })
        .catch((error) => {
          console.log(error);
          alert("An error occurred while creating the session.");
        });
    }
  };

  //   const createsession = async () => {
  //     const checkout = await createCheckout(item.id, item.quantity);

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
  //         cancel_url: "http://localhost:3000/cancel",
  //         metadata: {
  //           checkout_id: checkout.id,
  //         },
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         alert("An error occurred while creating the session.");
  //       });

  //     window.location.assign(session.url);
  //   };

  return (
    <div>
      <h1>Cart</h1>
      <h2>Total: {cartTotal}</h2>
      <ul>
        {cart.items.map((item) => (
          <li key={item.id}>
            <Image src={item.images} alt={item.title} width={80} height={80} />
            <div>
              <h3>{item.title}</h3>
              <p>{formatPrice(item.variantPrice)}</p>
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
