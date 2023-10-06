import styles from "./styles.module.css";
export default function Loader({ size }) {
  return (
    <>
      <div style={{ width: size, height: size }} className={styles.spinner} />
    </>
  );
}
