import React, { useContext } from "react";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import mainpic from "../pictures/dogbrown.png";
import { ItemsContext } from "./_app";

const HomeStyled = styled.div`
  width: 100%;

  #container {
    border: blue 2px solid;
    width: 100%;
  }

  .main_background {
    background-color: #ebfaff;
    padding: 1em 0;
  }

  .main_container {
    width: 80%;
    display: flex;
    justify-content: flex-end;
    margin: auto;
    height: 20em;
  }

  .main_text {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    & h2 {
      font-size: xxx-large;
      font-weight: 300;
      font-style: italic;
    }
  }

  #filter_section {
    border: red 2px solid;
    width: 20%;
  }

  .shop_container {
    border: green 2px solid;
    flex: 1;
    height: 50em;
  }

  #grid_layout {
    margin: 1em auto;
    box-sizing: border-box;

    #card_container {
      border: 1px black solid;
    }

    #card {
      border: 1px blue solid;
      height: 20em;
    }

    .image_container {
      height: 75%;
    }
  }
`;

const Home = () => {
  const contextStorage = useContext(ItemsContext);

  return (
    <HomeStyled>
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
      <div id="container" className="p-d-flex p-flex-column p-flex-md-row">
        <div id="filter_section" className="p-d-inline-flex"></div>
        <div className="shop_container">
          <h2>Shop</h2>
          <div id="grid_layout" className="p-grid">
            {
              <ItemsContext.Consumer>
                {(contextStorage) =>
                  contextStorage.items.map((item) => (
                    <div
                      id="card_container"
                      className="p-sm-12 p-md-6 p-lg-3"
                      key={item.id}
                    >
                      <div id="card" className="p-d-flex p-flex-column">
                        <div className="image_container">
                          {/*<Image src={} alt="item image" layout="fill" />*/}
                        </div>
                        <div className="name">{item.name}</div>
                        <div className="valor">{`precio: ${item.valor}$`}</div>
                      </div>
                    </div>
                  ))
                }
              </ItemsContext.Consumer>
            }
          </div>
        </div>
      </div>
    </HomeStyled>
  );
};

export default Home;
