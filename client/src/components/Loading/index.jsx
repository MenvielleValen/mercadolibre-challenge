import PropTypes from 'prop-types';
import styles from "./styles.module.scss";

const Loading = ({ text = '' }) => {
  return (
    <div className={styles.loader__container}>
      <div className={styles.loader}></div>
      <span>{text}</span>
    </div>
  );
};

Loading.propTypes = {
  text: PropTypes.string,
};

export default Loading;