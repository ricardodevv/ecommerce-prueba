import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { InputText } from "primereact/inputtext";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import styled from "styled-components";
import itemService from "../services/items";

const HeaderStyled = styled.div`
  box-shadow: rgb(0 0 0 / 24%) 0px 0px 5px;
  position: fixed;
  z-index: 999;
  background-color: white;
  width: 100%;
  top: 0;

  .container {
    display: flex;
    width: 80%;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    padding: 0.3em;
  }

  .logo {
    min-width: 4em;
  }

  #Sidebar-menu-button {
    background-color: black;
    width: 3rem;
    border-radius: 50%;
    border: none;
  }
`;

const SearchBar = styled.span`
  width: inherit;
  margin: 0 2em;
  position: relative;

  i {
    padding: 0 4px;
  }

  input {
    width: 100%;
    border-radius: 2em;
    height: 2em;
  }

  .p-inputtext:focus {
    box-shadow: none;
  }

  .search_list_container {
    position: absolute;
    background-color: white;
    width: 100%;
    border-bottom-right-radius: 1em;
    border-bottom-left-radius: 1em;
    top: 1em;
    z-index: -1;

    &:focus {
      .search_list {
        display: block;
      }
    }

    .search_list {
      padding-top: 1.5em;

      div {
        transition: 0.2s;
        padding: 0 1em;
        cursor: pointer;

        &:hover {
          background-color: #0d89ec;
        }

        &:last-child {
          border-bottom-right-radius: 1em;
          border-bottom-left-radius: 1em;
          padding-bottom: 3px;
        }
      }
    }
  }
`;

const NavigationMenu = styled.ul`
  display: flex;
  min-width: max-content;
  align-items: center;

  a {
    margin: 0 1em;
  }

  .user,
  .cart {
    background-color: white;
    color: black;
    border: none;
  }

  .p-button-icon {
    font-size: larger;
  }

  .p-button.user:hover,
  .p-button.cart:hover {
    background-color: white;
    color: black;
  }

  .p-button.user:focus,
  .p-button.cart:focus {
    box-shadow: none;
  }
`;

const OverlayHeader = styled(OverlayPanel)`
  .p-overlaypanel-content .user_access_links {
    cursor: pointer;
    margin-left: 0.2rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Header = () => {
  const [itemArray, setitemArray] = useState([]);
  const [searchItem, setsearchItem] = useState("");
  const [itemFounded, setitemFounded] = useState([]);
  const [visible, setVisible] = useState(false);
  const op = useRef(null);

  useEffect(() => {
    itemService.getItems().then((result) => setitemArray(result.data));
  }, []);

  const findSearchedItem = (toSearch) => {
    return itemArray.filter(
      (el) => el.name.toLowerCase().indexOf(toSearch.toLowerCase()) > -1
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setsearchItem(e.target.value);
    setitemFounded(findSearchedItem(searchItem));
  };

  return (
    <HeaderStyled>
      <div className="container">
        <div className="logo">
          <Link href="/">
            <a>Pet Shop</a>
          </Link>
        </div>

        <SearchBar className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText value={searchItem} onChange={(e) => handleSearch(e)} />
          {searchItem.length > 0 && (
            <div className="search_list_container">
              <div className="search_list">
                {itemFounded.map((founded) => {
                  return (
                    <Link
                      key={founded.id}
                      href={`/items/${founded.id}`}
                      passHref
                    >
                      <div>{founded.name}</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </SearchBar>

        <NavigationMenu className="p-d-none p-d-md-inline-flex">
          <Link href="/mycart">
            <Button
              icon="pi pi-shopping-cart"
              className="cart p-button-rounded"
            />
          </Link>
          <Button
            icon="pi pi-user"
            className="user p-button-rounded"
            onClick={(e) => op.current.toggle(e)}
          />
          <OverlayHeader ref={op} className="overlaypanel">
            <div>
              Do you have an account?
              <Link href="/login">
                <a className="user_access_links">
                  <b>Sign In</b>
                </a>
              </Link>
            </div>
            or
            <br></br>
            you can register
            <Link href="/register">
              <a className="user_access_links">
                <b>here</b>
              </a>
            </Link>
          </OverlayHeader>
          <Link href="/orders">
            <a className="p-m-2">Your Orders</a>
          </Link>
        </NavigationMenu>
        <Sidebar
          visible={visible}
          position="right"
          onHide={() => setVisible(false)}
        >
          <ul className="p-d-flex p-flex-column">
            <Link href="/mycart">
              <a className="p-m-2">My cart</a>
            </Link>
            <Link href="/orders">
              <a className="p-m-2">Your Orders</a>
            </Link>
          </ul>
        </Sidebar>

        <Button
          id="Sidebar-menu-button"
          icon="pi pi-bars"
          onClick={() => setVisible(true)}
          className="p-d-md-none"
        />
      </div>
    </HeaderStyled>
  );
};

export default Header;
