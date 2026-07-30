import priceFormatter from "@/app/utils/price-formatter";
import { FiEye } from "react-icons/fi";
import { Transaction } from "@/app/types";

const transactionData = [
  {
    _id: "1",
    date: "23/02/2026 19:32",
    createdAt: "2026-02-23T19:32:00.000Z",
    customer: "John Doe",
    customerName: "John Doe",
    contact: "+123123123 ",
    customerContact: "+123123123",
    customerAddress: "Merdeka Street, Jakarta, Indonesia, 332122",
    total: 1500000,
    totalPayment: 1500000,
    status: "pending",
    paymentProof: "/images/payment-proof-dummy.png",
    purchasedItems: {
      productId: { name: "SportsOn Hyperfast Shoes", imageUrl: "/images/products/product-1.png", price: 500000 },
      qty: 3,
    },
  },
  {
    _id: "2",
    date: "23/02/2026 19:32",
    createdAt: "2026-02-23T19:32:00.000Z",
    customer: "John Doe 2",
    customerName: "John Doe 2",
    contact: "+123123123 ",
    customerContact: "+123123123",
    customerAddress: "Sudirman Street, Jakarta, Indonesia",
    total: 2500000,
    totalPayment: 2500000,
    status: "rejected",
    paymentProof: "/images/payment-proof-dummy.png",
    purchasedItems: {
      productId: { name: "SportsOn Product 2", imageUrl: "/images/products/product-2.png", price: 500000 },
      qty: 5,
    },
  },
  {
    _id: "3",
    date: "23/02/2026 19:32",
    createdAt: "2026-02-23T19:32:00.000Z",
    customer: "John Doe 3",
    customerName: "John Doe 3",
    contact: "+123123123 ",
    customerContact: "+123123123",
    customerAddress: "Gajah Mada Street, Jakarta, Indonesia",
    total: 1000000,
    totalPayment: 1000000,
    status: "paid",
    paymentProof: "/images/payment-proof-dummy.png",
    purchasedItems: {
      productId: { name: "SportsOn Product 3", imageUrl: "/images/products/product-3.png", price: 350000 },
      qty: 2,
    },
  },
];

type TTransactionTableProps = {
  transactions?: Transaction[] | any[];
  onViewDetails?: (transaction: any) => void;
  isLoading?: boolean;
};

const TransactionTable = ({
  transactions,
  onViewDetails,
  isLoading = false,
}: TTransactionTableProps) => {
  const displayTransactions =
    transactions && transactions.length > 0
      ? transactions
      : transactions
      ? []
      : transactionData;

  const getStatusColor = (status: string = "pending") => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-600 border-yellow-300";
      case "rejected":
        return "bg-red-100 text-red-600 border-red-300";
      case "paid":
        return "bg-green-100 text-green-600 border-green-300";
      default:
        return "bg-gray-100 text-gray-600 border-gray-300";
    }
  };

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

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-4 font-semibold">Date</th>
            <th className="px-6 py-4 font-semibold">Customer</th>
            <th className="px-6 py-4 font-semibold">Contact</th>
            <th className="px-6 py-4 font-semibold">Total</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                Loading transactions...
              </td>
            </tr>
          ) : displayTransactions.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                No transactions available.
              </td>
            </tr>
          ) : (
            displayTransactions.map((data, index) => {
              const customerName = data.customerName || data.customer || "Customer";
              const contact = data.customerContact || data.contact || "-";
              const totalAmount = data.totalPayment !== undefined ? Number(data.totalPayment) : data.total || 0;
              const dateText = data.date || formatDate(data.createdAt);

              return (
                <tr
                  key={data._id || index}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <td className="px-6 py-4 font-medium">{dateText}</td>
                  <td className="px-6 py-4 font-medium">{customerName}</td>
                  <td className="px-6 py-4 font-medium">{contact}</td>
                  <td className="px-6 py-4 font-medium">
                    {priceFormatter(totalAmount)}
                  </td>

                  <td className="px-6 py-4 font-medium">
                    <div
                      className={`px-4 py-1 rounded-full border text-center w-fit text-sm uppercase font-semibold ${getStatusColor(
                        data.status
                      )}`}
                    >
                      {data.status}
                    </div>
                  </td>
                  <td className="px-6 py-7.5 flex items-center gap-3 text-gray-600">
                    <button
                      type="button"
                      onClick={() => onViewDetails && onViewDetails(data)}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 w-fit py-1 px-2 rounded-md transition-colors"
                    >
                      <FiEye size={18} />
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;