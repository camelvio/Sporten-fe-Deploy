import Image from "next/image";
import HeroSection from "./components/home/hero";
import CategoriesSection from "./components/home/categories";
import ProductsSection from "./components/home/products";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />
      <CategoriesSection />
      <ProductsSection />
    </main>
  );
}