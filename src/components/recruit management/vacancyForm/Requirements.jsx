import React from "react";
import { HiAcademicCap, HiClipboardList } from "react-icons/hi";

export default function Requirements({ register, errors, responsibilitiesFields, appendResp, removeResp }) {
  return (
    <div className="space-y-4 p-4 bg-white shadow">
      <label>Work Experience</label>
      <select {...register("workExperience")}><option>No experience required</option><option>1-2 years</option><option>3-5 years</option><option>5+ years</option></select>

      <label>Education Level</label>
      <select {...register("education")}><option>Higher</option><option>Graduate</option><option>Postgraduate</option></select>

      <label>Responsibilities*</label>
      {responsibilitiesFields.map((f, i) => (
        <div key={f.id} className="flex items-center gap-2">
          <input {...register(`responsibilities.${i}.text`, { required: true })} placeholder="Describe responsibility" />
          <button type="button" onClick={() => removeResp(i)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => appendResp({ text: "" })}>Add Responsibility</button>
      {errors.responsibilities && <p className="text-red-500">Add at least one responsibility.</p>}
    </div>
  );
}
