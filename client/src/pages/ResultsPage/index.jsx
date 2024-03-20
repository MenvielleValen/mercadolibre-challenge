import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useGetParam, useFetch } from "../../hooks";
import {
  Breadcrumbs,
  ItemsList,
  Loading,
  EmptyItems,
  ErrorHandler,
} from "../../components";
import { endpoints } from "../../constants/endpoints";
import { errors } from "../../constants";
import { capitalizeFirstLetter, storage } from "../../helpers";

export const ResultsPage = () => {
  const { value } = useGetParam("search");
  const { data, loading, error } = useFetch(
    endpoints.ITEMS_SEARCH.url,
    endpoints.ITEMS_SEARCH.timeout,
    true,
    value
  );
  
  useEffect(() => {
    //Si obtiene resultados guardo la última búsqueda
    if(data?.items?.length > 0){
      storage.setItem('LAST_SEARCH', value);
    }
  }, [data])

  if (error) return <ErrorHandler error={error} />;

  if (loading) return <Loading text={`Buscando ${value} en Mercado Libre...`} />;
  
  if (data && data.items.length === 0) return <EmptyItems />;

  if (!value) return <ErrorHandler error={{ type: errors.undefined_field }} />;

  return (
    <>
      <Helmet>
        <title>
          {value
            ? `${capitalizeFirstLetter(value)} en Mercado Libre 📦`
            : "Mercado Libre | Challenge"}
        </title>
        <meta
          name="description"
          content="Comprá productos con Envío Gratis en el día en Mercado Libre Argentina. Encontrá miles de marcas y productos a precios increíbles."
        />
      </Helmet>
      {data && (
        <>
          <Breadcrumbs items={data.categories} />
          <ItemsList items={data.items} />
        </>
      )}
    </>
  );
};
