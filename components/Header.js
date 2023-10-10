import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import MenuIcon from "./icons/MenuIcon";
import { useState } from "react";

const StyledHeader = styled.header`
  background-color: #222;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  align-self: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  ${(props) =>
    props.mobileNavActive
      ? `
display:block;
`
      : `
display:none;
`}

  gap: 15px;
  position: fixed;
  top: 50px;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background-color: #222;
  z-index: 1;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const NavLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
  display: block;
  align-self: center;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  width: 40px;
  height: 40px;
  border: 0;
  color: white;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const closeNav = () => {
    setTimeout(() => {
      setMobileNavActive((prev) => !prev);
    }, 500);
  };
  return (
    <>
      <StyledHeader>
        <Center>
          <Wrapper>
            <Logo href={"/"}>Ecommerce</Logo>
            <StyledNav mobileNavActive={mobileNavActive}>
              <NavLink href={"/"} onClick={closeNav}>
                Home
              </NavLink>
              <NavLink href={"/products"} onClick={closeNav}>
                All products
              </NavLink>
              <NavLink href={"/categories"} onClick={closeNav}>
                Categories
              </NavLink>
              <NavLink href={"/account"} onClick={closeNav}>
                Account
              </NavLink>
              <NavLink href={"/cart"} onClick={closeNav}>
                Cart ({cartProducts.length})
              </NavLink>
            </StyledNav>
            <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
              <MenuIcon />
            </NavButton>
          </Wrapper>
        </Center>
      </StyledHeader>
    </>
  );
}
