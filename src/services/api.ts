import axios from "axios";

const Api = axios.create({
  baseURL: `https://pokeapi.co/api/v2`,
});

export const fetcher = async (resource: string) => {
  try {
    const response = await Api.get(resource);
    return response?.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default Api;
