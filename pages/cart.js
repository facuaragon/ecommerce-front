import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import MercadoPagoButton from "@/components/MercadoPagoButton/MercadoPagoButton";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1;
  gap: 40px;
  margin-top: 40px;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.3fr 0.7fr;
  }
`;
const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  position: relative;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 70px;
  /* padding: 10px; */
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 50px;
    max-height: 50px;
  }
  @media screen and (min-width: 768px) {
    width: 100px;
    height: 100px;
    padding: 10px;
    img {
      max-width: 80px;
      max-height: 80px;
    }
  }
`;
const QuantityLabel = styled.span`
  padding: 5px 15px;
  display: block;

  @media screen and (min-width: 768px) {
    padding: 0 10px;

    display: inline-block;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const Icon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
`;
export default function CartPage() {
  const router = useRouter();

  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");

  const [checkout, setCheckout] = useState(false);
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    console.log(router.query);
    if (router.query?.status === "approved") {
      clearCart();
    }
  }, [router]);

  const moreOfThisProduct = (id) => {
    addProduct(id);
  };

  const lessOfThisProduct = (id) => {
    removeProduct(id);
    // console.log(products.length);
  };

  const goToPayment = async () => {
    const res = await axios.post("/api/checkout", {
      name,
      email,
      postalCode,
      streetAddress,
      country,
      city,
      cartProducts,
    });
    if (res.data.url) {
      window.location = res.data.url;
    }
  };
  const goToCart = () => {
    router.push("/cart");
  };
  const goToHome = () => {
    router.push("/");
  };

  //! Total Price
  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }
  //! If redirected from stripe
  if (router.query?.status === "approved") {
    // console.log(router.query?.success);
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent</p>
              <Button block={1} black={1} onClick={goToHome}>
                Back to Home
              </Button>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  } else if (router.query?.status === "failure") {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>There was an error with the payment</h1>
              <p>Please try again</p>
              <Button block={1} black={1} onClick={goToCart}>
                Back to Cart
              </Button>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }
  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>
            {!cartProducts?.length && <div>Your cart is empty</div>}
            {products.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt={product.title} />
                        </ProductImageBox>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        {!checkout && (
                          <Button
                            onClick={() => lessOfThisProduct(product._id)}
                          >
                            -
                          </Button>
                        )}
                        <QuantityLabel>
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </QuantityLabel>
                        {!checkout && (
                          <Button
                            onClick={() => moreOfThisProduct(product._id)}
                          >
                            +
                          </Button>
                        )}
                      </td>
                      <td>
                        ${" "}
                        {product.price *
                          cartProducts.filter((id) => id === product._id)
                            .length}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>$ {total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>
          {!!cartProducts.length && (
            <Box>
              {checkout && (
                <Icon onClick={() => setCheckout(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                </Icon>
              )}
              <h2 style={{ position: "relative" }}>Order Information</h2>
              <Input
                type="text"
                placeholder="Name"
                value={name}
                name="name"
                onChange={(e) => setName(e.target.value)}
                disabled={checkout}
              />
              <Input
                type="text"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                disabled={checkout}
              />
              <CityHolder>
                <Input
                  type="text"
                  placeholder="City"
                  value={city}
                  name="city"
                  onChange={(e) => setCity(e.target.value)}
                  disabled={checkout}
                />
                <Input
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  name="postalCode"
                  onChange={(e) => setPostalCode(e.target.value)}
                  disabled={checkout}
                />
              </CityHolder>
              <Input
                type="text"
                placeholder="Street Address"
                value={streetAddress}
                name="streetAddress"
                onChange={(e) => setStreetAddress(e.target.value)}
                disabled={checkout}
              />
              <Input
                type="text"
                placeholder="Country"
                value={country}
                name="country"
                onChange={(e) => setCountry(e.target.value)}
                disabled={checkout}
              />
              <input type="hidden" name="products" />
              {/* <Button block={1} black={1} onClick={goToPayment}>
                Continue to Payment
              </Button> */}
              {!checkout ? (
                <Button
                  black={1}
                  block={1}
                  checkout={1}
                  disabled={
                    !(
                      name &&
                      email &&
                      city &&
                      postalCode &&
                      streetAddress &&
                      country
                    )
                  }
                  onClick={() => setCheckout(true)}
                >
                  Continuar
                </Button>
              ) : (
                <MercadoPagoButton
                  products={{
                    name,
                    email,
                    postalCode,
                    streetAddress,
                    country,
                    city,
                    cartProducts,
                  }}
                  checkout={checkout}
                />
              )}
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
