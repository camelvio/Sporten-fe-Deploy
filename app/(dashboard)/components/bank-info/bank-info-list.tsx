import { FiCreditCard, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Bank } from "@/app/types";

const bankData = [
  {
    _id: "1",
    bankName: "BCA",
    accountNumber: "123123",
    accountName: "PT SportOn Digital Indonesia",
  },
  {
    _id: "2",
    bankName: "Mandiri",
    accountNumber: "1212312313123",
    accountName: "PT SportOn Digital Indonesia",
  },
  {
    _id: "3",
    bankName: "BRI",
    accountNumber: "1123123123",
    accountName: "PT SportOn Digital Indonesia",
  },
];

type TBankInfoListProps = {
  banks?: Bank[] | any[];
  onEdit?: (bank: any) => void;
  onDelete?: (bank: any) => void;
  isLoading?: boolean;
};

const BankInfoList = ({
  banks,
  onEdit,
  onDelete,
  isLoading = false,
}: TBankInfoListProps) => {
  const displayBanks = banks && banks.length > 0 ? banks : (banks ? [] : bankData);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
        Loading bank accounts...
      </div>
    );
  }

  if (displayBanks.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center text-gray-500">
        No bank accounts available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-8">
      {displayBanks.map((data, index) => (
        <div
          className="bg-white rounded-lg border border-gray-200"
          key={data._id || index}
        >
          <div className="flex justify-between p-5">
            <div className="flex gap-2 items-center">
              <div className="bg-blue-50 text-blue-600 rounded w-12 h-12 flex justify-center items-center">
                <FiCreditCard size={24} />
              </div>
              <div>
                <div className="font-semibold">{data.bankName}</div>
                <div className="text-xs opacity-50">Bank Transfer</div>
              </div>
            </div>
            <div className="flex gap-2 -mt-5 text-gray-600">
              <button
                type="button"
                onClick={() => onEdit && onEdit(data)}
                className="cursor-pointer hover:text-blue-600 transition-colors p-1"
                title="Edit Bank Account"
              >
                <FiEdit2 size={20} />
              </button>
              <button
                type="button"
                onClick={() => onDelete && onDelete(data)}
                className="cursor-pointer hover:text-red-600 transition-colors p-1"
                title="Delete Bank Account"
              >
                <FiTrash2 size={20} />
              </button>
            </div>
          </div>
          <div className="p-5 font-medium">
            <div className="text-xs opacity-50">ACCOUNT NUMBER</div>
            <div>{data.accountNumber}</div>
          </div>
          <div className="border-t border-gray-200 px-5 py-3 text-xs">
            <span className="opacity-50">Holder :</span>{" "}
            {data.accountName || "PT SportsOn Digital"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BankInfoList;