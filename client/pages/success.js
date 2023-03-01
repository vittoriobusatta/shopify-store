import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { CLEAR_CART } from "redux/slice";

function sucess() {
  const router = useRouter();
  let sessionId = router.query.session_id;
  const [customerDetails, setCustomerDetails] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sessionId) {
      getSessionById(sessionId).then((session) => {
        setCustomerDetails(session.customer_details);
        session.payment_status === "paid" && dispatch(CLEAR_CART());
      });
    }
  }, [sessionId]);

  async function getSessionById(sessionId) {
    const response = await axios.get(
      `http://localhost:4242/session/${sessionId}`
    );
    return response.data;
  }

  

  return (
    <div>
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
    </div>
  );
}

export default sucess;
