import { fetchAPI } from "../lib/api";
import { Category } from "../types";

export const getAllCategories = async (): Promise<Category[]> => {
  return await fetchAPI<Category[]>("/categories");
};

export const createCategory = async (data: FormData): Promise<Category> => {
  return await fetchAPI<Category>("/categories", {
    method: "POST",
    body: data,
  });
};

export const updateCategory = async (
  id: string,
  data: FormData
): Promise<Category> => {
  return await fetchAPI<Category>(`/categories/${id}`, {
    method: "PUT",
    body: data,
  });
};

export const deleteCategory = async (id: string): Promise<any> => {
  return await fetchAPI<any>(`/categories/${id}`, {
    method: "DELETE",
  });
};