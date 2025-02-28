import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../service/axiosInstance";
import { toast } from "react-hot-toast";

const useCategoryStore = create(
  persist(
    (set) => ({
      categories: [],
      loading: false,
      error: null,

      // Fetch all categories
      fetchCategories: async () => {
        set({ loading: true, error: null });
        try {
          const response = await axiosInstance.get("/categories");
          const data = response.data;
          if (data.success) {
            set({ categories: data.data });
          } else {
            throw new Error(data.message || "Failed to fetch categories");
          }
        } catch (error) {
          set({ error: error.message || "Failed to fetch categories" });
          toast.error(error.message || "Failed to fetch categories");
        } finally {
          set({ loading: false });
        }
      },

      // Create a new category
      createCategory: async (name) => {
        set({ loading: true });
        try {
          const response = await axiosInstance.post("/categories", { name });
          const data = response.data;
          if (data.success) {
            // Update local store
            set((state) => ({
              categories: [...state.categories, data.data],
            }));
            toast.success(data.message || "Category created successfully");
          } else {
            throw new Error(data.message || "Failed to create category");
          }
        } catch (error) {
          set({ error: error.message || "Failed to create category" });
          toast.error(error.message || "Failed to create category");
        } finally {
          set({ loading: false });
        }
      },

      // Delete a category by id
      deleteCategory: async (id) => {
        set({ loading: true });
        try {
          const response = await axiosInstance.delete(`/categories/${id}`);
          const data = response.data;
          if (data.success) {
            // Remove category from the store
            set((state) => ({
              categories: state.categories.filter((cat) => cat._id !== id),
            }));
            toast.success(data.message || "Category deleted successfully");
          } else {
            throw new Error(data.message || "Failed to delete category");
          }
        } catch (error) {
          set({ error: error.message || "Failed to delete category" });
          toast.error(error.message || "Failed to delete category");
        } finally {
          set({ loading: false });
        }
      },
      
    }),
    {
      name: "category-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useCategoryStore;
