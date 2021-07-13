import React, { useState } from "react";
import Link from "next/link";
import { InputText } from "primereact/inputtext";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import styled from "styled-components";

const HeaderStyled = styled.div`
  box-shadow: rgb(0 0 0 / 24%) 0px 0px 5px;
  .container {
    display: flex;
    width: 80%;
    height: 3em;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    padding: 2em;
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

  i {
    padding: 0 4px;
  }

  input {
    width: 100%;
    border-radius: 2em;
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
  const [value, setValue] = useState("");

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
          <InputText value={value} onChange={(e) => setValue(e.target.value)} />
        </SearchBar>
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
