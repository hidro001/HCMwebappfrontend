import React from "react";
import Select from "react-select";
import { useFormContext, Controller } from "react-hook-form";

export default function FormMultiSelect({ label, name, options = [], loading = false, requiredMessage }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMsg = errors?.[name]?.message;
  const isRequired = !!requiredMessage;
  
  // Basic dark mode check
  const isDarkMode =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  const customStyles = {
    control: (base) => ({
      ...base,
      borderColor: errorMsg ? "red" : base.borderColor,
      backgroundColor: isDarkMode ? "#374151" : "#fff",
      color: isDarkMode ? "#fff" : "#000",
      "&:hover": {
        borderColor: errorMsg ? "red" : base.borderColor,
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: isDarkMode ? "#374151" : "#fff",
      color: isDarkMode ? "#fff" : "#000",
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused
        ? isDarkMode ? "#4B5563" : "#f5f5f5"
        : isDarkMode ? "#374151" : "#fff",
      color: isDarkMode ? "#fff" : "#000",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: isDarkMode ? "#4B5563" : "#e2e8f0",
      color: isDarkMode ? "#fff" : "#000",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: isDarkMode ? "#fff" : "#000",
    }),
  };

  return (
    <div>
      <label className="block font-medium mb-1">
        {label} {isRequired ? <span className="text-red-500">*</span> : <span className="text-gray-400"></span>}
      </label>
      <Controller
        name={name}
        control={control}
        rules={{
          validate: (value) => {
            if (requiredMessage && (!value || value.length === 0)) {
              return requiredMessage;
            }
            return true;
          },
        }}
        render={({ field }) => {
          const { onChange, value } = field;
          const selected = options.filter((opt) => (value || []).includes(opt.value));
          return (
            <Select
              isMulti
              options={options}
              isLoading={loading}
              value={selected}
              onChange={(selectedOptions) => {
                onChange(selectedOptions.map((o) => o.value));
              }}
              styles={customStyles}
            />
          );
        }}
      />
      {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
    </div>
  );
}
