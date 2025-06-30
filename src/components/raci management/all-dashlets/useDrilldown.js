// src/hooks/useDrilldown.js
import { useState } from "react";
import axios from "axios";
import axiosInstance from "../../../service/axiosInstance";



/**
 * Hook to pull detail rows for any dashboard card
 * and toggle the <DetailModal>.
 */
export const useDrilldown = () => {
  const [open,    setOpen]    = useState(false);
  const [rows,    setRows]    = useState([]);        // array of objects
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  /**
   * @param {string} key     "absenteeism" | "aadhaar" | …
   * @param {object} params  optional query params (month, year, …)
   */
  const fetch = async (key, params = {}) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axiosInstance.get(
        `/analytics-dashboards-cards/graph-detail/${key}`,   // <-- matches Express
        { params }
      );

      if (data?.success) {
              // quick client‑side massaging of obviously bulky shapes
              let tidy = data.data || [];
        
              // Staffing optimisation → flatten
              if (key === "staffing") {
                tidy = tidy.map(({ shift, users }) => ({
                  shift: `${shift.shiftName} (${shift.startTime}-${shift.endTime})`,
                  userCount: users.length,
                }));
              }
        
              setRows(tidy);
            }
      else               setError(data?.message || "Unknown error");

    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
      setOpen(true);
    }
  };

  return { open, rows, loading, error, fetch, close: () => setOpen(false) };
};
