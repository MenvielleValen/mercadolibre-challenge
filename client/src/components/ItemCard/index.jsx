import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { formatPrice } from "../../helpers";
import styles from "./styles.module.scss";
import shippingIcon from "../../assets/shipping-icon.png";

const ItemCard = ({ item }) => {
  return (
    <Link
      to={`/items/${item.id}`}
      aria-label={item.title}
      title={item.title}
      className={styles.item__container}
    >
      <article className={styles.item__wrapper}>
        <div className={styles.item_image}>
          <img src={item.picture} alt={item.title} loading="lazy" />
        </div>

        <div className={styles.item_details__container}>
          <div className={styles.item_header__container}>
            <div className={styles.item_price__container}>
              <h3 data-testid="item-amount">{formatPrice(item.price)}</h3>
              {item.free_shipping && (
                <img
                  src={shippingIcon}
                  data-testid="free-shipping-icon"
                  alt="Envío gratis"
                  loading="lazy"
                />
              )}
            </div>
            <h2 data-testid="item-title">{item.title}</h2>
          </div>
          <div className={styles.item_location__container}>
            <span data-testid="item-location">{item?.location}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

ItemCard.propTypes = {
  item: PropTypes.shape({
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
  }).isRequired
};

export default ItemCard;
