import React, { useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import mainpic from "../src/pictures/dogbrown.png";
import food from "../src/pictures/dog-food.jpg";
import { Button } from "primereact/button";
import Link from "next/link";
import Layout from "../components/Layout";
import { dispatchAddToCart } from "../context/dispatchs";
import { useStateValue } from "../components/StateProvider";
import { setProducts } from "../context/reducer";
import Filter from "../components/filter";

const HomeStyled = styled.div`
  width: 100%;

  #container {
    width: 100%;
    font-family: Roboto;
  }

  .main_background {
    background-color: #ebfaff;
    padding: 1em 0;
    height: 30rem;
  }

  .main_container {
    width: 80%;
    display: flex;
    justify-content: flex-end;
    margin: auto;
  }

  .main_text {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    h2 {
      font-size: xxx-large;
      font-weight: 300;
      font-style: italic;
    }
  }

  #filter_section {
    width: 20%;
  }

  .shop_container {
    flex: 1;
    margin: 2em;

    .shop_title {
      font-size: xx-large;
      font-weight: 400;
      margin-bottom: 1em;
    }
  }

  #grid_layout {
    box-sizing: border-box;

    .image_container {
      cursor: pointer;
    }

    .card_details {
      padding: 0.5rem;
      display: flex;
      flex-direction: column;

      .name,
      .price {
        flex: 1;
        font-size: initial;
      }

      .name {
        font-weight: normal;
      }

      .price {
        color: #00b700;
        font-size: x-large;
      }

      .cart_button {
        background-color: white;
        color: black;
        border: none;

        .p-button-icon {
          font-size: x-large;
        }
      }
    }
  }
`;

const Card = styled.div`
  transition: 0.3s;
  padding: 0;
  font-family: Roboto;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  @media screen and (max-width: 768px) {
    max-width: 60%;
    margin: auto;

    .image {
      margin: auto;
    }
  }
`;

export const getStaticProps = async () => {
  const res = await fetch(`http://localhost:3001/items`);
  const items = await res.json();

  return {
    props: { items },
  };
};

const Home = ({ items }) => {
  const [store, dispatch] = useStateValue();

  useEffect(() => {
    dispatch(setProducts(items));
  }, []);

  console.log(store);
  return (
    <Layout pageTitle="Home">
      <HomeStyled>
        {/* Main home section */}

        <div className="main_background">
          <div className="main_container">
            <span className="main_text">
              <h2>We have what your buddie needs</h2>
            </span>
            <span className="p-d-none p-d-md-block">
              <Image
                src={mainpic}
                alt="brown dog"
                height={300}
                width={300}
              ></Image>
            </span>
          </div>
        </div>

        {/* Shop section */}

        <div id="container" className="p-d-flex p-flex-column p-flex-md-row">
          <Filter id="filter_section" className="p-d-inline-flex"></Filter>
          <div className="shop_container">
            <h2 className="shop_title">Shop</h2>
            <div id="grid_layout" className="p-grid">
              {items.map((item) => {
                return (
                  <div
                    key={item.id}
                    id="card_container"
                    className="p-col-12 p-md-4 p-lg-3"
                  >
                    <Card>
                      <Link href={`/items/${item.id}`} passHref>
                        <div className="image_container">
                          <Image
                            src={food}
                            alt="item image"
                            height={600}
                            width={600}
                            className="image"
                          />
                        </div>
                      </Link>
                      <div className="card_details">
                        <h3 className="name">{item.name}</h3>
                        <div className="p-d-flex p-mt-2">
                          <span className="price">{`${item.price}$`}</span>
                          <Button
                            className="p-button-rounded cart_button"
                            icon="pi pi-shopping-cart"
                            onClick={() => dispatchAddToCart(item, dispatch)}
                          />
                        </div>
                      </div>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </HomeStyled>
    </Layout>
  );
};

export default Home;
