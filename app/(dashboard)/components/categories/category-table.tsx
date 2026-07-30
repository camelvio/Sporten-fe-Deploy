import Image from "next/image";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { getImageUrl } from "@/app/lib/api";
import { Category } from "@/app/types";

const categoryData = [
  {
    _id: "1",
    name: "Running",
    imageUrl: "/images/categories/category-running.png",
    description: "All Running Items, Shoes, Shirts, Apparels, and Accessories",
  },
  {
    _id: "2",
    name: "Football",
    imageUrl: "/images/categories/category-football.png",
    description: "All Football Items, Shoes, Shirts, Balls, and Gear",
  },
];

type TCategoryTableProps = {
  categories?: Category[] | any[];
  onEdit?: (category: any) => void;
  onDelete?: (category: any) => void;
  isLoading?: boolean;
};

const CategoryTable = ({
  categories,
  onEdit,
  onDelete,
  isLoading = false,
}: TCategoryTableProps) => {
  const displayCategories = categories && categories.length > 0 ? categories : (categories ? [] : categoryData);

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="px-6 py-4 font-semibold">Category Name</th>
            <th className="px-6 py-4 font-semibold">Description</th>
            <th className="px-6 py-4 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                Loading categories...
              </td>
            </tr>
          ) : displayCategories.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                No categories available.
              </td>
            </tr>
          ) : (
            displayCategories.map((data, index) => {
              const imgSrc = data.imageUrl?.startsWith("/") || data.imageUrl?.startsWith("http")
                ? data.imageUrl
                : getImageUrl(data.imageUrl);

              const descriptionText =
                data.description &&
                data.description.trim() !== "" &&
                !data.description.toLowerCase().includes("lorem ipsum")
                  ? data.description
                  : `All ${data.name || "Category"} Items, Shoes, Shirts, and Accessories`;

              return (
                <tr
                  key={data._id || index}
                  className="border-b border-gray-200 last:border-b-0"
                >
                  <td className="px-6 py-4 font-medium">
                    <div className="flex gap-2 items-center">
                      <div className="aspect-square bg-gray-100 rounded-md relative overflow-hidden w-[52px] h-[52px]">
                        <Image
                          src={imgSrc || "/images/categories/category-running.png"}
                          width={52}
                          height={52}
                          alt={data.name || "Category"}
                          className="aspect-square object-contain"
                        />
                      </div>
                      <span>{data.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{descriptionText}</td>
                  <td className="px-6 py-7.5 flex items-center gap-3 text-gray-600">
                    <button
                      type="button"
                      onClick={() => onEdit && onEdit(data)}
                      className="cursor-pointer hover:text-blue-600 transition-colors p-1"
                      title="Edit Category"
                    >
                      <FiEdit2 size={20} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete && onDelete(data)}
                      className="cursor-pointer hover:text-red-600 transition-colors p-1"
                      title="Delete Category"
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

export default CategoryTable;