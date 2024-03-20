import { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

import searchIcon from "../../assets/search-icon.png";
import style from "./styles.module.scss";
import {useGetParam} from "../../hooks";
import { stringNormalize } from "../../helpers";

const Searchbar = () => {
  const { value } = useGetParam("search");
  const [searchText, setSearchText] = useState(value || "");
  const navigate = useNavigate();

  useEffect(() => {
    setSearchText(value || "");
  }, [value]);

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSearchText(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const searchTerm = stringNormalize(searchText);

    if (searchTerm !== "") {
      navigate({
        pathname: "/items",
        search: `?${createSearchParams({ search: searchTerm })}`,
      });
    }
  };

  return (
    <form
      role="form"
      onSubmit={handleSubmit}
      className={style.searchbar}
      aria-label="Formulario de búsqueda"
    >
      <label hidden htmlFor="input-search">
        Buscar producto
      </label>
      <input
        id="input-search"
        type="search"
        placeholder="Nunca dejes de buscar"
        maxLength="120"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck="false"
        autoComplete="off"
        tabIndex="0"
        value={searchText}
        onChange={handleInputChange}
        data-testid="input-search"
      />
      <button type="submit" aria-label="Buscar">
        <img src={searchIcon} loading="lazy" alt="Buscar productos" />
      </button>
    </form>
  );
};

export default Searchbar;
