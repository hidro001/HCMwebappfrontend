

import React from "react";
import { useFormContext } from "react-hook-form";

export default function FormSelect({ label, name, options = [], loading = false, registerOptions }) {
  const { register, formState: { errors } } = useFormContext();
  const errorMsg = errors?.[name]?.message;
  const isRequired = registerOptions && registerOptions.required;
  return (
    <div>
      <label className="block font-medium mb-1">
        {label} {isRequired ? <span className="text-red-500">*</span> : <span className="text-gray-400"></span>}
      </label>
      <select
        {...register(name, registerOptions)}
        className={`animatable-input w-full px-3 py-2 rounded focus:outline-none focus:ring-2 ${errorMsg ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-400"} dark:bg-gray-800 dark:text-gray-100`}
      >
        {loading && <option value="">Loading...</option>}
        {!loading && options.map((opt, idx) => (
          <option key={idx} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
    </div>
  );
}
