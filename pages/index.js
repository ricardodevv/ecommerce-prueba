import React, { useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import mainpic from "../src/pictures/dogbrown.png";
import Layout from "../components/Layout";
import { useStateValue } from "../components/StateProvider";
import { setProducts } from "../context/reducer";
import Filter from "../components/Filter";
import ProductsDisplay from "../components/ProductsDisplay";

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
      color: #333e48;
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
          <ProductsDisplay items={items} />
        </div>
      </HomeStyled>
    </Layout>
  );
};

export default Home;
