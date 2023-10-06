import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export const CartContextProvider = ({ children }) => {
  const ls = typeof window != "undefined" ? window.localStorage : null; // if it's running in a browser=> access to localstorage
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls?.getItem("cart")));
    }
  }, []);
  const addProduct = (productID) => {
    setCartProducts((prev) => [...prev, productID]);
  };
  const removeProduct = (productID) => {
    setCartProducts((prev) => {
      const position = prev.indexOf(productID);
      if (position !== -1) {
        return prev.filter((value, index) => index != position);
      } else {
        return prev;
      }
    });
  };
  const clearCart = () => {
    setCartProducts([]);
  };
  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
