import { useEffect, useRef, useState } from "react";
import Loader from "../Loader/Loader";
import styles from "./styles.module.css";
import axios from "axios";

export default function MercadoPagoButton({ products }) {
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const isInitialRender = useRef(true);
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    const generateLink = async () => {
      setLoading(true);
      try {
        // console.log(products);
        const { data: preference } = await axios.post(
          "/api/checkoutMercadoPago",
          {
            products,
          }
        );
        // console.log(preference.url);
        setUrl(preference.url);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    generateLink();
  }, []);
  return (
    <div>
      {loading ? (
        <button className={styles.button} disabled>
          <Loader size={15} />
        </button>
      ) : (
        <a className={styles.button} href={url}>
          Pay with MercadoPago
        </a>
      )}
    </div>
  );
}
