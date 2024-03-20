import PropTypes from "prop-types";

import { formatPrice, getDecimals } from "../../helpers";
import Button from "../Button";
import styles from "./styles.module.scss";
import { useCallback } from "react";

const ItemDetail = ({ item }) => {
  const { title, picture, description, price, condition, sold_quantity } = item;

  //Convierto description en un arreglo, separando por los saltos de línea para renderizar los párrafos por separado
  let formatDescription = description
    ? description.split("\n")
    : ["Sin descripción."];

  const handleBuy = useCallback(() => {
    console.log(title, item);
  }, [item]);

  return (
    <section className={styles.product_container}>
      <div className={styles.product_container__details}>
        <div className={styles.product_image__container}>
          <img
            data-testid="item-image"
            src={picture}
            alt={title}
            title={title}
            width={680}
            height={680}
            loading="lazy"
          />
        </div>
        <div className={styles.product__description_container}>
          <span>Descripción del producto</span>
          <div
            className={styles.product__description}
            data-testid="item-description"
          >
            {formatDescription.map((linea, index) => (
              <p key={index}>{linea || "\u00A0"}</p>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.product_info__container}>
        <div className={styles.product_info__header}>
          <span data-testid="item-condition">
            {condition}{" "}
            {`- ${sold_quantity} ${
              sold_quantity === 1 ? "vendido" : "vendidos"
            }`}
          </span>
          <h1
            className={styles.product_info__header__title}
            data-testid="item-title"
          >
            {title}
          </h1>
        </div>
        <div>
          <span className={styles.product_price} data-testid="item-amount">
            {formatPrice(price)}
            <span className={styles.product_price__decimals}>
              {getDecimals(price)}
            </span>
          </span>
        </div>
        <Button onClick={handleBuy}>Comprar</Button>
      </div>
    </section>
  );
};

ItemDetail.propTypes = {
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
    description: PropTypes.string,
    sold_quantity: PropTypes.number,
  }).isRequired,
};

export default ItemDetail;
