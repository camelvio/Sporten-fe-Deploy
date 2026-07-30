"use client";

import Button from "@/app/(landing)/components/ui/button";
import { FiPlus } from "react-icons/fi";
import ProductTable from "../../components/products/product-table";
import ProductModal from "../../components/products/product-modal";
import DeleteModal from "../../components/ui/delete-modal";
import { useState, useEffect, useCallback } from "react";
import { getAllProducts, deleteProduct } from "@/app/services/product.service";
import { Product } from "@/app/types";

const ProductManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAllProducts();
      if (Array.isArray(data) && data.length > 0) {
        setProducts(data);
      }
    } catch (error) {
      console.log("Failed to fetch products from API, using local state", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleOpenAddModal = () => {
    setProductToEdit(null);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setProductToEdit(null);
  };

  const handleEdit = (product: Product) => {
    setProductToEdit(product);
    setIsOpen(true);
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
  };

  const handleCloseDeleteModal = () => {
    setProductToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);

    try {
      if (productToDelete._id) {
        await deleteProduct(productToDelete._id);
      }
    } catch (error) {
      console.log("Failed to delete product via API, removing from local state", error);
    } finally {
      // Remove from local state and refresh
      setProducts((prev) => prev.filter((p) => p._id !== productToDelete._id));
      setIsDeleting(false);
      setProductToDelete(null);
      fetchProducts();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Product Management</h1>
          <p className="opacity-50">Manage your inventory, prices and stock.</p>
        </div>
        <Button className="rounded-lg" onClick={handleOpenAddModal}>
          <FiPlus size={24} />
          Add Product
        </Button>
      </div>

      <ProductTable
        products={products.length > 0 ? products : undefined}
        isLoading={isLoading && products.length === 0}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <ProductModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        productToEdit={productToEdit}
        onSuccess={fetchProducts}
      />

      <DeleteModal
        isOpen={Boolean(productToDelete)}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        itemName={productToDelete?.name}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default ProductManagement;