import { fetchAPI } from "../lib/api";
import { Bank } from "../types";

export const getAllBanks = async (): Promise<Bank[]> => {
  return await fetchAPI<Bank[]>("/banks");
};

export const createBank = async (data: Partial<Bank> | FormData): Promise<Bank> => {
  return await fetchAPI<Bank>("/banks", {
    method: "POST",
    body: data instanceof FormData ? data : JSON.stringify(data),
    headers: data instanceof FormData ? {} : { "Content-Type": "application/json" },
  });
};

export const updateBank = async (
  id: string,
  data: Partial<Bank> | FormData
): Promise<Bank> => {
  return await fetchAPI<Bank>(`/banks/${id}`, {
    method: "PUT",
    body: data instanceof FormData ? data : JSON.stringify(data),
    headers: data instanceof FormData ? {} : { "Content-Type": "application/json" },
  });
};

export const deleteBank = async (id: string): Promise<any> => {
  return await fetchAPI<any>(`/banks/${id}`, {
    method: "DELETE",
  });
};