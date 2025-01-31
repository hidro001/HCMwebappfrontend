import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

export default function CompanyInfo() {
  const [logoPreview, setLogoPreview] = useState(null);
  const [allCompanies, setAllCompanies] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      companyName: "",
      companyLogo: null,
      contactNumber: "",
      currency: "",
      email: "",
      offices: [{ longitude: "", latitude: "", address: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "offices",
  });

  const currencyOptions = [
    { label: "INR - Indian Rupee", value: "INR" },
    { label: "USD - US Dollar", value: "USD" },
    { label: "EUR - Euro", value: "EUR" },
  ];

  const onSubmit = (data) => {
    // Attach the current preview URL
    if (logoPreview) {
      data.previewUrl = logoPreview;
    }
    // Add the new company to the state array
    setAllCompanies((prev) => [...prev, data]);

    toast.success("Company information saved!");
    reset();
    setLogoPreview(null);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    } else {
      setLogoPreview(null);
    }
  };

  return (
    <>
      {/* Toaster for notifications */}
      <Toaster />

      {/* Outer container */}
      <div className="p-4 md:p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto w-full bg-white dark:bg-gray-800 rounded-md shadow p-6"
        >
          {/* Page Title */}
          <h2 className="text-2xl font-semibold mb-6">Add Company Information</h2>

          {/* Main grid: Form & Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* -------------------- LEFT: FORM (span 2 columns on md) -------------------- */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 md:col-span-2"
            >
              {/* Row 1: Company Name + Company Logo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Company Name */}
                <div>
                  <label
                    className="block font-medium mb-1"
                    htmlFor="companyName"
                  >
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    {...register("companyName", { required: true })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter Company Name"
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-sm mt-1">
                      Company Name is required
                    </p>
                  )}
                </div>

                {/* Company Logo */}
                <div>
                  <label
                    className="block font-medium mb-1"
                    htmlFor="companyLogo"
                  >
                    Company Logo
                  </label>
                  <input
                    id="companyLogo"
                    type="file"
                    accept="image/*"
                    {...register("companyLogo")}
                    onChange={handleLogoChange}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-50 file:text-blue-700
                      hover:file:bg-blue-100
                      bg-white dark:bg-gray-700 dark:text-gray-100
                      border border-gray-300 dark:border-gray-600 rounded-md"
                  />
                </div>
              </div>

              {/* Row 2: Contact Number + Currency */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Contact Number */}
                <div>
                  <label
                    className="block font-medium mb-1"
                    htmlFor="contactNumber"
                  >
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contactNumber"
                    type="tel"
                    {...register("contactNumber", { required: true })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    placeholder="Enter Contact number"
                  />
                  {errors.contactNumber && (
                    <p className="text-red-500 text-sm mt-1">
                      Contact Number is required
                    </p>
                  )}
                </div>

                {/* Currency */}
                <div>
                  <label className="block font-medium mb-1" htmlFor="currency">
                    Currency <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="currency"
                    {...register("currency", { required: true })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="">Select Currency</option>
                    {currencyOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.currency && (
                    <p className="text-red-500 text-sm mt-1">
                      Currency is required
                    </p>
                  )}
                </div>
              </div>

              {/* Row 3: Email */}
              <div>
                <label className="block font-medium mb-1" htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">Email is required</p>
                )}
              </div>

              {/* Dynamic Office Addresses */}
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Office Addresses</h3>

                {fields.map((item, index) => (
                  <div
                    key={item.id}
                    className="relative border border-gray-200 dark:border-gray-600 p-4 rounded-md mb-4 bg-white dark:bg-gray-700"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Longitude */}
                      <div>
                        <label
                          className="block font-medium mb-1"
                          htmlFor={`offices[${index}].longitude`}
                        >
                          Longitude
                        </label>
                        <input
                          type="text"
                          {...register(`offices.${index}.longitude`)}
                          placeholder="233355.74884"
                          className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                      </div>

                      {/* Latitude */}
                      <div>
                        <label
                          className="block font-medium mb-1"
                          htmlFor={`offices[${index}].latitude`}
                        >
                          Latitude
                        </label>
                        <input
                          type="text"
                          {...register(`offices.${index}.latitude`)}
                          placeholder="233355.74884"
                          className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div className="mt-4">
                      <label
                        className="block font-medium mb-1"
                        htmlFor={`offices[${index}].address`}
                      >
                        Office Address
                      </label>
                      <textarea
                        {...register(`offices.${index}.address`)}
                        placeholder="Write office Address"
                        rows="2"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2
                          focus:outline-none focus:ring-2 focus:ring-blue-500
                          bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      />
                    </div>

                    {/* Delete office button */}
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="absolute top-2 right-2 text-red-500
                          hover:text-red-700 text-sm p-1"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    append({ longitude: "", latitude: "", address: "" })
                  }
                  className="inline-flex items-center px-4 py-2 rounded-md 
                    bg-blue-600 text-white hover:bg-blue-700 
                    transition-colors text-sm"
                >
                  Add Office Address
                </button>
              </div>

              {/* Form Actions */}
              <div className="flex space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    setLogoPreview(null);
                  }}
                  className="px-4 py-2 rounded-md text-orange-600 border border-orange-600
                    hover:bg-orange-50 dark:hover:bg-gray-700 
                    transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white 
                    hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
              </div>
            </form>

            {/* -------------------- RIGHT: PREVIEW -------------------- */}
            <div className="space-y-6 md:col-span-1 w-full">
              {/* Example Static Card to illustrate styling */}
              <div className="shadow-lg p-4 rounded-md bg-white dark:bg-gray-700">
                <h3 className="font-semibold text-xl mb-4 text-center">
                  Razor Infotech (Branch - 1)
                </h3>
                <div className="w-full flex items-center justify-center mb-4">
                  <img
                    src="https://cdn.mos.cms.futurecdn.net/yCsKFtf4Hf6qxs3vei2QKe-1000-80.jpg"
                    alt="placeholder"
                    className="object-contain h-20"
                  />
                </div>
                <div className="text-sm space-y-2">
                  <p className="flex flex-col lg:flex-row lg:justify-between">
                    <strong className="uppercase mr-1">Address:</strong>
                    <span className="sm:text-right">
                      A-17, A Block, Sector 65, Noida, Uttar Pradesh 201301
                    </span>
                  </p>
                  <p className="flex flex-col lg:flex-row lg:justify-between">
                    <strong className="uppercase mr-1">Latitude:</strong>
                    <span>28.636445032256663</span>
                  </p>
                  <p className="flex flex-col lg:flex-row lg:justify-between">
                    <strong className="uppercase mr-1">Longitude:</strong>
                    <span>77.38927234565863</span>
                  </p>
                  <p className="flex flex-col lg:flex-row lg:justify-between">
                    <strong className="uppercase mr-1">Contact:</strong>
                    <span>9906666682</span>
                  </p>
                  <p className="flex flex-col lg:flex-row lg:justify-between">
                    <strong className="uppercase mr-1">Email:</strong>
                    <span>business@razorInfotech.com</span>
                  </p>
                  <p className="flex flex-col lg:flex-row lg:justify-between">
                    <strong className="uppercase mr-1">Currency:</strong>
                    <span>INR - Indian Rupee</span>
                  </p>
                </div>
              </div>

              {/* Dynamically Rendered Cards for Each Company */}
              {allCompanies.map((company, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-md bg-white dark:bg-gray-700 shadow-sm"
                >
                  <h3 className="font-semibold text-xl mb-4 text-center">
                    {company.companyName || "Unnamed Company"} (Branch -{" "}
                    {idx + 1})
                  </h3>

                  {/* Logo Preview */}
                  <div className="w-full flex items-center justify-center mb-4">
                    {company.previewUrl ? (
                      <img
                        src={company.previewUrl}
                        alt="Company Logo Preview"
                        className="object-contain h-20"
                      />
                    ) : (
                      <img
                        src="https://via.placeholder.com/150?text=Logo"
                        alt="placeholder"
                        className="object-contain h-20"
                      />
                    )}
                  </div>

                  {/* Company Info */}
                  <div className="text-sm space-y-1">
                    <p>
                      <strong className="uppercase mr-1">Contact:</strong>
                      {company.contactNumber || "—"}
                    </p>
                    <p>
                      <strong className="uppercase mr-1">Email:</strong>
                      {company.email || "—"}
                    </p>
                    <p>
                      <strong className="uppercase mr-1">Currency:</strong>
                      {
                        currencyOptions.find(
                          (opt) => opt.value === company.currency
                        )?.label
                      }
                    </p>

                    {/* Offices / Addresses */}
                    {company.offices.map((office, i) => (
                      <div key={i} className="pt-3">
                        <p>
                          <strong className="uppercase mr-1">
                            Address #{i + 1}:
                          </strong>
                          {office.address || "No address"}
                        </p>
                        <p>
                          <strong className="uppercase mr-1">Latitude:</strong>
                          {office.latitude || "—"}
                        </p>
                        <p>
                          <strong className="uppercase mr-1">Longitude:</strong>
                          {office.longitude || "—"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
