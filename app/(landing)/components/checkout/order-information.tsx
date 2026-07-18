import CardWithHeader from "../ui/card-with-header";

const OrderInformation = () => {
  return (
    <CardWithHeader title="Order Information">
      {/* Kasih padding p-5 dan flex flex-col gap-5 agar tiap form-group ada jarak ke bawah */}
      <div className="p-5 flex flex-col gap-5">
        
        {/* 1. Form Group: Full Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="full_name" className="text-xs font-semibold text-dark">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Type your full name"
            id="full_name"
            className="w-full bg-gray-100 text-sm p-3.5 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary/50 text-dark placeholder:text-gray-400"
          />
        </div>

        {/* 2. Form Group: Whatsapp Number */}
        <div className="flex flex-col gap-2">
          <label htmlFor="wa_number" className="text-xs font-semibold text-dark">
            Whatsapp Number
          </label>
          <input
            type="text"
            placeholder="+62xxxx"
            id="wa_number"
            className="w-full bg-gray-100 text-sm p-3.5 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary/50 text-dark placeholder:text-gray-400"
          />
        </div>

        {/* 3. Form Group: Shipping Address */}
        <div className="flex flex-col gap-2">
          <label htmlFor="shipping_address" className="text-xs font-semibold text-dark">
            Shipping Address
          </label>
          <textarea
            placeholder="Example Street, 18, West Jakarta, Indonesia, 66521"
            id="shipping_address"
            rows={5}
            className="w-full bg-gray-100 text-sm p-3.5 rounded-sm focus:outline-none focus:ring-1 focus:ring-primary/50 text-dark resize-none placeholder:text-gray-400"
          />
        </div>

      </div>
    </CardWithHeader>
  );
};

export default OrderInformation;