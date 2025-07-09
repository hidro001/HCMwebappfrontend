import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiBriefcase, HiUpload, HiDocument, HiX } from "react-icons/hi";

export default function BasicInfo({ register, errors, departments, setValue }) {
  const [files, setFiles] = useState([]);

  const pickFiles = e => {
    const fArr = Array.from(e.target.files);
    setFiles(fArr);
    setValue("jobDescriptionFiles", fArr);
  };

  return (
    <div className="space-y-4 p-4 bg-white shadow">
      <label>Job Title*</label>
      <input {...register("jobTitle", { required: "Required", minLength: { value: 3, message: "Min 3 chars" } })} />
      {errors.jobTitle && <p className="text-red-500">{errors.jobTitle.message}</p>}

      <label>Department*</label>
      <select {...register("jobDepartment", { required: "Select department" })} disabled={!departments.length}>
        <option value="">--Select--</option>
        {departments.map(d => <option key={d}>{d}</option>)}
      </select>
      {errors.jobDepartment && <p className="text-red-500">{errors.jobDepartment.message}</p>}

      <label>Description</label>
      <textarea {...register("jobDescription")} rows={4} />

      <div className="border-dashed p-4">
        <input type="file" multiple accept=".pdf,.doc,.docx" onChange={pickFiles} />
        <div className="mt-2">
          {files.map((f,i) => (
            <span key={i} className="inline-flex items-center">
              {f.name}
              <HiX onClick={() => {
                const newArr = files.filter((_,idx) => idx!==i);
                setFiles(newArr);
                setValue("jobDescriptionFiles", newArr);
              }} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
