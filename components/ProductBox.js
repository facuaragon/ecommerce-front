import styled from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";
const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;
const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const Title = styled(Link)`
  color: inherit;
  text-decoration: none;
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
`;

const PriceRow = styled.div`
  display: block;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 2px;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 10px;
  }
`;

const Price = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    text-align: left;
  }
`;

export default function ProductBox({ _id, title, description, price, images }) {
  const { addProduct } = useContext(CartContext);
  const url = `/product/` + _id;
  const addNewProductToCart = () => {
    addProduct(_id);
  };
  return (
    <>
      <ProductWrapper>
        <WhiteBox href={url}>
          <div>
            <img src={images?.[0]} alt={title} />
          </div>
        </WhiteBox>
        <ProductInfoBox>
          <Title href={url}>{title}</Title>
          <PriceRow>
            <Price>${price}</Price>
            <Button
              block={1}
              primary={1}
              outlined={1}
              onClick={addNewProductToCart}
            >
              Add to cart
            </Button>
          </PriceRow>
        </ProductInfoBox>
      </ProductWrapper>
    </>
  );
}
