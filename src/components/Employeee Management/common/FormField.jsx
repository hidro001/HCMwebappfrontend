import React from "react";
import { useFormContext } from "react-hook-form";

export default function FormField({
  label,
  name,
  placeholder,
  type = "text",
  registerOptions,
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMsg = errors?.[name]?.message;

  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name, registerOptions)}
        className={`
          animatable-input w-full px-3 py-2 rounded focus:outline-none focus:ring-2
          placeholder-gray-400 dark:placeholder-gray-500
          ${
            errorMsg
              ? "border border-red-500 focus:ring-red-500 dark:border-red-500"
              : "border border-gray-300 dark:border-gray-700 focus:ring-blue-400"
          }
          dark:bg-gray-800 dark:text-gray-100
        `}
      />
      {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
    </div>
  );
}
