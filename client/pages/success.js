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
      data,
    },
  };
}

function Success({ data }) {
  const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [isOrderCreated, setIsOrderCreated] = useState(() => {
    const savedValue = localStorage.getItem("isOrderCreated");
    return savedValue !== null ? JSON.parse(savedValue) : false;
  });
  const dispatch = useDispatch();
  const { name, email, adress, phone } = data.customer_details;

  let url = "/api/order/create";

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
    if (data.payment_status === "paid" && data.metadata.cartId) {
      dispatch(CLEAR_CART());
      getCart(data.metadata.cartId)
        .then((res) => {
          setCartData(res.lines.edges);
        })
        .catch((err) => {
          console.log("err", err);
        });
      setOrderData(data);
      axios
        .post(url, {
          orderData,
          cartData,
        })
        .then((res) => {
          console.log("res", res.data.message);
          if (res.data.isCreate === true) {
            setIsOrderCreated(true);
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }, [data]);

  useEffect(() => {
    localStorage.setItem("isOrderCreated", JSON.stringify(isOrderCreated));
  }, [isOrderCreated]);

  console.log(isOrderCreated);

  return (
    <section className="success">
      <Spinner isLoading={isLoading} />
      <div className="success__content">
        <h1>
          Thanks for your order
          {data && name ? `, ${name}` : ""}
        </h1>

        <p>
          We have received your order and we are processing it. You will receive
          an email to {email} with the details of your order.
        </p>

        <p>
          If you have any questions, please contact us at{" "}
          <a
            href="mailto:
        "
          >
            .
          </a>
        </p>

        <p>
          <a href="/">Back to home</a>
        </p>
      </div>
    </section>
  );
}

export default Success;
