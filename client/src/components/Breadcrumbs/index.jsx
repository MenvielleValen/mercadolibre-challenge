import PropTypes from "prop-types";
import BreadcrumItem from "./BreadcrumItem";
import styles from "./styles.module.scss";

const Breadcrumbs = ({ items }) => {
  return (
    <nav className={styles.breadcrumbs_list}>
      <ol>
        {items.map((item, i) => (
          <BreadcrumItem
            key={`Breadcrumbs__item_${i}`}
            item={item}
            lastIndex={i === items.length - 1}
          />
        ))}
      </ol>
    </nav>
  );
};

Breadcrumbs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Breadcrumbs;
