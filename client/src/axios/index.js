import axios from "axios";

const author = {
  name: "Valentin",
  lastname: "Menvielle Candia",
};

export default axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    author: JSON.stringify(author),
  },
});
