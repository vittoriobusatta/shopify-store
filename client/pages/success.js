import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { CLEAR_CART } from "redux/slice";
import Spinner from "@/components/Spinner";

function sucess() {
  const router = useRouter();
  let sessionId = router.query.session_id;
  const [customerDetails, setCustomerDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const domain = process.env.NEXT_PUBLIC_SERVER_HOSTNAME;

  useEffect(() => {
    if (sessionId) {
      getSessionById(sessionId).then((session) => {
        setCustomerDetails(session.customer_details);
        session.payment_status === "paid" && dispatch(CLEAR_CART());
        setIsLoading(false);
      });
    }
  }, [sessionId]);

  async function getSessionById(sessionId) {
    const response = await axios.get(
      `${domain}/session/${sessionId}`
    );
    return response.data;
  }

  console.log(customerDetails);

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
        <a href="mailto:
        ">
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
