import React from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useForm, Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import styled from "styled-components";
import Layout from "../components/Layout";
import { useStateValue } from "../components/StateProvider";
import { totalCartPrice, totalProductPrice } from "../utils";
import { dispatchBuy } from "../context/dispatchs";

const PurchaseContainer = styled.div`
  width: 90%;
  display: flex;
  margin: auto;
  height: 100%;
`;

const PurchaseForm = styled.div`
  flex: 1;
`;

const ItemList = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  margin-top: 2em;
  border: #c3b5b59e 1px solid;
  height: fit-content;

  @media screen and (max-width: 768px) {
    width: 80%;
    margin: auto;
  }
`;

const CartIcon = styled.i`
  font-size: xx-large;
`;

const Card = styled.div`
  width: 100%;
  padding: 2em;

  h5 {
    font-size: xx-large;
    margin-bottom: 1em;
  }

  .input_label {
    margin: 2em 0;
  }
`;

const Purchase = () => {
  const [{ cart, orders }, dispatch] = useStateValue();

  const defaultValues = {
    name: "",
    email: "",
    country: "",
    state: "",
    creditCard: "",
    accept: false,
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues });

  const onSubmit = () => {
    dispatchBuy(cart, dispatch);
    reset();
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  {
    /* Total cart products/amount column */
  }

  const totalPriceBodyTemplate = (data) => {
    return totalProductPrice(data, cart);
  };

  const itemListHeader = (
    <CartIcon className="pi pi-shopping-cart p-ml-2"></CartIcon>
  );

  const itemListFooter = <div>{`Total: ${totalCartPrice(cart)}`}</div>;

  console.log(orders);
  console.log(cart);

  return (
    <Layout pageTitle="Checkout">
      <div>
        <PurchaseContainer className="p-d-flex p-flex-column p-flex-md-row">
          <PurchaseForm>
            <div className="p-d-flex p-jc-center">
              <Card>
                <h5 className="p-text-left">Billing Address</h5>
                <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                  <div className="p-field input_label">
                    <span className="p-float-label">
                      <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Name is required." }}
                        render={({ field }) => (
                          <InputText id={field.name} {...field} autoFocus />
                        )}
                      />
                      <label htmlFor="name">Name*</label>
                    </span>
                    {getFormErrorMessage("name")}
                  </div>

                  <div className="p-field input_label">
                    <span className="p-float-label p-input-icon-right">
                      <i className="pi pi-envelope" />
                      <Controller
                        name="email"
                        control={control}
                        rules={{
                          required: "Email is required.",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message:
                              "Invalid email address. E.g. example@email.com",
                          },
                        }}
                        render={({ field }) => (
                          <InputText id={field.name} {...field} />
                        )}
                      />
                      <label htmlFor="email">Email*</label>
                    </span>
                    {getFormErrorMessage("email")}
                  </div>

                  <div className="p-field input_label">
                    <span className="p-float-label">
                      <Controller
                        name="country"
                        control={control}
                        rules={{ required: "Country is required." }}
                        render={({ field }) => (
                          <InputText id={field.name} {...field} autoFocus />
                        )}
                      />
                      <label htmlFor="country">Country*</label>
                    </span>
                    {getFormErrorMessage("country")}
                  </div>

                  <div className="p-field input_label">
                    <span className="p-float-label">
                      <Controller
                        name="state"
                        control={control}
                        rules={{ required: "State is required." }}
                        render={({ field }) => (
                          <InputText id={field.name} {...field} autoFocus />
                        )}
                      />
                      <label htmlFor="state">State*</label>
                    </span>
                    {getFormErrorMessage("state")}
                  </div>

                  <h5 className="p-text-left">Payment</h5>

                  <div className="p-field input_label">
                    <span className="p-float-label">
                      <Controller
                        name="creditCard"
                        control={control}
                        rules={{ required: "Credit card number is required." }}
                        render={({ field }) => (
                          <InputText id={field.name} {...field} autoFocus />
                        )}
                      />
                      <label htmlFor="creditCard">Credit card number*</label>
                    </span>
                    {getFormErrorMessage("creditCard")}
                  </div>

                  <Button type="submit" label="Submit" className="p-mt-2" />
                </form>
              </Card>
            </div>
          </PurchaseForm>
          <ItemList>
            <div className="card">
              <DataTable
                value={cart}
                header={itemListHeader}
                footer={itemListFooter}
              >
                <Column field="name" header="Name"></Column>
                <Column field="quantity" header="Quantity"></Column>
                <Column
                  field="price"
                  header="Sub-total"
                  body={totalPriceBodyTemplate}
                ></Column>
              </DataTable>
            </div>
          </ItemList>
        </PurchaseContainer>
      </div>
    </Layout>
  );
};

export default Purchase;
