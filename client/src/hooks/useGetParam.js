import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

/**
 * Obtiene parámetros de búsquedas con react router y devuelve el solicitado
 * @param {string} paramId key de parámetro a solicitar
 * @returns {string} valor del parámetro
 */
const useGetParam = (paramId) => {
  const [searchParams] = useSearchParams();
  const [value, setValue] = useState(null)

  useEffect(() => {
    const searchValue = searchParams.get(paramId);
    setValue(searchValue)
  }, [searchParams])
  
  return {
    value
  };
};

export default useGetParam;
