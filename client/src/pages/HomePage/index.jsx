import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { Container } from "../../components";
import { stringNormalize, storage } from "../../helpers";
import styles from "./styles.module.scss";

export const HomePage = () => {
  const lastSearch = storage.getItem("LAST_SEARCH");
  return (
    <>
      <Helmet>
        <title>Mercado Libre | Challenge</title>
        <meta
          name="description"
          content="Comprá productos con Envío Gratis en el día en Mercado Libre Argentina. Encontrá miles de marcas y productos a precios increíbles."
        />
      </Helmet>
      <Container>
        <div className={styles.home_main__container}>
          <h2>Bienvenido a Mercado Libre</h2>
          <div>
            <p>
              <span>¡Nunca dejes de buscar! </span>Utiliza nuestro buscador para
              explorar una amplia variedad de productos.
            </p>
            {lastSearch && (
              <div className={styles.last_serach__container}>
                <p>
                  ¿Quieres retomar donde lo dejaste? ¡Continúa tu última
                  búsqueda!
                </p>
                <Link
                  to={`/items?search=${stringNormalize(lastSearch)}`}
                  title={`Resultados de ${stringNormalize(lastSearch)} en Mercado Libre`}
                  aria-label={`Buscar ${stringNormalize(lastSearch)}`}
                >
                  Buscar {stringNormalize(lastSearch)}
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};
