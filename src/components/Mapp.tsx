import styles from "../styles/Mapp.module.css";
import Particles from "./Particles";

function Mapp() {
  return (
    <>
      <img className={styles["map-img"]} src="tokyo.jpg"></img>;
      <Particles></Particles>
    </>
  );
}

export default Mapp;
