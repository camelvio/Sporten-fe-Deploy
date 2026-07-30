import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import { useState } from "react";
import Image from "next/image";
import priceFormatter from "@/app/utils/price-formatter";
import { FiCheck, FiX } from "react-icons/fi";
import { getImageUrl } from "@/app/lib/api";
import { Transaction } from "@/app/types";

type TTransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction | any | null;
  onUpdateStatus?: (id: string, newStatus: "paid" | "rejected") => Promise<void> | void;
};

const TransactionModal = ({
  isOpen,
  onClose,
  transaction,
  onUpdateStatus,
}: TTransactionModalProps) => {
  const [isUpdating, setIsUpdating] = useState(false);

  if (!transaction) return null;

  const handleAction = async (newStatus: "paid" | "rejected") => {
    if (!transaction._id) return;
    setIsUpdating(true);
    try {
      if (onUpdateStatus) {
        await onUpdateStatus(transaction._id, newStatus);
      }
      onClose();
    } catch (error) {
      console.error("Failed to update status", error);
      onClose();
    } finally {
      setIsUpdating(false);
    }
  };

  const proofUrl =
    transaction.paymentProof &&
    (transaction.paymentProof.startsWith("/") || transaction.paymentProof.startsWith("http"))
      ? transaction.paymentProof
      : getImageUrl(transaction.paymentProof) || "/images/payment-proof-dummy.png";

  const customerName = transaction.customerName || transaction.customer || "John Doe";
  const contact = transaction.customerContact || transaction.contact || "+123123123";
  const address = transaction.customerAddress || "Merdeka Street, Jakarta, Indonesia";
  const totalAmount =
    transaction.totalPayment !== undefined ? Number(transaction.totalPayment) : transaction.total || 450000;

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "23/02/2026 19:32";
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  const dateText = transaction.date || formatDate(transaction.createdAt);

  const purchasedItem = transaction.purchasedItems;
  const itemProduct = typeof purchasedItem?.productId === "object" ? purchasedItem.productId : null;
  const itemName = itemProduct?.name || "SportsOn Hyperfast Shoes";
  const itemQty = purchasedItem?.qty || 3;
  const itemImg = itemProduct?.imageUrl
    ? itemProduct.imageUrl.startsWith("/") || itemProduct.imageUrl.startsWith("http")
      ? itemProduct.imageUrl
      : getImageUrl(itemProduct.imageUrl)
    : "/images/products/product-1.png";

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Verify Transactions">
      <div className="flex gap-6">
        <div>
          <h4 className="font-semibold text-sm mb-2">Payment Proof</h4>
          <div className="relative w-[200px] h-[300px] rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
            <Image
              src={proofUrl}
              alt="payment proof"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm mb-2">Order Details</h4>
          <div className="bg-gray-100 rounded-md flex flex-col gap-2.5 p-4 text-sm mb-5">
            <div className="flex justify-between font-medium">
              <div className="opacity-50">Date</div>
              <div className="text-right">{dateText}</div>
            </div>
            <div className="flex justify-between font-medium">
              <div className="opacity-50">Customer</div>
              <div className="text-right">{customerName}</div>
            </div>
            <div className="flex justify-between font-medium">
              <div className="opacity-50">Contact</div>
              <div className="text-right">{contact}</div>
            </div>
            <div className="flex justify-between gap-10 font-medium">
              <div className="opacity-50 whitespace-nowrap">
                Shipping Address
              </div>
              <div className="text-right">{address}</div>
            </div>
          </div>

          <h4 className="font-semibold text-sm mb-2">Items Purchased</h4>
          <div className="border border-gray-200 rounded-lg p-2 flex items-center gap-2">
            <div className="bg-gray-100 rounded aspect-square w-8 h-8 relative overflow-hidden">
              <Image
                src={itemImg}
                width={30}
                height={30}
                alt="product image"
                className="object-contain"
              />
            </div>
            <div className="font-medium text-sm">{itemName}</div>
            <div className="font-medium ml-auto text-sm">{itemQty} units</div>
          </div>
          <div className="flex justify-between text-sm mt-6">
            <h4 className="font-semibold">Total</h4>
            <div className="text-primary font-semibold">
              {priceFormatter(totalAmount)}
            </div>
          </div>
          <div className="flex justify-end gap-5 mt-8">
            <Button
              type="button"
              disabled={isUpdating}
              onClick={() => handleAction("rejected")}
              className="text-primary! bg-primary-light! rounded-md cursor-pointer hover:opacity-80 disabled:opacity-50"
              size="small"
            >
              <FiX size={20} />
              Reject
            </Button>
            <Button
              type="button"
              disabled={isUpdating}
              onClick={() => handleAction("paid")}
              className="text-white! bg-[#50C252]! rounded-md cursor-pointer hover:opacity-80 disabled:opacity-50"
              size="small"
            >
              <FiCheck size={20} />
              Approve
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TransactionModal;