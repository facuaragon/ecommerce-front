import { useEffect, useRef, useState } from "react";
import Loader from "../Loader/Loader";
import styles from "./styles.module.css";
import axios from "axios";

export default function MercadoPagoButton({ products }) {
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isInitialRender = useRef(true);
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    const generateLink = async () => {
      setLoading(true);
      setError("");
      try {
        // console.log(products);
        const { data: preference } = await axios.post(
          "/api/checkoutMercadoPago",
          {
            products,
          }
        );
        console.log(preference.url);
        if (preference.url) {
          setUrl(preference.url);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setError("Verify your information, and try again");
        console.error(error);
      }
      setLoading(false);
    };

    generateLink();
  }, []);
  console.log(error);
  return (
    <div>
      {loading ? (
        <button className={styles.button} disabled>
          <Loader size={15} />
        </button>
      ) : error != "" ? (
        <a className={styles.error} href={"/cart"}>
          {error}
        </a>
      ) : (
        <a className={styles.button} href={url}>
          Pay with MercadoPago
        </a>
      )}
    </div>
  );
}
