import styled from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
const ProductWrapper = styled.div``;

const WhiteBox = styled.div`
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

const Title = styled.h2`
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
`;

const PriceRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

export default function ProductBox({ _id, title, description, price, images }) {
  return (
    <>
      <ProductWrapper>
        <WhiteBox>
          <div>
            <img src={images[0]} alt={title} />
          </div>
        </WhiteBox>
        <ProductInfoBox>
          <Title>{title}</Title>
          <PriceRow>
            <Price>${price}</Price>
            <Button primary={1} outlined={1}>
              Add to cart
            </Button>
          </PriceRow>
        </ProductInfoBox>
      </ProductWrapper>
    </>
  );
}
