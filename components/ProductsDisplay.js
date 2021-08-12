import { dispatchAddToCart } from "../context/dispatchs";
import food from "../src/pictures/dog-food.jpg";
import { Button } from "primereact/button";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { useStateValue } from "./StateProvider";

const ShopContainer = styled.div`
  flex: 1;
  margin: 2em;

  .shop_title {
    font-size: xx-large;
    font-weight: 400;
    margin-bottom: 1em;
    color: #333e48;
  }

  .grid_layout {
    box-sizing: border-box;

    .card_container {
      padding: 0;
    }

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
  padding: 0.5rem;
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

const ProductsDisplay = ({ items }) => {
  const [store, dispatch] = useStateValue();

  return (
    <ShopContainer>
      <h2 className="shop_title">Shop</h2>
      <div className="p-grid grid_layout">
        {items.map((item) => {
          return (
            <div
              key={item.id}
              className="p-col-12 p-md-4 p-lg-3 card_container"
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
    </ShopContainer>
  );
};

export default ProductsDisplay;
