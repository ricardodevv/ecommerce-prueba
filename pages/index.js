/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import styled from "styled-components";
import mainpic from "../src/pictures/dogbrown.png";
import Layout from "../components/Layout";
import { useStateValue } from "../components/StateProvider";
import { setProducts } from "../context/reducer";
import Filter from "../components/Filter";
import ProductsDisplay from "../components/ProductsDisplay";

const HomeStyled = styled.div`
  width: 100%;

  .container {
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
              <img src={mainpic} alt="brown dog" />
            </span>
          </div>
        </div>

        {/* Shop section */}

        {store.products.length < 1 ? null : (
          <div className="p-d-flex p-flex-column p-flex-md-row container">
            <Filter />
            <ProductsDisplay items={items} />
          </div>
        )}
      </HomeStyled>
    </Layout>
  );
};

export default Home;
