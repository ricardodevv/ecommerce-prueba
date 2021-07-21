import Image from "next/image";
import { Button } from "primereact/button";
import dogfood from "../../pictures/dog-food.jpg";
import styled from "styled-components";
import Layout from "../../components/Layout";
import { dispatchAddToCart } from "../../context/dispatchs";
import { useStateValue } from "../../components/StateProvider";
import { useRouter } from "next/router";

{
  /* Styles */
}

const ItemLayout = styled.div`
  margin-top: 5em;

  .item_layout_container {
    width: 90%;
    margin: auto;
  }

  #item_container {
    max-width: 1400px;
    padding: 1em;
  }

  .image_container {
    width: 35%;
    min-width: 20em;
    margin: 0 auto;
  }

  .item_details {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .name {
      font-size: max(2.5vw, 30px);
      margin-bottom: 0.5em;
    }

    .description {
      text-align: justify;
    }

    .buttons_container {
      display: flex;
      align-items: center;
    }

    .buy_button {
      margin: 0 2em;
      border: none;

      &:hover {
        background-color: gold;
        border: none;
        color: black;
      }
    }

    .cart_button {
      width: 3em;
      height: 3em;

      span {
        font-size: x-large;
      }
    }

    .price {
      color: #00b700;
      font-size: xx-large;
      font-weight: 400;
    }
  }

  @media screen and (max-width: 768px) {
    .details_container {
      margin: 1em 0 2em 0;
    }
  }

  @media screen and (min-width: 768px) {
    .buttons_container {
      justify-content: flex-end;
    }

    .item_details {
      margin-left: 2em;
    }

    .details_container {
      margin-bottom: 1em;
    }
  }
`;

export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:3001/items");
  const data = await res.json();

  const paths = data.map((el) => ({
    params: { id: el.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const res = await fetch(`http://localhost:3001/items/${params.id}`);
  const item = await res.json();

  return {
    props: { item },
  };
};

const Item = ({ item }) => {
  const [store, dispatch] = useStateValue();
  const router = useRouter();

  console.log(item);

  const handleBuyButton = (e) => {
    e.preventDefault();
    dispatchAddToCart(item, dispatch);
    router.push("/purchase");
  };

  return (
    <Layout pageTitle={item.name}>
      <ItemLayout>
        <div className="item_layout_container">
          {item !== undefined && (
            <div
              id="item_container"
              className="p-d-flex p-flex-column p-flex-md-row"
            >
              <div className="image_container">
                <Image src={dogfood} alt="item picture" />
              </div>
              <div className="item_details">
                <div className="details_container">
                  <h3 className="name">{item.name}</h3>
                  <p className="description">{item.description}</p>
                </div>
                <div className="buttons_container">
                  <span className="price">{`${item.price}$`}</span>
                  <Button
                    className="p-button-rounded buy_button"
                    label="Buy"
                    onClick={(e) => handleBuyButton(e)}
                  ></Button>
                  <Button
                    className="p-button-rounded cart_button"
                    icon="pi pi-shopping-cart"
                    onClick={() => dispatchAddToCart(item, dispatch)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </ItemLayout>
    </Layout>
  );
};

export default Item;
