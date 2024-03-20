import { Link } from "react-router-dom";

import logoMeLi from "../../assets/logo-meli.png";
import styles from "./styles.module.scss";

const Logo = () => {
  return (
    <Link to={"/"} aria-label="Ir a inicio" className={styles.logo__container}>
      <img alt="Mercado Libre Logo" src={logoMeLi} loading="lazy" />
    </Link>
  );
};

export default Logo;
