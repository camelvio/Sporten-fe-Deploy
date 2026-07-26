"use client";

import {
  FiArrowRight,
  FiChevronDown,
  FiChevronUp,
  FiShoppingBag,
} from "react-icons/fi";
import Button from "../ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/hooks/use-cart-store";
import { Product } from "@/app/types";

type TProductActionsProps = {
  product: Product;
  stock: number;
};

const ProductActions = ({ product, stock }: TProductActionsProps) => {
  const { addItem } = useCartStore();
  const { push } = useRouter();
  const [qty, setQty] = useState(1);

  const handleAddToCart = () => {
    addItem(product, qty);
  };

  const handleCheckout = () => {
    addItem(product, qty); // 📍 Tambahkan parameter qty di sini
    push("/checkout");
  };

  return (
    <div className="flex gap-4 items-center w-full">
      {/* Box Pengatur Qty */}
      <div className="border border-gray-400 flex h-12 w-20 shrink-0">
        <div className="flex-1 text-lg font-medium flex justify-center items-center">
          <span>{qty}</span>
        </div>
        <div className="flex flex-col border-l border-gray-400 w-7">
          <button
            type="button"
            className="border-b border-gray-400 cursor-pointer h-1/2 flex items-center justify-center hover:bg-gray-100"
            onClick={() => setQty(qty < stock ? qty + 1 : qty)}
          >
            <FiChevronUp size={14} />
          </button>
          <button
            type="button"
            className="cursor-pointer h-1/2 flex items-center justify-center hover:bg-gray-100"
            onClick={() => setQty(qty > 1 ? qty - 1 : qty)}
          >
            <FiChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* Tombol Add to Cart */}
      <Button 
        className="flex-1 h-12 justify-center gap-2 text-sm whitespace-nowrap" 
        onClick={handleAddToCart}
      >
        <FiShoppingBag size={20} />
        Add to Cart
      </Button>

      {/* Tombol Checkout Now */}
      <Button 
        variant="dark" 
        className="flex-1 h-12 justify-center gap-2 text-sm whitespace-nowrap" 
        onClick={handleCheckout}
      >
        Checkout Now
        <FiArrowRight size={20} />
      </Button>
    </div>
  );
};

export default ProductActions;