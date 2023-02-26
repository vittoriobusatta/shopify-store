import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

function sucess() {
  const router = useRouter();
  let sessionId = router.query.session_id;
  const [customerDetails, setCustomerDetails] = useState([]);

  async function getSessionById(sessionId) {
    const response = await axios.get(
      `http://localhost:4242/session/${sessionId}`
    );
    return response.data;
  }

  useEffect(() => {
    if (sessionId) {
      getSessionById(sessionId).then((session) => {
        setCustomerDetails(session.customer_details);
      });
    }
  }, [sessionId]);

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
        an email to {customerDetails.email}
        with the details of your order.
      </p>
    </div>
  );
}

export default sucess;
