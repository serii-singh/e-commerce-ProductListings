import api from "./api";

export const getProducts = async (
  limit = 100,
  skip = 0
) => {
  const response = await api.get(
    `/products?limit=${limit}&skip=${skip}`
  );

  return response.data;
};

export const getProductById = async (
  id: string
) => {
  const response = await api.get(
    `/products/${id}`
  );

  return response.data;
};

export const getCategories = async () => {
  const response = await api.get(
    "/products/categories"
  );

  return response.data;
};