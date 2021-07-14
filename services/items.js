import axios from "axios";

const baseUrl = "http://localhost:3001/items";

const getItems = async () => {
  const result = axios.get(baseUrl);
  return await result;
};

export default { getItems };
