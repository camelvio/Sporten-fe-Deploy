"use client";

import CardWithHeader from "../ui/card-with-header";
import { CustomerInfo } from "@/app/hooks/use-cart-store";

type TOrderInformation = {
  formData: CustomerInfo;
  setFormData: React.Dispatch<React.SetStateAction<CustomerInfo>>;
};

const OrderInformation = ({ formData, setFormData }: TOrderInformation) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <CardWithHeader title="Order Information">
      <div className="p-5 flex flex-col gap-5">
        {/* Input 1: Full Name */}
        <div className="flex flex-col gap-2">
          <label 
            htmlFor="customerName" 
            className="text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            Full Name
          </label>
          <input
            type="text"
            placeholder="Type your full name"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
          />
        </div>

        {/* Input 2: Whatsapp Number */}
        <div className="flex flex-col gap-2">
          <label 
            htmlFor="customerContact" 
            className="text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            Whatsapp Number
          </label>
          <input
            type="number"
            placeholder="Type your whatsapp number"
            id="customerContact"
            name="customerContact"
            value={formData.customerContact ?? ""}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
          />
        </div>

        {/* Input 3: Shipping Address */}
        <div className="flex flex-col gap-2">
          <label 
            htmlFor="customerAddress" 
            className="text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            Shipping Address
          </label>
          <textarea
            placeholder="Type your shipping address"
            id="customerAddress"
            name="customerAddress"
            rows={5}
            value={formData.customerAddress}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition resize-none"
          />
        </div>
      </div>
    </CardWithHeader>
  );
};

export default OrderInformation;