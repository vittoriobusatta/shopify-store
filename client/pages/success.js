import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_CART } from "redux/slice";
import Spinner from "@/components/Spinner";
import { getCheckout } from "libs/shopify";

function sucess() {
  const router = useRouter();
  let sessionId = router.query.session_id;
  const [customerDetails, setCustomerDetails] = useState([]);
  const [sessionDetails, setSessionDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const domain = process.env.NEXT_PUBLIC_SERVER_HOSTNAME;
  // const domain = "http://localhost:4242";

  useEffect(() => {
    async function fetchDataSession() {
      getSessionById(sessionId)
        .then((session) => {
          setCustomerDetails(session.customer_details);
          if (session.payment_status === "paid") {
            dispatch(CLEAR_CART());
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (sessionId) {
      fetchDataSession();
    }
  }, [sessionId]);

  async function getSessionById(sessionId) {
    try {
      const response = await axios.get(`${domain}/session/${sessionId}`);
      return response.data;
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  }

  return (
    <>
      <Spinner isLoading={isLoading} />
      <h1>
        Thanks for your order
        {customerDetails && customerDetails.name
          ? `, ${customerDetails.name}`
          : ""}
      </h1>

      <p>
        We have received your order and we are processing it. You will receive
        an email to {customerDetails.email} with the details of your order.
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
    </>
  );
}

export default sucess;
