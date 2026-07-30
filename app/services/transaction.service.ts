import { fetchAPI } from "../lib/api";
import { Transaction } from "../types";

export const transactionCheckout = async (
  form: FormData
): Promise<Transaction> => {
  return await fetchAPI<Transaction>("/transactions/checkout", {
    method: "POST",
    body: form,
  });
};

export const getTransactionById = async (id: string): Promise<Transaction> => {
  return await fetchAPI<Transaction>(`/transactions/${id}`);
};

export const getAllTransactions = async (): Promise<Transaction[]> => {
  return await fetchAPI<Transaction[]>("/transactions");
};

export const updateTransactionStatus = async (
  id: string,
  status: "paid" | "rejected" | "pending"
): Promise<Transaction> => {
  return await fetchAPI<Transaction>(`/transactions/${id}/status`, {
    method: "PUT",
    body: JSON.stringify({ status }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};