import styles from "../styles/Card.module.css";

function Card(props: { children: React.ReactNode }) {
  return (
    <div className={styles.card}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
}

export default Card;
