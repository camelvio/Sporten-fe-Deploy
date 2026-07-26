"use client";

import priceFormatter from "@/app/utils/price-formatter";
import Image from "next/image";
import Button from "./button";
import { FiArrowRight, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/app/hooks/use-cart-store"; // 📍 Import store Zustand
import { getImageUrl } from "@/app/lib/api"; // 📍 Import helper gambar dari backend

const CartPopup = () => {
  const { push } = useRouter();
  
  // 📍 Ambil items dan fungsi removeItem dari Zustand
  const { items, removeItem } = useCartStore();

  // Hitung total harga berdasarkan items asli di Zustand
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const handleCheckout = () => {
    push("/checkout");
  };

  return (
    <div className="absolute bg-white right-0 top-12 shadow-xl shadow-black/10 border border-gray-200 w-90 z-10 text-black">
      <div className="p-4 border-b border-gray-200 font-bold text-center">
        Shopping Cart
      </div>

      {/* 📍 Jika keranjang kosong, tampilkan pesan ini */}
      {items.length === 0 ? (
        <div className="p-6 text-center text-gray-400 text-sm">
          Your shopping cart is empty
        </div>
      ) : (
        <>
          {/* 📍 Mapping data items ASLI dari Zustand */}
          <div className="max-h-80 overflow-y-auto">
            {items.map((item) => (
              <div className="border-b border-gray-200 p-4 flex gap-3" key={item._id}>
                <div className="bg-primary-light aspect-square w-16 flex justify-center items-center">
                  <Image
                    src={getImageUrl(item.imgUrl || item.imgUrl || "")}
                    width={63}
                    height={63}
                    alt={item.name}
                    className="aspect-square object-contain"
                  />
                </div>
                <div className="self-center flex-1">
                  <div className="text-sm font-medium line-clamp-1">{item.name}</div>
                  <div className="flex gap-3 font-medium text-xs">
                    <div>{item.qty}x</div>
                    <div className="text-primary">{priceFormatter(item.price)}</div>
                  </div>
                </div>

                {/* 📍 Pasang onClick={() => removeItem(item._id)} di tombol ini */}
                <Button
                  size="small"
                  variant="ghost"
                  className="w-7 h-7 p-0! self-center ml-auto text-red-500 hover:text-red-700"
                  onClick={() => removeItem(item._id)}
                >
                  <FiTrash2 />
                </Button>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 p-4">
            <div className="flex justify-between font-semibold">
              <div className="text-sm">Total</div>
              <div className="text-primary text-xs">
                {priceFormatter(totalPrice)}
              </div>
            </div>
            <Button
              variant="dark"
              size="small"
              className="w-full mt-4"
              onClick={handleCheckout}
            >
              Checkout Now <FiArrowRight />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPopup;