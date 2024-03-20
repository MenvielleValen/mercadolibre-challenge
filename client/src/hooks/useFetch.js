import { useEffect, useState } from "react";
import axios from "../axios";
import { errors } from "../constants";


/**
 * Realiza peticiones [GET]
 * @param {string} url endpoint
 * @param {boolean} dataByQuery true => si tiene que enviar parámetros
 * @param {object} query parámetros a enviar (solo si dataByQuery es true)
 * @returns data: resultados obtenidos, loading, error: si ocurre algun error lo devuelve
 */
const useFetch = (url, timeout, dataByQuery, query) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getDataByQuery = async () => {
    setLoading(true);
    try {

      if (dataByQuery) {
        if (query) {
          const { data } = await axios.get(`${url}`, {
            params: {
              q: query,
            },
            timeout
          });
          setData(data);
          setError(null);
        }
      } else {
        const { data } = await axios.get(`${url}`, {timeout});
        setData(data);
        setError(null);
      }
    } catch (error) {
      if (error?.code === "ECONNABORTED") {
        setError({
          type: errors.timeout,
          message: "La solicitud tomó demasiado tiempo y fue abortada.",
          status: 408,
        });
      } else if (error?.response?.data) {
        setError(error.response.data);
      } else {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataByQuery();
  }, [url, query]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetch;
