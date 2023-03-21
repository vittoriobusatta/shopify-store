import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CLEAR_CART } from "redux/slice";
import Spinner from "@/components/Spinner";
import { getCart } from "libs/shopify/storefront";

// const domain = process.env.NEXT_PUBLIC_SERVER_HOSTNAME;
const domain = "http://localhost:3000";

export async function getServerSideProps(context) {
  const { session_id } = context.query;
  const res = await axios.get(
    `${domain}/api/checkout/success?sessionId=${session_id}`
  );
  const data = await res.data;
  return {
    props: {
      sessionData: data,
    },
  };
}

function Success({ sessionData }) {
  const [isLoading, setIsLoading] = useState(true);
  const [cartData, setCartData] = useState([]);
  const dispatch = useDispatch();
  const { name, email } = sessionData.customer_details;

  // const [isOrderCreated, setIsOrderCreated] = useState(() => {
  //   const savedValue = localStorage.getItem("isOrderCreated");
  //   return savedValue !== null ? JSON.parse(savedValue) : false;
  // });

  let url = "/api/order/create";


  const handleOrderCreation = () => {
    if (sessionData.payment_status === "paid" && sessionData.metadata.cartId) {
      dispatch(CLEAR_CART());
      getCart(sessionData.metadata.cartId)
        .then((res) => {
          setCartData(res.lines.edges);
          return axios.post(url, {
            orderData: sessionData,
            cartData,
          });
        })
        .then((res) => {
          console.log(res.data.message);
        })
        .catch((err) => {
          console.log("Error creating order:", err);
        });
    }
  };



  useEffect(() => {
    if (sessionData) {
      setIsLoading(false);
    }
  }, [sessionData]);


  // console.log(sessionData);

  // useEffect(() => {
  //   localStorage.setItem("isOrderCreated", JSON.stringify(isOrderCreated));
  // }, [isOrderCreated]);

  return (
    <section className="success">
      <Spinner isLoading={isLoading} />
      <div className="success__content">
        <h1>Thanks for your order{sessionData && name ? `, ${name}` : ""}</h1>
        <p>
          We have received your order and we are processing it. You will receive
          an email to {email} with the details of your order.
        </p>
        <p>
          If you have any questions, please contact us at{" "}
          <a href="mailto:">email@example.com</a>.
        </p>
        <p>
          <a href="/">Back to home</a>
        </p>
        <button onClick={handleOrderCreation}>Create order</button>
      </div>
    </section>
  );
}

export default Success;
