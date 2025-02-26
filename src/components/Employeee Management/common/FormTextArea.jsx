


import React from "react";
import { useFormContext } from "react-hook-form";

export default function FormTextArea({ label, name, placeholder, registerOptions, rows = 3 }) {
  const { register, formState: { errors } } = useFormContext();
  const errorMsg = errors?.[name]?.message;
  const isRequired = registerOptions && registerOptions.required;
  return (
    <div>
      <label className="block font-medium mb-1">
        {label} {isRequired ? <span className="text-red-500">*</span> : <span className="text-gray-400"></span>}
      </label>
      <textarea
        rows={rows}
        placeholder={placeholder}
        {...register(name, registerOptions)}
        className={`animatable-input w-full px-3 py-2 rounded focus:outline-none focus:ring-2 ${errorMsg ? "border-red-600 focus:ring-red-600" : "border-gray-300 focus:ring-blue-400"} dark:bg-gray-800 dark:text-gray-100`}
      />
      {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
    </div>
  );
}
