import { useContext } from "react";
import { useRouter } from "next/router";
import { ItemsContext } from "../../_app";
import Image from "next/image";
import dogfood from "../../../pictures/dog-food.jpg";
import styled from "styled-components";

const ItemLayout = styled.div`
  #item_container {
    max-width: 1400px;
    width: 90%;
    margin: 8em auto;
    height: 35em;
  }

  .image_container {
    width: 35%;
    min-width: 25em;
    margin: 0 auto;
    padding-right: 1em;

    @media screen and (max-width: 750px) {
      padding: 0;
    }
  }

  .details_container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .name {
      font-size: max(2.5vw, 30px);
    }

    .buy_container {
      display: flex;
      align-items: center;

      @media screen and (min-width: 750px) {
        justify-content: flex-end;
      }

      .buy_button,
      .addToCart_button {
        margin: 0 2em;
      }

      .price {
        color: #00b700;
        font-size: xxx-large;
        font-weight: 400;
      }
    }
  }
`;

const Item = () => {
  const router = useRouter();
  const { id } = router.query;

  {
    /* Setting react context */
  }

  const contextStorage = useContext(ItemsContext);
  const { items, cartItems, setcartItems } = contextStorage;

  {
    /* Finding the item to show with the id variable from the router.query */
  }

  const findItem = (id) => items.find((item) => item.id.toString() === id);
  const itemToShow = findItem(id);

  {
    /* Add to cart handler */
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    // Añadir itemsReducer para manejar el carro de compras
    setcartItems(cartItems.concat(itemToCart));
  };

  console.log(cartItems);

  return (
    <ItemLayout>
      {itemToShow !== undefined && (
        <div
          id="item_container"
          className="p-d-flex p-flex-column p-flex-md-row"
        >
          <div className="image_container">
            <Image src={dogfood} alt="item picture" />
          </div>
          <div className="details_container">
            <div>
              <h3 className="name">{itemToShow.name}</h3>
              <p className="description">{itemToShow.description}</p>
            </div>
            <div className="buy_container">
              <span className="price">{`${itemToShow.price}$`}</span>
              <span className="buy_button">Buy</span>
              <span
                className="addToCart_button"
                onClick={(e) => handleAddToCart(e)}
              >
                Add to cart
              </span>
            </div>
          </div>
        </div>
      )}
    </ItemLayout>
  );
};

export default Item;
