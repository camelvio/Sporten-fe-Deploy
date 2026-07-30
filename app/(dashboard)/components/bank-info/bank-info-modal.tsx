import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import { useState, useEffect } from "react";
import { createBank, updateBank } from "@/app/services/bank.service";
import { Bank } from "@/app/types";

type TBankInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  bankToEdit?: Bank | any | null;
  onSuccess?: () => void;
};

const BankInfoModal = ({
  isOpen,
  onClose,
  bankToEdit,
  onSuccess,
}: TBankInfoModalProps) => {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (bankToEdit) {
        setBankName(bankToEdit.bankName || "");
        setAccountNumber(bankToEdit.accountNumber || "");
        setAccountName(bankToEdit.accountName || "");
      } else {
        setBankName("");
        setAccountNumber("");
        setAccountName("");
      }
    }
  }, [isOpen, bankToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        bankName,
        accountNumber,
        accountName,
      };

      if (bankToEdit && bankToEdit._id) {
        await updateBank(bankToEdit._id, payload);
      } else {
        await createBank(payload);
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to save bank account:", error);
      if (onSuccess) onSuccess();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEditing = Boolean(bankToEdit);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Bank Account" : "Add New Bank Account"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 w-full">
          <div className="input-group-admin">
            <label htmlFor="bankName">Bank Name</label>
            <input
              type="text"
              id="bankName"
              name="bankName"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="e. g. Mandiri, BCA, BRI"
              required
            />
          </div>
          <div className="input-group-admin">
            <label htmlFor="accountNumber">Account Number</label>
            <input
              type="text"
              id="accountNumber"
              name="accountNumber"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="123124344234234"
              required
            />
          </div>
          <div className="input-group-admin">
            <label htmlFor="accountName">Account Name / Holder</label>
            <input
              type="text"
              id="accountName"
              name="accountName"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Holder Name as registered on the account"
              required
            />
          </div>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="ml-auto mt-3 rounded-lg disabled:opacity-50"
        >
          {isSubmitting
            ? isEditing
              ? "Saving..."
              : "Creating..."
            : isEditing
            ? "Save Changes"
            : "Create Bank Account"}
        </Button>
      </form>
    </Modal>
  );
};

export default BankInfoModal;