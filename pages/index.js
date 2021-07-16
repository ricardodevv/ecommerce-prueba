import React, { useContext } from "react";
import Image from "next/image";
import styled from "styled-components";
import mainpic from "../pictures/dogbrown.png";
import food from "../pictures/dog-food.jpg";
import { ItemsContext } from "./_app";
import Link from "next/link";

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
  }

  #grid_layout {
    margin: 1em auto;
    box-sizing: border-box;

    @media screen and (max-width: 768px) {
      justify-content: center;
    }

    #card_container {
      transition: 0.3s;
      max-width: 17em;
      min-width: 15em;

      &:hover {
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      }
    }

    .image_container {
      margin: auto;
    }

    .card_details {
      padding: 0.5rem;
      display: flex;
      flex-direction: column;
      height: 100%;

      .name,
      .price {
        flex: 1;
      }

      .price {
        color: #00b700;
        font-size: x-large;
      }
    }
  }
`;

const Home = () => {
  const { store } = useContext(ItemsContext);
  const { items } = store;

  return (
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
        <div id="filter_section" className="p-d-inline-flex"></div>
        <div className="shop_container">
          <h2>Shop</h2>
          <div id="grid_layout" className="p-grid">
            {items.map((item) => (
              <Link
                href="/items/[id]/[item]"
                as={`/items/${item.id}/${item.name}`}
                key={item.id}
              >
                <div id="card_container" className="p-col-12 p-md-6 p-lg-3">
                  <div id="card" className="p-d-flex p-flex-column">
                    <div className="image_container">
                      <Image src={food} alt="item image" />
                    </div>
                    <div className="card_details">
                      <h3 className="name">{item.name}</h3>
                      <h3 className="price">{`${item.price}$`}</h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </HomeStyled>
  );
};

export default Home;
