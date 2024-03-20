import { useParams } from "react-router-dom";

import { Helmet } from "react-helmet";

import {useFetch} from "../../hooks";
import { NotFoundPage } from "../NotFoundPage";
import { Breadcrumbs, ErrorHandler, ItemDetail, Loading } from "../../components";
import { endpoints } from "../../constants";

export const DetailPage = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    `${endpoints.ITEM_BY_ID.url}/${id}`,
    endpoints.ITEM_BY_ID.timeout
  );

  if (error) return <ErrorHandler error={error} />;
  if (loading) return <Loading text={"Obteniendo producto..."} />;
  if (!data || !data.item) return <NotFoundPage />;

  return (
    <>
      <Helmet>
        <title>{data.item.title}</title>
        <meta name="description" content={data.item.title} />
        <meta name="twitter:card" content="product" />
        <meta name="twitter:description" content={data.item.title} />
        <meta name="twitter:site" content="Mercado Libre Challenge" />
        <meta name="twitter:title" content={data.item.title} />

        <meta property="og:description" content={data.item.title} />
        <meta property="og:image" content={data.item.picture} />
        <meta property="og:title" content={data.item.title} />
        <meta property="og:url" content={window.location} />
      </Helmet>
      <Breadcrumbs items={data.categories} />
      <ItemDetail item={data.item} />
    </>
  );
};
