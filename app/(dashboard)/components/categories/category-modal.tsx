import Button from "@/app/(landing)/components/ui/button";
import Modal from "../ui/modal";
import ImageUploadPreview from "../ui/image-upload-preview";
import { useState, useEffect } from "react";
import { getImageUrl } from "@/app/lib/api";
import { createCategory, updateCategory } from "@/app/services/category.service";
import { Category } from "@/app/types";

type TCategoryModalProps = {
  isOpen: boolean;
  onClose: () => void;
  categoryToEdit?: Category | any | null;
  onSuccess?: () => void;
};

const CategoryModal = ({
  isOpen,
  onClose,
  categoryToEdit,
  onSuccess,
}: TCategoryModalProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (categoryToEdit) {
        setName(categoryToEdit.name || "");
        setDescription(categoryToEdit.description || "");
        setImageFile(null);
        if (categoryToEdit.imageUrl) {
          const imgSrc = categoryToEdit.imageUrl.startsWith("/") || categoryToEdit.imageUrl.startsWith("http")
            ? categoryToEdit.imageUrl
            : getImageUrl(categoryToEdit.imageUrl);
          setImagePreview(imgSrc);
        } else {
          setImagePreview(null);
        }
      } else {
        setName("");
        setDescription("");
        setImageFile(null);
        setImagePreview(null);
      }
    }
  }, [isOpen, categoryToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (categoryToEdit && categoryToEdit._id) {
        await updateCategory(categoryToEdit._id, formData);
      } else {
        await createCategory(formData);
      }

      if (onSuccess) onSuccess();
      onClose();
    } catch (error) {
      console.error("Failed to save category:", error);
      if (onSuccess) onSuccess();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEditing = Boolean(categoryToEdit);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Category" : "Add New Category"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex gap-7">
          <div className="min-w-50">
            <ImageUploadPreview
              label="Category Image"
              value={imagePreview}
              onChange={(file) => {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
              }}
            />
          </div>
          <div className="flex flex-col gap-4 w-full">
            <div className="input-group-admin">
              <label htmlFor="categoryName">Category Name</label>
              <input
                type="text"
                id="categoryName"
                name="categoryName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e. g. Running"
                required
              />
            </div>

            <div className="input-group-admin">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Category Details..."
              ></textarea>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="ml-auto mt-3 rounded-lg disabled:opacity-50"
        >
          {isSubmitting
            ? isEditing
              ? "Saving..."
              : "Creating..."
            : isEditing
            ? "Save Changes"
            : "Create Category"}
        </Button>
      </form>
    </Modal>
  );
};

export default CategoryModal;