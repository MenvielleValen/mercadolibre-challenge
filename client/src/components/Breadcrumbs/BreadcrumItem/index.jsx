import PropTypes from "prop-types";
import style from "./styles.module.scss";

const BreadcrumItem = ({ item, lastIndex }) => {
  return (
    <>
      <li className={style.breadcrum_item__container}>
        <a href="#" title={item} className={lastIndex ? style.bold : ""}>
          {item}
        </a>
        {!lastIndex && (
          <span className={style.breadcrum_item__arrow}>{">"}</span>
        )}
      </li>
    </>
  );
};

BreadcrumItem.propTypes = {
  item: PropTypes.string.isRequired,
  lastIndex: PropTypes.bool,
};

export default BreadcrumItem;
