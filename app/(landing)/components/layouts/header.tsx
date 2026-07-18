import Image from "next/image";
import Link from "next/link";
import { FiSearch, FiShoppingBag } from "react-icons/fi";

const Header = () => {
  return (
    <header className="w-full">
      <div className="flex justify-between items-center gap-10 container mx-auto py-7 px-4">
        {/* 1. Logo */}
        <Image
          src="/images/Logo.svg"
          alt="sporton logo"
          width={127}
          height={30}
          priority
        />
        
        {/* 2. Navigasi Menu (Lengkap dengan garis bawah aktif di menu Home) */}
        <nav className="flex gap-24 font-medium">
          <Link
            href="#"
            className="relative after:content-[''] after:block after:bg-primary after:rounded-full after:h-[3px] after:w-1/2 after:absolute after:left-1/2 after:-translate-x-1/2 after:translate-y-1"
          >
            Home
          </Link>
          <Link href="#">Category</Link>
          <Link href="#">Explore Products</Link>
        </nav>
        
        {/* 3. Ikon Fitur (Pencarian & Keranjang Belanja) */}
        <div className="flex gap-10 items-center">
          <FiSearch size={24} className="cursor-pointer" />
          <div className="relative cursor-pointer">
            <FiShoppingBag size={24} />
            {/* Badge angka 3 menggunakan bg-primary (oranye) */}
            <div className="bg-primary rounded-full w-3.5 h-3.5 absolute -top-1 -right-1 text-[10px] text-white flex items-center justify-center font-bold">
              {"3"}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;