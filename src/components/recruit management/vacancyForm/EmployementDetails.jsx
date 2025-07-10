import React from "react";
import { HiLocationMarker, HiCurrencyDollar, HiCalendar } from "react-icons/hi";

export default function EmploymentDetails({ register, errors }) {
  return (
    <div className="space-y-4 p-4 bg-white shadow">
      <label>Employment Type</label>
      <div className="flex flex-wrap gap-2">
        {["Full Time","Part Time","Contract","Freelance","Remote"].map(t => (
          <label key={t} className="flex items-center">
            <input type="checkbox" value={t} {...register("employmentType")} />
            {t}
          </label>
        ))}
      </div>

      <label>Locations (comma separated)</label>
      <input {...register("jobLocations")} />

      <label>Salary*</label>
      <div className="flex gap-2">
        <select {...register("currency")}><option>INR</option><option>USD</option><option>EUR</option></select>
        <input type="number" {...register("salary", { required: "Salary required", min: { value: 0, message: "Must be positive" } })} />
        <select {...register("payPeriod")}><option>Yearly</option><option>Monthly</option></select>
      </div>
      {errors.salary && <p className="text-red-500">{errors.salary.message}</p>}

      <label>Vacancy Status</label>
      <select {...register("vacancyStatus")}><option>Draft</option><option>Open</option><option>Closed</option></select>

      <label>Opening Date</label>
      <input type="date" {...register("openingDate")} />
      <label>Closing Date</label>
      <input type="date" {...register("closingDate", {
        validate: val => !val || val >= watch("openingDate") || "Closing must be after opening"
      })} />
      {errors.closingDate && <p className="text-red-500">{errors.closingDate.message}</p>}
    </div>
  );
}
