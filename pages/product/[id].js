import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import CartIcon from "@/components/icons/CartIcon";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { useContext } from "react";
import styled from "styled-components";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 14px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const Title = styled.h1`
  font-size: 1.5em;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Price = styled.span`
  font-size: 1.4rem;
`;

export default function ProductPage({ product }) {
  const { addProduct } = useContext(CartContext);
  console.log(product);
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <Box>
            <ProductImages images={product.images} title={product.title} />
          </Box>
          <div>
            <Title>{product?.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <Price>${product.price}</Price>
              <Button black={1} onClick={() => addProduct(product._id)}>
                <CartIcon />
                Add to cart
              </Button>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
}
export async function getServerSideProps(context) {
  //   console.log(context);
  const { id } = context.params;
  await mongooseConnect();
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
