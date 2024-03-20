import Container from "../Container";
import { SearchRescueIcon } from "../CustomIcons";
import styles from "./styles.module.scss";

const EmptyItems = () => {
  return (
    <Container>
      <div className={styles.empty_items__container}>
        <SearchRescueIcon />
        <div className={styles.empty_items__details}>
          <h3>No hay publicaciones que coincidan con tu búsqueda</h3>
          <ul>
            <li>
              <strong>Revisá la ortografía </strong>de la palabra.
            </li>
            <li>
              Utilizá <strong>palabras más genéricas</strong> o menos palabras.
            </li>
            <li>
              Utilizá el <strong>buscador</strong> para encontrar un producto
              similar.
            </li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default EmptyItems;
