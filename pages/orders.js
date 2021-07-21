import React from "react";
import Layout from "../components/Layout";
import { useStateValue } from "../components/StateProvider";

const Orders = () => {
  const [{ orders }, dispatch] = useStateValue();

  console.log(orders);

  return (
    <Layout>
      <div>Orders</div>
    </Layout>
  );
};

export default Orders;
