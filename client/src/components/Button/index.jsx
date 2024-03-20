import PropTypes from "prop-types";
import styles from "./styles.module.scss";

/**
 * 
 * @param {React.PropsWithChildren<HTMLButtonElement>} props 
 * @returns {React.ReactNode}
 */
const Button = ({ children, ...rest }) => {
  return (
    <button {...rest} className={styles.custom_button}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node
};

export default Button;
