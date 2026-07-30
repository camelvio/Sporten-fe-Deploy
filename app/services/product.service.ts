import { fetchAPI } from "../lib/api";
import { Product } from "../types";

export const getAllProducts = async (): Promise<Product[]> => {
  return await fetchAPI<Product[]>("/products");
};

export const getProductDetail = async (id: string): Promise<Product> => {
  return await fetchAPI<Product>(`/products/${id}`);
};

export const createProduct = async (data: FormData): Promise<Product> => {
  return await fetchAPI<Product>("/products", {
    method: "POST",
    body: data,
  });
};

export const updateProduct = async (
  id: string,
  data: FormData
): Promise<Product> => {
  return await fetchAPI<Product>(`/products/${id}`, {
    method: "PUT",
    body: data,
  });
};

export const deleteProduct = async (id: string): Promise<any> => {
  return await fetchAPI<any>(`/products/${id}`, {
    method: "DELETE",
  });
};