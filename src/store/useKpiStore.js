
import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "../service/axiosInstance"; // your configured axios instance

export const useKpiStore = create((set, get) => ({
  designations: [],
  kpis: [],
  loading: false,
  selectedDesignation: "",

  // ----- Set the selected designation -----
  setSelectedDesignation: (designation) => {
    set({ selectedDesignation: designation });
  },

  // ----- Fetch all designations from the server -----
  fetchDesignations: async () => {
    try {
      set({ loading: true });
      const res = await axios.get("kpi/designations");
      const designations = res.data?.data || [];
      set({ designations, loading: false });
    } catch (error) {
      console.error("Error fetching designations:", error);
      toast.error("Failed to fetch designations");
      set({ loading: false });
    }
  },

  // ----- Fetch KPIs for a given designation -----
  fetchKpisByDesignation: async (designation) => {
    if (!designation) {
      // If empty, clear existing KPIs
      set({ kpis: [] });
      return;
    }
    try {
      set({ loading: true });
      const res = await axios.get(
        `kpi/kpisbyname?designation=${encodeURIComponent(designation)}`
      );
      const kpis = res.data?.data || [];
      set({ kpis, loading: false });
    } catch (error) {
      console.error("Error fetching KPIs:", error);
      toast.error("Failed to fetch KPIs");
      set({ loading: false });
    }
  },

  // ----- Add a new KPI -----
  addKpi: async (name, weightValue) => {
    // 1) Parse the weight to float
    const weight = parseFloat(weightValue);
    if (isNaN(weight)) {
      toast.error("Weight must be a valid number.");
      return;
    }

    // 2) Validate
    if (!name.trim() || weight < 0 || weight > 100) {
      toast.error("Please provide a valid name and weight (0 <= weight <= 100).");
      return;
    }

    const { kpis, selectedDesignation } = get();

    // 3) Sum existing KPI weights + new weight
    //    parseFloat for each existing KPI to avoid string issues
    const totalWeight =
      kpis.reduce((acc, k) => acc + parseFloat(k.weight || 0), 0) + weight;

    // 4) Add a tiny tolerance to avoid floating overflows like 100.000000002
    if (totalWeight > 100 + 0.000001) {
      toast.error("Total weight exceeds 100%. Please adjust the KPI weights.");
      return;
    }

    try {
      set({ loading: true });
      const res = await axios.post("kpi/kpis", {
        designation: selectedDesignation,
        name,
        weight,
      });

      const createdKpi = res.data?.data;
      set({ kpis: [...kpis, createdKpi], loading: false });
      toast.success("KPI added successfully!");
    } catch (error) {
      console.error("Error adding KPI:", error);
      toast.error(error.response?.data?.message || "Failed to add KPI.");
      set({ loading: false });
    }
  },

  // ----- Update an existing KPI -----
  updateKpi: async (id, name, weightValue) => {
    // 1) Parse weight
    const weight = parseFloat(weightValue);
    if (isNaN(weight)) {
      toast.error("Weight must be a valid number.");
      return;
    }
    // 2) Validate basic range
    if (!name.trim() || weight < 0 || weight > 100) {
      toast.error("Please provide a valid name and weight (0 <= weight <= 100).");
      return;
    }

    const { kpis } = get();

    // 3) Find the KPI being updated
    const oldKpi = kpis.find((k) => k._id === id);
    if (!oldKpi) {
      toast.error("KPI not found.");
      return;
    }

    // 4) Sum the weights of all other KPIs (exclude the one we’re editing),
    //    then add the new weight
    const sumOtherKpis = kpis
      .filter((k) => k._id !== id)
      .reduce((acc, k) => acc + parseFloat(k.weight || 0), 0);

    const totalWeight = sumOtherKpis + weight;

    // 5) Check with small tolerance
    if (totalWeight > 100 + 0.000001) {
      toast.error("Total weight exceeds 100%. Please adjust the KPI weights.");
      return;
    }

    // 6) Call API
    try {
      set({ loading: true });
      await axios.put(`kpi/kpis/${id}`, { name, weight });

      // 7) Update local store
      const updatedKpis = kpis.map((k) =>
        k._id === id ? { ...k, name, weight } : k
      );
      set({ kpis: updatedKpis, loading: false });
      toast.success("KPI updated successfully!");
    } catch (error) {
      console.error("Error updating KPI:", error);
      toast.error(error.response?.data?.message || "Failed to update KPI.");
      set({ loading: false });
    }
  },

  // ----- Delete a KPI -----
  deleteKpi: async (id) => {
    const { kpis } = get();
    try {
      set({ loading: true });
      await axios.delete(`kpi/kpis/${id}`);
      const filtered = kpis.filter((k) => k._id !== id);
      set({ kpis: filtered, loading: false });
      toast.success("KPI deleted successfully!");
    } catch (error) {
      console.error("Error deleting KPI:", error);
      toast.error("Failed to delete KPI.");
      set({ loading: false });
    }
  },
}));
