import React from "react";
import Layout from "../components/Layout";
import { useStateValue } from "../components/StateProvider";

const Orders = () => {
  const [{ orders }, dispatch] = useStateValue();

  console.log(orders.map((item) => item));

  return (
    <Layout pageTitle="My Orders">
      <div className="some">
        {orders.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </Layout>
  );
};

export default Orders;
