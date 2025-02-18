import styles from "../styles/Particles.module.css";

const Particles = () => {
  return (
    <div aria-hidden="true">
      {[...Array(10)].map((_, i) => (
        <div key={i} className={`${styles["particle"]}`}>
          <div className={`${styles["inner"]}`}>
            <div className={`${styles["particle-blue"]}`}></div>
            <div className={`${styles["particle-white"]}`}></div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Particles;
