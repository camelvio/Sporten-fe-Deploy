import Button from "@/app/(landing)/components/ui/button";
import Modal from "./modal";
import { FiAlertTriangle } from "react-icons/fi";

type TDeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  itemName?: string;
  isLoading?: boolean;
};

const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Product",
  itemName,
  isLoading = false,
}: TDeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col items-center text-center py-4 gap-4">
        <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
          <FiAlertTriangle size={32} />
        </div>
        <div>
          <h4 className="font-semibold text-lg">Are you sure?</h4>
          <p className="text-gray-500 mt-1">
            {itemName ? (
              <>
                Do you really want to delete &quot;<span className="font-semibold text-gray-800">{itemName}</span>&quot;?
              </>
            ) : (
              "Do you really want to delete this item?"
            )}
            <br />
            This action cannot be undone.
          </p>
        </div>
        <div className="flex justify-end gap-3 w-full mt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-lg border border-gray-300 font-medium hover:bg-gray-50 cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-5 py-2.5 disabled:opacity-50"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
