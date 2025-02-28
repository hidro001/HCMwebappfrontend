import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdFileUpload } from "react-icons/md";
import { motion } from "framer-motion";
import useJobStore from "../../store/useJobStore";
import axiosInstance from "../../service/axiosInstance";
import { toast } from "react-hot-toast";
import FullScreenLoader from "../common/FullScreenLoader";

const containerVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "tween", duration: 0.2, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "tween", duration: 0.2, ease: "easeOut" },
  },
};

export default function CreateVacancy() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createJob, loading, error, successMessage } = useJobStore();

  const [departments, setDepartments] = useState([]);
  const [deptError, setDeptError] = useState(null);

  useEffect(() => {
    const employeeId = localStorage.getItem("employeeId");
    const fetchDepartments = async () => {
      try {
        const response = await axiosInstance.get(`/superadmin/departmentAlocated/${employeeId}`);
        const validDepartments = response.data.departmentAlocated.filter(
          (dept) => !dept.includes("[") && !dept.includes("]")
        );
        setDepartments(validDepartments);
      } catch (err) {
        setDeptError("Failed to fetch departments.");
      }
    };

    if (employeeId) {
      fetchDepartments();
    } else {
      setDeptError("No employeeId found in localStorage.");
    }
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("jobTitle", data.jobTitle);
      formData.append("jobDepartment", data.jobDepartment);
      formData.append("jobDescription", data.jobDescription ?? "");
      if (data.employmentType) {
        data.employmentType.forEach((type) => {
          formData.append("employmentType", type);
        });
      }
      formData.append("jobLocations", data.jobLocations ?? "");
      formData.append("currency", data.currency ?? "");
      formData.append("salary", data.salary ?? "");
      formData.append("payPeriod", data.payPeriod ?? "");
      formData.append("multipleCandidates", data.multipleCandidates ? "true" : "false");
      formData.append("vacancyStatus", data.vacancyStatus ?? "");
      formData.append("openingDate", data.openingDate ?? "");
      formData.append("closingDate", data.closingDate ?? "");
      formData.append("workExperience", data.workExperience ?? "");
      formData.append("education", data.education ?? "");
      if (data.suitableFor) {
        data.suitableFor.forEach((sf) => {
          formData.append("suitableFor", sf);
        });
      }
      formData.append("responsibilities", data.responsibilities ?? "");
      formData.append("duties", data.duties ?? "");
      formData.append("contactPerson", data.contactPerson ?? "");
      formData.append("contactPhone", data.contactPhone ?? "");
      formData.append("additionalContact", data.additionalContact ?? "");
      formData.append("showContacts", data.showContacts ? "true" : "false");
      if (data.jobDescriptionFile && data.jobDescriptionFile.length > 0) {
        formData.append("jobDescriptionFile", data.jobDescriptionFile[0]);
      }
      await createJob(formData);
    } catch (err) {}
  };

  return (
    <>
      {loading && <FullScreenLoader />}
      <motion.div
        className="w-full mx-auto px-4 py-6 bg-bg-secondary mt-5 rounded-xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold mb-4 md:mb-0 dark:text-white">Create Vacancy</h1>
          <div className="space-x-2">
            {/* <button
              type="button"
              className="px-4 py-2 rounded border border-gray-300 text-gray-700
                       hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200
                       dark:hover:bg-gray-800"
            >
              Cancel
            </button> */}
            <button
              type="submit"
              form="createVacancyForm"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
        {deptError && <div className="bg-red-100 text-red-800 p-3 mb-4 rounded">{deptError}</div>}
        <form id="createVacancyForm" onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-6">
            <motion.div
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-6"
              variants={cardVariants}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold dark:text-gray-100">Basic Information</h2>
                <label
                  htmlFor="jobDescriptionFile"
                  className="flex items-center cursor-pointer text-blue-600 hover:text-blue-800 dark:text-blue-400"
                >
                  <MdFileUpload className="mr-1 text-xl" />
                  Upload JD
                </label>
                <input type="file" id="jobDescriptionFile" className="hidden" {...register("jobDescriptionFile")} />
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">JOB TITLE</label>
                <input
                  type="text"
                  placeholder="Position name"
                  {...register("jobTitle", { required: true })}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                             dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
                {errors.jobTitle && <p className="text-red-600 text-xs mt-1">Job title is required.</p>}
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">JOB DEPARTMENT</label>
                <select
                  {...register("jobDepartment", { required: true })}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                             dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  disabled={!departments.length}
                >
                  <option value="">Choose Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {errors.jobDepartment && <p className="text-red-600 text-xs mt-1">Department is required.</p>}
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">
                  JOB DESCRIPTION<span className="text-red-500 ml-1">*</span>
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  For effective candidate selection, add comprehensive details
                </p>
                <textarea
                  placeholder="Enter job description"
                  rows={4}
                  {...register("jobDescription")}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                             dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">EMPLOYMENT TYPE</label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Pick one or multiple options</p>
                <div className="flex flex-wrap items-center gap-3">
                  {["Full Time", "Part Time", "Contract", "Freelance", "Remote"].map((type) => (
                    <label key={type} className="inline-flex items-center space-x-1 text-sm">
                      <input
                        type="checkbox"
                        value={type}
                        {...register("employmentType")}
                        className="form-checkbox h-4 w-4 text-blue-600 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span className="dark:text-gray-300">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">JOB LOCATIONS</label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Choose multiple (comma-separated) or a single location
                </p>
                <input
                  type="text"
                  placeholder="e.g. New Delhi, Gurugram, Noida"
                  {...register("jobLocations")}
                  className="w-full rounded border border-gray-300 px-3 py-2 mb-2 text-sm
                             dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">SALARY</label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Choose how you prefer for this job</p>
                <div className="flex flex-col md:flex-row md:items-center flex-wrap gap-2">
                  <select
                    {...register("currency")}
                    className="rounded border border-gray-300 px-3 py-2 text-sm
                               dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100
                               md:w-auto w-full"
                  >
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                  <input
                    type="number"
                    placeholder="Salary"
                    {...register("salary")}
                    className="rounded border border-gray-300 px-3 py-2 text-sm
                               dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100
                               md:flex-1 w-full"
                  />
                  <select
                    {...register("payPeriod")}
                    className="rounded border border-gray-300 px-3 py-2 text-sm
                               dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100
                               md:w-auto w-full"
                  >
                    <option value="Yearly">Yearly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
              </div>
              <div className="mb-2">
                <label className="flex items-center text-sm dark:text-gray-300">
                  <input
                    type="checkbox"
                    id="multipleCandidates"
                    {...register("multipleCandidates")}
                    className="form-checkbox h-4 w-4 text-blue-600 dark:bg-gray-700 dark:border-gray-600 mr-2"
                  />
                  Yes, I am hiring multiple candidates
                </label>
              </div>
            </motion.div>
            <motion.div
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-6"
              variants={cardVariants}
            >
              <h2 className="text-lg font-semibold mb-2 dark:text-gray-100">Dates and Status</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                This section provides a snapshot of when the vacancy opened, any closing date (if applicable), and its
                current status
              </p>
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">VACANCY STATUS</label>
                <select
                  {...register("vacancyStatus")}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                             dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                >
                  <option value="">Choose Status</option>
                  <option value="Draft">Draft</option>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium block mb-1 dark:text-gray-300">OPENING DATE</label>
                  <input
                    type="date"
                    placeholder="dd-mm-yyyy"
                    {...register("openingDate")}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                               dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1 dark:text-gray-300">CLOSING DATE</label>
                  <input
                    type="date"
                    placeholder="dd-mm-yyyy"
                    {...register("closingDate")}
                    className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                               dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                  />
                </div>
              </div>
            </motion.div>
          </div>
          <div className="flex flex-col space-y-6">
            <motion.div
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-6"
              variants={cardVariants}
            >
              <h2 className="text-lg font-semibold mb-2 dark:text-gray-100">Applicant requirements</h2>
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">
                  WORK EXPERIENCE<span className="text-red-500 ml-1">*</span>
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Provide details about experience</p>
                <select
                  {...register("workExperience")}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                             dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                >
                  <option value="no experience required">no experience required</option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">EDUCATION</label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Select Education</p>
                <select
                  {...register("education")}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                             dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                >
                  <option value="Higher">Higher</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">THE JOB IS SUITABLE FOR:</label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Pick one or multiple options</p>
                <div className="flex flex-wrap items-center gap-4">
                  {["Fresher", "Internship", "Freelancer"].map((role) => (
                    <label key={role} className="inline-flex items-center space-x-1 text-sm">
                      <input
                        type="checkbox"
                        value={role}
                        {...register("suitableFor")}
                        className="form-checkbox h-4 w-4 text-blue-600 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span className="dark:text-gray-300">{role}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">RESPONSIBILITIES</label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Main tasks that the candidate will be accountable for
                </p>
                <textarea
                  rows={3}
                  placeholder="Performing tasks related to..."
                  {...register("responsibilities")}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                             dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">DUTIES</label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Specific tasks and actions on a day-to-day basis
                </p>
                <textarea
                  rows={3}
                  placeholder="Planning and executing..."
                  {...register("duties")}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                             dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
            </motion.div>
            <motion.div
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-6"
              variants={cardVariants}
            >
              <h2 className="text-lg font-semibold mb-2 dark:text-gray-100">Contact information</h2>
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">CONTACT PERSON</label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Person to contact for inquiries</p>
                <input
                  type="text"
                  placeholder="Name of contact person"
                  {...register("contactPerson")}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                             dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">CONTACT PHONE</label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Phone for inquiries</p>
                <input
                  type="text"
                  placeholder="Phone number"
                  {...register("contactPhone")}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                             dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="text-sm font-medium block mb-1 dark:text-gray-300">ADDITIONAL CONTACT</label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Extra contact info (Skype, WhatsApp, etc.)</p>
                <input
                  type="text"
                  placeholder="Skype, WhatsApp, etc."
                  {...register("additionalContact")}
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm
                             dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="showContacts"
                  {...register("showContacts")}
                  className="form-checkbox h-4 w-4 text-blue-600 dark:bg-gray-700 dark:border-gray-600 mr-2"
                />
                <label htmlFor="showContacts" className="text-sm font-medium dark:text-gray-300">
                  Show the name and phone number on this job page
                </label>
              </div>
            </motion.div>
          </div>
        </form>
      </motion.div>
    </>
  );
}
