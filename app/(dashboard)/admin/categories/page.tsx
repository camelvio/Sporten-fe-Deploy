"use client";

import Button from "@/app/(landing)/components/ui/button";
import { FiPlus } from "react-icons/fi";
import CategoryTable from "../../components/categories/category-table";
import CategoryModal from "../../components/categories/category-modal";
import DeleteModal from "../../components/ui/delete-modal";
import { useState, useEffect, useCallback } from "react";
import { getAllCategories, deleteCategory } from "@/app/services/category.service";
import { Category } from "@/app/types";

const CategoryManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getAllCategories();
      if (Array.isArray(data) && data.length > 0) {
        setCategories(data);
      }
    } catch (error) {
      console.log("Failed to fetch categories from API, using default list", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleOpenAddModal = () => {
    setCategoryToEdit(null);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setCategoryToEdit(null);
  };

  const handleEdit = (category: Category) => {
    setCategoryToEdit(category);
    setIsOpen(true);
  };

  const handleDeleteClick = (category: Category) => {
    setCategoryToDelete(category);
  };

  const handleCloseDeleteModal = () => {
    setCategoryToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;
    setIsDeleting(true);

    try {
      if (categoryToDelete._id) {
        await deleteCategory(categoryToDelete._id);
      }
    } catch (error) {
      console.log("Failed to delete category via API, updating state", error);
    } finally {
      setCategories((prev) => prev.filter((c) => c._id !== categoryToDelete._id));
      setIsDeleting(false);
      setCategoryToDelete(null);
      fetchCategories();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="font-bold text-2xl">Category Management</h1>
          <p className="opacity-50">Organize your products into categories.</p>
        </div>
        <Button className="rounded-lg" onClick={handleOpenAddModal}>
          <FiPlus size={24} />
          Add Category
        </Button>
      </div>

      <CategoryTable
        categories={categories.length > 0 ? categories : undefined}
        isLoading={isLoading && categories.length === 0}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <CategoryModal
        isOpen={isOpen}
        onClose={handleCloseModal}
        categoryToEdit={categoryToEdit}
        onSuccess={fetchCategories}
      />

      <DeleteModal
        isOpen={Boolean(categoryToDelete)}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete Category"
        itemName={categoryToDelete?.name}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default CategoryManagement;