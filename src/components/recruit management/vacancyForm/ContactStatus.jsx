import React from "react";

export default function ContactStatus({ register, errors }) {
  return (
    <div className="space-y-4 p-4 bg-white shadow">
      <label>Contact Person*</label>
      <input {...register("contactPerson", { required: "Required" })} />
      {errors.contactPerson && <p className="text-red-500">{errors.contactPerson.message}</p>}

      <label>Contact Phone*</label>
      <input {...register("contactPhone", { 
        required: "Required",
        pattern: { value: /^\+?[1-9]\d{1,14}$/, message: "Invalid phone" } 
      })} />
      {errors.contactPhone && <p className="text-red-500">{errors.contactPhone.message}</p>}

      <label>
        <input type="checkbox" {...register("showContacts")} />
        Display contacts publicly
      </label>
    </div>
  );
}
