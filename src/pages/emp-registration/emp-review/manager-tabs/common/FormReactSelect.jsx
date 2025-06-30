
import React, { useContext } from "react";
import Select from "react-select";
import { useFormContext, Controller } from "react-hook-form";
// If you're using ThemeContext, import it:
import { ThemeContext } from "../../../../../hooks/ThemeContext";

export default function FormReactSelect({
  label,
  name,
  options = [],
  loading = false,
  registerOptions = {},
  isMulti = false,
  requiredMessage,
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMsg = errors?.[name]?.message;

  // 1) If you are using a context to store 'dark' or 'light', do this:
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark";

  // 2) If you prefer a direct check of the 'dark' class on <html>:
//   const isDarkMode = document.documentElement.classList.contains("dark");

  // We'll pick some obvious colors so it's easy to see the difference.
  // For example, let's use #1f2937 in dark mode (Tailwind "slate-800").
  const customStyles = {
    control: (base, state) => ({
      ...base,
      // use a gray border if there's no error
      borderColor: errorMsg ? "red" : (isDarkMode ? "#4B5563" : base.borderColor),
      backgroundColor: isDarkMode ? "#1f2937" : "#fff",
      // text color on the control
      color: isDarkMode ? "#fff" : "#000",
      // For better contrast, can tweak box-shadow or border on focus
      boxShadow: state.isFocused
        ? isDarkMode
          ? "0 0 0 1px #4B5563"
          : "0 0 0 1px #2684FF"
        : null,
      "&:hover": {
        borderColor: errorMsg ? "red" : isDarkMode ? "#4B5563" : "#2684FF",
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: isDarkMode ? "#1f2937" : "#fff",
      zIndex: 9999,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? isDarkMode
          ? "#374151" // a bit lighter dark
          : "#f5f5f5" // a light hover
        : isDarkMode
        ? "#1f2937"
        : "#fff",
      color: isDarkMode ? "#fff" : "#000",
    }),
    singleValue: (base) => ({
      ...base,
      color: isDarkMode ? "#fff" : "#000",
    }),
    // For multi-select
    multiValue: (base) => ({
      ...base,
      backgroundColor: isDarkMode ? "#374151" : "#e2e8f0",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: isDarkMode ? "#fff" : "#000",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: isDarkMode ? "#fff" : "#000",
      ":hover": {
        backgroundColor: isDarkMode ? "#4B5563" : "#cbd5e1",
        color: "#fff",
      },
    }),
  };

  const isRequired = !!registerOptions.required || !!requiredMessage;

  return (
    <div className="mb-4 text-gray-900 dark:text-gray-100">
      <label className="block font-medium mb-1 text-gray-700 dark:text-gray-200">
        {label}{" "}
        {isRequired && <span className="text-red-500">*</span>}
      </label>

      <Controller
        name={name}
        control={control}
        rules={{
          ...registerOptions,
          validate: (value) => {
            // Multi-select required?
            if (isMulti && requiredMessage) {
              if (!value || value.length === 0) {
                return requiredMessage;
              }
            }
            // Single-select required?
            if (!isMulti && requiredMessage) {
              if (!value) {
                return requiredMessage;
              }
            }
            return true;
          },
        }}
        render={({ field: { onChange, value } }) => {
          if (isMulti) {
            // multi-select
            const selectedOptions = options.filter((opt) =>
              Array.isArray(value) ? value.includes(opt.value) : false
            );
            return (
              <Select
                isMulti
                options={options}
                isLoading={loading}
                value={selectedOptions}
                onChange={(selected) => {
                  const newValue = selected.map((item) => item.value);
                  onChange(newValue);
                }}
                styles={customStyles}
              />
            );
          } else {
            // single-select
            const selectedOption =
              options.find((opt) => opt.value === value) || null;
            return (
              <Select
                options={options}
                isLoading={loading}
                value={selectedOption}
                onChange={(selected) => {
                  onChange(selected ? selected.value : "");
                }}
                styles={customStyles}
              />
            );
          }
        }}
      />

      {errorMsg && (
        <p className="text-red-500 dark:text-red-400 text-sm mt-1">
          {errorMsg}
        </p>
      )}
    </div>
  );
}
