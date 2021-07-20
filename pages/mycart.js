import React from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import styled from "styled-components";
import Layout from "../components/Layout";
import { useStateValue } from "../components/StateProvider";
import { removeOneItem, removeItem } from "../context/reducer";
import Link from "next/link";
import {
  formatCurrency,
  priceReducer,
  productsReducer,
  totalCartPrice,
  totalProductPrice,
} from "../utils";

{
  /* Styles  */
}

const MyCartStyled = styled.div`
  height: 40em;

  .table_header {
    font-size: xx-large;

    .pi-shopping-cart {
      font-size: smaller;
    }
  }

  .checkout_button {
    background-color: gold;
    color: black;
    margin: 1em;
  }
`;

const Price = styled.span`
  div {
    width: fit-content;
    padding: 0.2em;
  }

  .instock {
    background-color: green;
    color: white;
  }

  .lowstock {
    background-color: yellow;
  }

  .outofstock {
    background-color: red;
    color: white;
  }
`;

const MyCart = () => {
  const [{ cart }, dispatch] = useStateValue();

  {
    /* Price column */
  }

  const priceBodyTemplate = (data) => {
    return formatCurrency(data.price);
  };

  {
    /*  Stock column */
  }

  const statusBodyTemplate = (data) => {
    let content;
    let style;
    const stock = () => {
      if (data.inventory > 10) {
        return { content: "IN STOCK", style: "instock" };
      } else if (data.inventory > 0 && data.inventory < 10) {
        return { content: "LOW STOCK", style: "lowstock" };
      } else if (data.inventory === 0) {
        return { content: "OUT OF STOCK", style: "outofstock" };
      }
    };
    const status = stock(content, style);
    return (
      <Price>
        <div className={status.style}>{status.content}</div>
      </Price>
    );
  };

  {
    /* Delete Buttons column */
  }

  const deleteBodyTemplate = (data) => {
    return (
      <div>
        <Button
          icon="pi pi-minus-circle"
          className="p-button-rounded p-button-danger p-m-1"
          onClick={() => dispatch(removeOneItem(data))}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-m-1"
          onClick={() => dispatch(removeItem(data))}
        />
      </div>
    );
  };

  {
    /* Total cart products/amount column */
  }

  const totalPriceBodyTemplate = (data) => {
    return totalProductPrice(data, cart);
  };

  {
    /* Table header */
  }

  const tableHeader = (
    <div className="table_header">
      <h3>
        My cart<i className="pi pi-shopping-cart p-ml-2"></i>
      </h3>
    </div>
  );

  {
    /* Table footer */
  }

  const tableFooter = (
    <div>
      <div>{`Total products: ${productsReducer(cart)}`}</div>
      <div>{`Total: ${totalCartPrice(cart)}`}</div>
    </div>
  );

  console.log(cart.length);

  return (
    <Layout pageTitle="My cart">
      <MyCartStyled>
        <div className="card">
          <DataTable value={cart} header={tableHeader} footer={tableFooter}>
            <Column field="name" header="Name"></Column>
            <Column field="quantity" header="Quantity"></Column>
            <Column
              field="price"
              header="Price"
              body={priceBodyTemplate}
            ></Column>
            <Column
              field="inventory"
              header="Stock"
              body={statusBodyTemplate}
            ></Column>
            <Column
              field="id"
              header="Total price"
              body={totalPriceBodyTemplate}
            ></Column>
            <Column body={deleteBodyTemplate}></Column>
          </DataTable>
          <div>
            {cart.length > 0 && (
              <Link href="/purchase" passHref>
                <Button className="checkout_button" label="Go to checkout" />
              </Link>
            )}
          </div>
        </div>
      </MyCartStyled>
    </Layout>
  );
};

export default MyCart;
