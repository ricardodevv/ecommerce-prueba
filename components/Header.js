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
          background-color: wheat;
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
`;

const Header = () => {
  const [visible, setVisible] = useState(false);

  const {
    setsearchItem,
    setitemFounded,
    findSearchedItem,
    searchItem,
    itemFounded,
  } = useContext(ItemsContext);

  const handleSearch = (
    e,
    setsearchItem,
    setitemFounded,
    findSearchedItem,
    searchItem
  ) => {
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
          <InputText
            value={searchItem}
            onChange={(e) =>
              handleSearch(
                e,
                setsearchItem,
                setitemFounded,
                findSearchedItem,
                searchItem
              )
            }
          />
          {searchItem.length > 0 && (
            <div className="search_list_container">
              <div className="search_list">
                {itemFounded.map((founded) => {
                  const url = founded.name.toLowerCase().replace(/\s/g, "-");
                  return (
                    <Link
                      key={founded.id}
                      href="/items/[id]/[item]"
                      as={`/items/${founded.id}/${url}`}
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
            <a>My cart</a>
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
