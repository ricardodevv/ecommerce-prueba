import { useContext } from "react";
import { useRouter } from "next/router";
import { addToCart, ItemsContext } from "../../_app";
import Image from "next/image";
import dogfood from "../../../pictures/dog-food.jpg";
import styled from "styled-components";

const ItemLayout = styled.div`
  .item_layout_container {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    width: 90%;
    margin: auto;
  }

  #item_container {
    max-width: 1400px;
    margin: 4em auto;
    padding: 1em;
  }

  .image_container {
    width: 35%;
    min-width: 20em;
    margin: 0 auto;
    padding-right: 1em;

    @media screen and (max-width: 768px) {
      padding: 0;
    }
  }

  .item_details {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .details_container {
      margin: 0.5em 0;
    }

    .name {
      font-size: max(2.5vw, 30px);
      margin-bottom: 0.5em;
    }

    .buy_container {
      display: flex;
      align-items: center;

      @media screen and (min-width: 768px) {
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

  const { store, dispatch } = useContext(ItemsContext);
  const { items } = store;

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
    dispatch(addToCart(itemToShow, 1));
  };

  return (
    <ItemLayout>
      <div className="item_layout_container">
        {itemToShow !== undefined && (
          <div
            id="item_container"
            className="p-d-flex p-flex-column p-flex-md-row"
          >
            <div className="image_container">
              <Image src={dogfood} alt="item picture" />
            </div>
            <div className="item_details">
              <div className="details_container">
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
      </div>
    </ItemLayout>
  );
};

export default Item;
