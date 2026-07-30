"use client";

import Button from "@/app/(landing)/components/ui/button";
import { FiPlus } from "react-icons/fi";
import { useState, useEffect, useCallback } from "react";
import BankInfoList from "../../components/bank-info/bank-info-list";
import BankInfoModal from "../../components/bank-info/bank-info-modal";
import DeleteModal from "../../components/ui/delete-modal";
import { getAllBanks, deleteBank } from "@/app/services/bank.service";
import { Bank } from "@/app/types";

const BankInfoManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bankToEdit, setBankToEdit] = useState<Bank | null>(null);
  const [bankToDelete, setBankToDelete] = useState<Bank | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchBanks = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAllBanks();
      if (Array.isArray(data) && data.length > 0) {
        setBanks(data);
      }
    } catch (error) {
      console.log("Failed to fetch banks from API, using default list", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBanks();
  }, [fetchBanks]);

  const handleOpenAddModal = () => {
    setBankToEdit(null);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setBankToEdit(null);
  };

  const handleEdit = (bank: Bank) => {
    setBankToEdit(bank);
    setIsOpen(true);
  };

  const handleDeleteClick = (bank: Bank) => {
    setBankToDelete(bank);
  };

  const handleCloseDeleteModal = () => {
    setBankToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!bankToDelete) return;
    setIsDeleting(true);

    try {
      if (bankToDelete._id) {
        await deleteBank(bankToDelete._id);
      }
    } catch (error) {
      console.log("Failed to delete bank account via API, updating state", error);
    } finally {
      setBanks((prev) => prev.filter((b) => b._id !== bankToDelete._id));
      setIsDeleting(false);
      setBankToDelete(null);
      fetchBanks();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Bank Info Management</h1>
          <p className="opacity-50">
            Manage destination accounts for customer transfers.
          </p>
        </div>
        <Button className="rounded-lg" onClick={handleOpenAddModal}>
          <FiPlus size={24} />
          Add Bank Account
        </Button>
      </div>

      <BankInfoList
        banks={banks.length > 0 ? banks : undefined}
        isLoading={isLoading && banks.length === 0}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <BankInfoModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        bankToEdit={bankToEdit}
        onSuccess={fetchBanks}
      />

      <DeleteModal
        isOpen={Boolean(bankToDelete)}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete Bank Account"
        itemName={bankToDelete ? `${bankToDelete.bankName} (${bankToDelete.accountNumber})` : undefined}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default BankInfoManagement;