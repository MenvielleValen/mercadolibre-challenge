import PropTypes from "prop-types";
import styles from "./styles.module.scss";

const Container = ({ children }) => {
  return <div className={styles.section__container}>{children}</div>;
};

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;
