import React, { useState, useContext } from "react";
import Link from "next/link";
import { InputText } from "primereact/inputtext";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import styled from "styled-components";
import { ItemsContext } from "../pages/_app";

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
    border-radius: 2em;
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
  }

  .p-inputtext:focus {
    box-shadow: none;
  }

  .search_list {
    position: absolute;
    background-color: white;
    width: 100%;
  }
`;

const NavigationMenu = styled.ul`
  display: flex;
  min-width: max-content;
  align-items: center;

  a {
    margin: 0 1em;
  }
`;

const Header = () => {
  const [visible, setVisible] = useState(false);

  const handleSearch = (
    e,
    setsearchItem,
    setitemFounded,
    findItem,
    searchItem
  ) => {
    e.preventDefault();
    setsearchItem(e.target.value);
    setitemFounded(findItem(searchItem));
  };

  return (
    <HeaderStyled>
      <div className="container">
        <div className="logo">
          <Link href="/">
            <a>Pet Shop</a>
          </Link>
        </div>

        <ItemsContext.Consumer>
          {(contextStorage) => {
            const {
              setsearchItem,
              setitemFounded,
              findItem,
              searchItem,
              itemFounded,
            } = contextStorage;
            return (
              <SearchBar className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                  value={searchItem}
                  onChange={(e) =>
                    handleSearch(
                      e,
                      setsearchItem,
                      setitemFounded,
                      findItem,
                      searchItem
                    )
                  }
                />
                {searchItem.length > 0 && (
                  <div className="search_list">
                    {itemFounded.map((founded) => (
                      <div key={founded.id}>{founded.name}</div>
                    ))}
                  </div>
                )}
              </SearchBar>
            );
          }}
        </ItemsContext.Consumer>

        <NavigationMenu className="p-d-none p-d-md-inline-flex">
          <Link href="/mycart">
            <a>My cart</a>
          </Link>
          <Link href="/purchase">
            <a>Purchase</a>
          </Link>
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
            <Link href="/purchase">
              <a className="p-m-2">Purchase</a>
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
