import React, { useContext } from "react";
import { Button } from "primereact/button";
import { ItemsContext, removeOneItem } from "./_app";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { removeItem } from "./_app";
import styled from "styled-components";
import Layout from "../components/Layout";

const MyCartStyled = styled.div`
  height: 40em;

  .table_header {
    font-size: xx-large;

    .pi-shopping-cart {
      font-size: smaller;
    }
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
  const { store, dispatch } = useContext(ItemsContext);
  const { cart } = store;

  const formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const priceBodyTemplate = (data) => {
    return formatCurrency(data.price);
  };

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

  const priceReducer = (cartArray) => {
    const totalPrice = cartArray.reduce(
      (accumulator, currentValue) =>
        (accumulator += currentValue.quantity * currentValue.price),
      0
    );
    return formatCurrency(totalPrice);
  };

  const totalCartPrice = (data) => {
    return priceReducer(data);
  };

  const totalPriceBodyTemplate = (data) => {
    const findItem = cart.filter((item) => item.id === data.id);
    const totalItemPrice = findItem && priceReducer(findItem);
    return findItem ? formatCurrency(totalItemPrice) : "";
  };

  const tableHeader = (
    <div className="table_header">
      <h3>
        My cart<i className="pi pi-shopping-cart p-ml-2"></i>
      </h3>
    </div>
  );

  const tableFooter = (
    <div>
      <div>{`Total products: ${cart ? cart.length : 0}`}</div>
      <div>{`Total: ${totalCartPrice(cart)}`}</div>
    </div>
  );

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
          <div></div>
        </div>
      </MyCartStyled>
    </Layout>
  );
};

export default MyCart;
