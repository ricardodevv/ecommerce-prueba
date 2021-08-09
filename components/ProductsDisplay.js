import { dispatchAddToCart } from "../context/dispatchs";
import food from "../src/pictures/dog-food.jpg";
import { Button } from "primereact/button";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { useStateValue } from "./StateProvider";

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

const ProductsDisplay = ({ items }) => {
  const [store, dispatch] = useStateValue();

  return (
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
  );
};

export default ProductsDisplay;
