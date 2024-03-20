import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { errors } from "../../constants/errors";
import Container from "../Container";
import { PageNotFoundIcon, SearchRescueIcon } from "../CustomIcons";
import styles from "./styles.module.scss";

const ErrorHandler = ({ error }) => {
  let title = "";
  let description = "";
  let icon = <PageNotFoundIcon />;

  switch (error?.type) {
    case errors.not_found:
      title = "Parece que esta página no existe.";
      description = `404`;
      break;
    case errors.undefined_field:
      title = "Al parecer no has especificado un término de búsqueda.";
      description = `Utiliza nuestro buscador para
      explorar una amplia variedad de productos.`;
      icon = <SearchRescueIcon />;
      break;

    default:
      title = "Ocurrió un error.";
      description = `${error?.message}`;
      break;
  }

  return (
    <Container>
      <div className={styles.error_handler__container}>
        {icon}
        <>
          <h4>{title}</h4>
          <small>{description}</small>
        </>
        <Link to={"/"} aria-label="Ir a la página principal">
          Ir a la página principal
        </Link>
      </div>
    </Container>
  );
};

ErrorHandler.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
};

export default ErrorHandler;
