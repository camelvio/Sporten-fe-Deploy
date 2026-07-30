"use client";

import TransactionTable from "../../components/transactions/transaction-table";
import TransactionModal from "../../components/transactions/transaction-modal";
import { useState, useEffect, useCallback } from "react";
import { getAllTransactions, updateTransactionStatus } from "@/app/services/transaction.service";
import { Transaction } from "@/app/types";

const initialTransactions: Transaction[] = [
  {
    _id: "1",
    paymentProof: "/images/payment-proof-dummy.png",
    status: "pending",
    purchasedItems: {
      productId: {
        _id: "p1",
        name: "SportsOn Hyperfast Shoes",
        imageUrl: "/images/products/product-1.png",
        price: 500000,
        description: "",
        category: {
          _id: "cat1",
          name: "Running",
          description: "",
          imageUrl: "",
          createdAt: "",
          updatedAt: "",
        },
        stock: 10,
        createdAt: "",
        updatedAt: "",
      },
      qty: 3,
    },
    totalPayment: "1500000",
    customerName: "John Doe",
    customerContact: 123123123,
    customerAddress: "Merdeka Street, Jakarta, Indonesia, 332122",
    createdAt: "2026-02-23T19:32:00.000Z",
    updatedAt: "2026-02-23T19:32:00.000Z",
  },
  {
    _id: "2",
    paymentProof: "/images/payment-proof-dummy.png",
    status: "rejected",
    purchasedItems: {
      productId: {
        _id: "p2",
        name: "SportsOn Product 2",
        imageUrl: "/images/products/product-2.png",
        price: 500000,
        description: "",
        category: {
          _id: "cat1",
          name: "Running",
          description: "",
          imageUrl: "",
          createdAt: "",
          updatedAt: "",
        },
        stock: 5,
        createdAt: "",
        updatedAt: "",
      },
      qty: 5,
    },
    totalPayment: "2500000",
    customerName: "John Doe 2",
    customerContact: 123123123,
    customerAddress: "Sudirman Street, Jakarta, Indonesia",
    createdAt: "2026-02-23T19:32:00.000Z",
    updatedAt: "2026-02-23T19:32:00.000Z",
  },
  {
    _id: "3",
    paymentProof: "/images/payment-proof-dummy.png",
    status: "paid",
    purchasedItems: {
      productId: {
        _id: "p3",
        name: "SportsOn Product 3",
        imageUrl: "/images/products/product-3.png",
        price: 350000,
        description: "",
        category: {
          _id: "cat1",
          name: "Running",
          description: "",
          imageUrl: "",
          createdAt: "",
          updatedAt: "",
        },
        stock: 8,
        createdAt: "",
        updatedAt: "",
      },
      qty: 2,
    },
    totalPayment: "1000000",
    customerName: "John Doe 3",
    customerContact: 123123123,
    customerAddress: "Gajah Mada Street, Jakarta, Indonesia",
    createdAt: "2026-02-23T19:32:00.000Z",
    updatedAt: "2026-02-23T19:32:00.000Z",
  },
];

const TransactionManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTransactions = useCallback(async () => {
    try {
      const data = await getAllTransactions();
      if (Array.isArray(data) && data.length > 0) {
        setTransactions(data);
      }
    } catch (error) {
      console.log("Using local transactions state:", error);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedTransaction(null);
  };

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsOpen(true);
  };

  const handleUpdateStatus = async (id: string, newStatus: "paid" | "rejected") => {
    // 1. Update React state immediately for instant real-time UI feedback
    setTransactions((prev) =>
      prev.map((t) => (t._id === id ? { ...t, status: newStatus } : t))
    );

    if (selectedTransaction && selectedTransaction._id === id) {
      setSelectedTransaction((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    // 2. Sync with backend API in background
    try {
      await updateTransactionStatus(id, newStatus);
    } catch (error) {
      console.log("API update error, local state preserved:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Transaction Management</h1>
          <p className="opacity-50">
            Verify incoming payments and manage orders.
          </p>
        </div>
      </div>
      <TransactionTable
        transactions={transactions}
        isLoading={isLoading}
        onViewDetails={handleViewDetails}
      />
      <TransactionModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        transaction={selectedTransaction}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default TransactionManagement;