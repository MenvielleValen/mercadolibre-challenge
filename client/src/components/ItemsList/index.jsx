import PropTypes from "prop-types";
import ItemCard from "../ItemCard";
import styles from "./styles.module.scss";

const ItemsList = ({items}) => {
  return (
    <ol className={styles.item_list__container}>
      {items.map((item, i) => (
        <li key={item.id} data-testid="item-card" >
          <ItemCard item={item} />
          {i < items.length - 1 && <div data-testid="item-list-divider" className={styles.item_list__divider}></div>}
        </li>
      ))}
    </ol>
  );
};

ItemsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    price: PropTypes.shape({
      currency: PropTypes.string,
      amount: PropTypes.number,
      decimals: PropTypes.number,
    }),
    picture: PropTypes.string,
    condition: PropTypes.string,
    free_shipping: PropTypes.bool,
    location: PropTypes.string,
  })).isRequired
};

export default ItemsList;
