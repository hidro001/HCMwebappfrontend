import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { HiBriefcase, HiOfficeBuilding, HiAcademicCap, HiPhone, HiSave, HiX } from "react-icons/hi";
import useJobStore from "../../../store/useJobStore";
import axiosInstance from "../../../service/axiosInstance";
import { toast } from "react-hot-toast";
import FullScreenLoader from "../../common/FullScreenLoader";
import BasicInfo from "./BasicInfo";
import EmploymentDetails from "./EmployementDetails";
import Requirements from "./Requirements";
import ContactStatus from "./ContactStatus";
import PreviewModal from "./PreviewModal";

export default function CreateVacn() {
  const { register, control, handleSubmit, watch, setValue, formState: { errors }, reset, trigger } = useForm({
    defaultValues: JSON.parse(localStorage.getItem("vacancyDraft") || "{}")
  });
  const { fields: responsibilitiesFields, append: appendResp, remove: removeResp } = useFieldArray({ name: "responsibilities", control });
  const { createJob, loading, error, successMessage } = useJobStore();
  const [departments, setDepartments] = useState([]);
  const [deptError, setDeptError] = useState(null);
  const [step, setStep] = useState(1);
  const [preview, setPreview] = useState(false);

  const watched = watch();

  useEffect(() => {
    setValue("contactPerson", localStorage.getItem("employeeName") || "");
    setValue("contactPhone", localStorage.getItem("employeePhone") || "");
  }, [setValue]);

  useEffect(() => {
    localStorage.setItem("vacancyDraft", JSON.stringify(watched));
  }, [watched]);

  useEffect(() => {
    const id = localStorage.getItem("employeeId");
    if (!id) return setDeptError("No employeeId in storage.");
    axiosInstance.get(`/department-allocations/users/${id}`)
      .then(res => setDepartments(res.data.departmentAlocated.filter(d => !/\[|\]/.test(d))))
      .catch(() => setDeptError("Failed to fetch departments."));
  }, []);

  useEffect(() => { if (error) toast.error(error); }, [error]);
  useEffect(() => { if (successMessage) { toast.success(successMessage); reset(); } }, [successMessage, reset]);

  const requiredPerStep = {
    1: ["jobTitle", "jobDepartment"],
    2: ["salary"],
    3: ["responsibilities"],
    4: ["contactPerson", "contactPhone"]
  };
  const canProceed = async () => {
    const res = await trigger(requiredPerStep[step] || []);
    return res;
  };

  const onSubmit = async data => {
    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      if (Array.isArray(v)) v.forEach(x => formData.append(k, x));
      else formData.append(k, v);
    });
    await createJob(formData);
  };

  const steps = [
    { title: "Basic Info", comp: <BasicInfo {...{ register, errors, departments, setValue }} /> },
    { title: "Employment", comp: <EmploymentDetails {...{ register, errors }} /> },
    { title: "Requirements", comp: <Requirements {...{ register, errors, responsibilitiesFields, appendResp, removeResp }} /> },
    { title: "Contact & Status", comp: <ContactStatus {...{ register, errors }} /> },
  ];

  return (
    <>
      {loading && <FullScreenLoader />}
      <motion.div className="min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-4">Create Vacancy</h1>

        <nav className="flex space-x-4 mb-6">
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setStep(i+1)}
              className={`px-4 py-2 ${step === i+1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            >
              {s.title}
            </button>
          ))}
        </nav>

        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
              {steps[step-1].comp}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex justify-between">
            {step > 1 && <button type="button" onClick={() => setStep(step-1)}>Previous</button>}
            <div>
              {step < steps.length && (
                <button
                  type="button"
                  onClick={async () => { if (await canProceed()) setStep(step+1); }}
                  className="ml-2 bg-blue-500 text-white px-4 py-2"
                >Next</button>
              )}
              {step === steps.length && (
                <>
                  <button type="button" onClick={() => setPreview(true)} className="bg-gray-500 text-white px-4 py-2 mr-2">Preview</button>
                  <button type="submit" className="bg-green-600 text-white px-4 py-2">Submit</button>
                </>
              )}
            </div>
          </div>
        </form>

        {preview && <PreviewModal data={watched} onClose={() => setPreview(false)} />}
      </motion.div>
    </>
  );
}
