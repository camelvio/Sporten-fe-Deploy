import priceFormatter from "@/app/utils/price-formatter";
import Image from "next/image";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { getImageUrl } from "@/app/lib/api";
import { Product } from "@/app/types";

const productData = [
  {
    _id: "1",
    name: "SportOn Product 1",
    imageUrl: "/images/products/product-1.png",
    category: "Running",
    price: 289000,
    stock: 3,
    description: "SportOn Product 1 description",
  },
  {
    _id: "2",
    name: "SportOn Product 2",
    imageUrl: "/images/products/product-2.png",
    category: "Running",
    price: 229000,
    stock: 5,
    description: "SportOn Product 2 description",
  },
  {
    _id: "3",
    name: "SportOn Product 3",
    imageUrl: "/images/products/product-3.png",
    category: "Running",
    price: 350000,
    stock: 10,
    description: "SportOn Product 3 description",
  },
];

type TProductTableProps = {
  products?: Product[] | any[];
  onEdit?: (product: any) => void;
  onDelete?: (product: any) => void;
  isLoading?: boolean;
};

const ProductTable = ({
  products,
  onEdit,
  onDelete,
  isLoading = false,
}: TProductTableProps) => {
  const displayProducts = products && products.length > 0 ? products : (products ? [] : productData);

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-4 font-semibold">Product</th>
            <th className="px-6 py-4 font-semibold">Category</th>
            <th className="px-6 py-4 font-semibold">Price</th>
            <th className="px-6 py-4 font-semibold">Stock</th>
            <th className="px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                Loading products...
              </td>
            </tr>
          ) : displayProducts.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                No products available.
              </td>
            </tr>
          ) : (
            displayProducts.map((data, index) => {
              const categoryName =
                typeof data.category === "object" && data.category !== null
                  ? data.category.name
                  : data.category || "-";

              const imgSrc = data.imageUrl?.startsWith("/") || data.imageUrl?.startsWith("http")
                ? data.imageUrl
                : getImageUrl(data.imageUrl);

              return (
                <tr
                  key={data._id || index}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <td className="px-6 py-4 font-medium">
                    <div className="flex gap-2 items-center">
                      <div className="aspect-square bg-gray-100 rounded-md relative overflow-hidden w-[52px] h-[52px]">
                        <Image
                          src={imgSrc || "/images/products/product-1.png"}
                          width={52}
                          height={52}
                          alt={data.name || "Product"}
                          className="aspect-square object-contain"
                        />
                      </div>
                      <span>{data.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">
                    <div className="rounded-md bg-gray-200 px-2 py-1 w-fit">
                      {categoryName}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {priceFormatter(data.price || 0)}
                  </td>
                  <td className="px-6 py-4 font-medium">{data.stock || 0} units</td>
                  <td className="px-6 py-7.5 flex items-center gap-3 text-gray-600">
                    <button
                      type="button"
                      onClick={() => onEdit && onEdit(data)}
                      className="cursor-pointer hover:text-blue-600 transition-colors p-1"
                      title="Edit Product"
                    >
                      <FiEdit2 size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete && onDelete(data)}
                      className="cursor-pointer hover:text-red-600 transition-colors p-1"
                      title="Delete Product"
                    >
                      <FiTrash2 size={20} />
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

export default ProductTable;