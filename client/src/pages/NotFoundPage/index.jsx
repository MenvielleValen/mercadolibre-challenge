import { errors } from "../../constants";
import { ErrorHandler } from "../../components";

export const NotFoundPage = () => {
  return (
    <ErrorHandler error={{type: errors.not_found}}/>
  );
};
