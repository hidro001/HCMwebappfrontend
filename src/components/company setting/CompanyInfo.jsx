import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import useCompanyStore from "../../store/companyStore";
import FullScreenLoader from "../common/FullScreenLoader";
import ConfirmationDialog from "../common/ConfirmationDialog";

export default function CompanyInfo() {
  const {
    companies,
    loading,
    fetchCompanies,
    saveCompany,
    updateCompany,
    deleteCompany,
    editingCompany,
    setEditingCompany,
    clearEditingCompany,
  } = useCompanyStore();

  const [logoPreview, setLogoPreview] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);

  const currencyOptions = [
    { label: "USD - United States Dollar", value: "USD" },
    { label: "EUR - Euro", value: "EUR" },
    { label: "JPY - Japanese Yen", value: "JPY" },
    { label: "GBP - British Pound Sterling", value: "GBP" },
    { label: "AUD - Australian Dollar", value: "AUD" },
    { label: "CAD - Canadian Dollar", value: "CAD" },
    { label: "CHF - Swiss Franc", value: "CHF" },
    { label: "CNY - Chinese Yuan Renminbi", value: "CNY" },
    { label: "INR - Indian Rupee", value: "INR" },
    { label: "BRL - Brazilian Real", value: "BRL" },
    { label: "RUB - Russian Ruble", value: "RUB" },
    { label: "ZAR - South African Rand", value: "ZAR" },
    { label: "SGD - Singapore Dollar", value: "SGD" },
    { label: "HKD - Hong Kong Dollar", value: "HKD" },
    { label: "KRW - South Korean Won", value: "KRW" },
    { label: "MXN - Mexican Peso", value: "MXN" },
    { label: "MYR - Malaysian Ringgit", value: "MYR" },
    { label: "THB - Thai Baht", value: "THB" },
    { label: "SEK - Swedish Krona", value: "SEK" },
    { label: "NOK - Norwegian Krone", value: "NOK" },
    { label: "DKK - Danish Krone", value: "DKK" },
    { label: "PLN - Polish Zloty", value: "PLN" },
    { label: "NZD - New Zealand Dollar", value: "NZD" },
    { label: "PHP - Philippine Peso", value: "PHP" },
    { label: "IDR - Indonesian Rupiah", value: "IDR" },
    { label: "TRY - Turkish Lira", value: "TRY" },
    { label: "AED - United Arab Emirates Dirham", value: "AED" },
    { label: "SAR - Saudi Riyal", value: "SAR" },
    { label: "ILS - Israeli Shekel", value: "ILS" },
    { label: "EGP - Egyptian Pound", value: "EGP" },
    { label: "PKR - Pakistani Rupee", value: "PKR" },
    { label: "VND - Vietnamese Dong", value: "VND" },
  ];

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

  const { fields, append, remove } = useFieldArray({ control, name: "offices" });

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  useEffect(() => {
    if (editingCompany) {
      reset({
        companyName: editingCompany.name || "",
        contactNumber: editingCompany.contact || "",
        email: editingCompany.email || "",
        currency: editingCompany.currency || "",
        offices:
          editingCompany.addresses && editingCompany.addresses.length > 0
            ? editingCompany.addresses
            : [{ longitude: "", latitude: "", address: "" }],
        companyLogo: null,
      });
      setLogoPreview(editingCompany.logo || null);
    } else {
      reset({
        companyName: "",
        contactNumber: "",
        email: "",
        currency: "",
        offices: [{ longitude: "", latitude: "", address: "" }],
        companyLogo: null,
      });
      setLogoPreview(null);
    }
  }, [editingCompany, reset]);

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    } else {
      setLogoPreview(null);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.companyName);
    formData.append("contact", data.contactNumber);
    formData.append("email", data.email);
    formData.append("currency", data.currency);

    data.offices.forEach((office, index) => {
      formData.append(`addresses[${index}][address]`, office.address.trim());
      formData.append(`addresses[${index}][latitude]`, office.latitude.trim());
      formData.append(`addresses[${index}][longitude]`, office.longitude.trim());
    });

    if (data.companyLogo && data.companyLogo[0]) {
      formData.append("logo", data.companyLogo[0]);
    }

    if (editingCompany && (editingCompany._id || editingCompany.id)) {
      const id = editingCompany._id || editingCompany.id;
      await updateCompany(id, formData);
    } else {
      await saveCompany(formData);
    }

    reset({
      companyName: "",
      contactNumber: "",
      email: "",
      currency: "",
      offices: [{ longitude: "", latitude: "", address: "" }],
      companyLogo: null,
    });
    setLogoPreview(null);
    clearEditingCompany();
  };

  const handleEditCompany = (company) => {
    setEditingCompany(company);
  };

  const handleDeleteClick = (company) => {
    setCompanyToDelete(company);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (companyToDelete && (companyToDelete._id || companyToDelete.id)) {
      const id = companyToDelete._id || companyToDelete.id;
      await deleteCompany(id);
    }
    setOpenConfirm(false);
    setCompanyToDelete(null);
  };

  const handleCancelDelete = () => {
    setOpenConfirm(false);
    setCompanyToDelete(null);
  };
  

  const handleCancelEdit = () => {
    reset({
      companyName: "",
      contactNumber: "",
      email: "",
      currency: "",
      offices: [{ longitude: "", latitude: "", address: "" }],
      companyLogo: null,
    });
    setLogoPreview(null);
    clearEditingCompany();
  };

  return (
    <>
      {loading && <FullScreenLoader />}
      <div className="p-4 md:p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto w-full bg-white dark:bg-gray-800 rounded-md shadow p-6"
        >
          <h2 className="text-2xl font-semibold mb-6">
            {editingCompany ? "Edit Company Information" : "Add Company Information"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="companyName" className="block font-medium mb-1">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    {...register("companyName", { required: true })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
                    placeholder="Enter Company Name"
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-sm mt-1">Company Name is required</p>
                  )}
                </div>
                <div>
                  <label htmlFor="companyLogo" className="block font-medium mb-1">
                    Company Logo
                  </label>
                  <input
                    id="companyLogo"
                    type="file"
                    accept="image/*"
                    {...register("companyLogo")}
                    onChange={handleLogoChange}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
                  />
                  {logoPreview && (
                    <div className="mt-2">
                      <img src={logoPreview} alt="Logo Preview" className="object-contain h-20" />
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contactNumber" className="block font-medium mb-1">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contactNumber"
                    type="tel"
                    {...register("contactNumber", { required: true })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
                    placeholder="Enter Contact Number"
                  />
                  {errors.contactNumber && (
                    <p className="text-red-500 text-sm mt-1">Contact Number is required</p>
                  )}
                </div>
                <div>
                  <label htmlFor="currency" className="block font-medium mb-1">
                    Currency <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="currency"
                    {...register("currency", { required: true })}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
                  >
                    <option value="">Select Currency</option>
                    {currencyOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.currency && (
                    <p className="text-red-500 text-sm mt-1">Currency is required</p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block font-medium mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
                  placeholder="Enter Email Address"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">Email is required</p>
                )}
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">Office Addresses</h3>
                {fields.map((item, index) => (
                  <div
                    key={item.id}
                    className="relative border border-gray-200 dark:border-gray-600 p-4 rounded-md mb-4 bg-white dark:bg-gray-800"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor={`offices[${index}].longitude`} className="block font-medium mb-1">
                          Longitude
                        </label>
                        <input
                          type="text"
                          {...register(`offices.${index}.longitude`)}
                          placeholder="Enter Longitude"
                          className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
                        />
                      </div>
                      <div>
                        <label htmlFor={`offices[${index}].latitude`} className="block font-medium mb-1">
                          Latitude
                        </label>
                        <input
                          type="text"
                          {...register(`offices.${index}.latitude`)}
                          placeholder="Enter Latitude"
                          className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label htmlFor={`offices[${index}].address`} className="block font-medium mb-1">
                        Office Address
                      </label>
                      <textarea
                        {...register(`offices.${index}.address`)}
                        placeholder="Enter Office Address"
                        rows="2"
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
                      />
                    </div>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm p-1"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => append({ longitude: "", latitude: "", address: "" })}
                  className="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm"
                >
                  Add Office Address
                </button>
              </div>
              <div className="flex space-x-4 mt-6">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2 rounded-md text-orange-600 border border-orange-600 hover:bg-orange-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  {editingCompany ? "Update" : "Save"}
                </button>
              </div>
            </form>
            <div className="space-y-6 md:col-span-1 w-full">
              {companies.map((company, idx) => (
                <div
                  key={company._id || idx}
                  className="shadow-lg p-4 rounded-md bg-white dark:bg-gray-800"
                >
                  <h3 className="font-semibold text-xl mb-4 text-center">
                    {company.name || "Unnamed Company"} (Branch - {idx + 1})
                  </h3>
                  <div className="w-full flex items-center justify-center mb-4">
                    {company.logo ? (
                      <img
                        src={company.logo}
                        alt="Company Logo"
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
                  <div className="text-sm space-y-2">
                    <p className="flex flex-col lg:flex-row lg:justify-between">
                      <strong className="uppercase mr-1">Contact:</strong>
                      <span>{company.contact || "—"}</span>
                    </p>
                    <p className="flex flex-col lg:flex-row lg:justify-between">
                      <strong className="uppercase mr-1">Email:</strong>
                      <span>{company.email || "—"}</span>
                    </p>
                    <p className="flex flex-col lg:flex-row lg:justify-between">
                      <strong className="uppercase mr-1">Currency:</strong>
                      <span>{company.currency || "—"}</span>
                    </p>
                    {company.addresses &&
                      company.addresses.map((office, i) => (
                        <div key={i} className="pt-3">
                          <p className="flex flex-col lg:flex-row lg:justify-between">
                            <strong className="uppercase mr-1">Address #{i + 1}:</strong>
                            <span>{office.address || "No address"}</span>
                          </p>
                          <p className="flex flex-col lg:flex-row lg:justify-between">
                            <strong className="uppercase mr-1">Latitude:</strong>
                            <span>{office.latitude || "—"}</span>
                          </p>
                          <p className="flex flex-col lg:flex-row lg:justify-between">
                            <strong className="uppercase mr-1">Longitude:</strong>
                            <span>{office.longitude || "—"}</span>
                          </p>
                        </div>
                      ))}
                  </div>
                  <div className="flex items-center space-x-2 mt-4 justify-center">
                    <button
                      onClick={() => handleEditCompany(company)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(company)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <ConfirmationDialog
        open={openConfirm}
        title="Confirm Deletion"
        message="Do you want to delete this company information?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Yes, delete it!"
        cancelText="Cancel"
      />
    </>
  );
}
