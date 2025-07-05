import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import {
  FaTrash,
  FaEdit,
  FaBuilding,
  FaPhone,
  FaEnvelope,
  FaDollarSign,
  FaMapMarkerAlt,
  FaPlus,
  FaTimes,
  FaImage,
  FaGlobe,
  FaSave,
  FaUndo,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import {
  HiOfficeBuilding,
  HiLocationMarker,
  HiMail,
  HiPhone,
  HiCurrencyDollar,
} from "react-icons/hi";
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
  const [isFormExpanded, setIsFormExpanded] = useState(false);

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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "offices",
  });

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
      setIsFormExpanded(true);
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
      formData.append(
        `addresses[${index}][longitude]`,
        office.longitude.trim()
      );
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
    setIsFormExpanded(false);
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
    setIsFormExpanded(false);
  };

  return (
    <>
      {loading && <FullScreenLoader />}
      <div className="p-6 space-y-8 bg-gray-50 dark:bg-gray-900 min-h-screen rounded-2xl">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <FaBuilding className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Company Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage your company information and office locations
                </p>
              </div>
            </div>
          </div>

          {/* Add/Edit Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
            <div 
              className="flex items-center justify-between p-6  border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              onClick={() => setIsFormExpanded(!isFormExpanded)}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <FaPlus className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {editingCompany ? "Edit Company Information" : "Add New Company"}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {editingCompany ? "Update company details" : "Create a new company profile"}
                  </p>
                </div>
              </div>
              <motion.div
                animate={{ rotate: isFormExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaChevronDown className="text-gray-400" />
              </motion.div>
            </div>

            <AnimatePresence>
              {(isFormExpanded || editingCompany) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                    
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Company Name */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                          <HiOfficeBuilding className="text-blue-500" />
                          <span>Company Name *</span>
                        </label>
                        <input
                          type="text"
                          {...register("companyName", { required: true })}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Enter company name"
                        />
                        {errors.companyName && (
                          <p className="text-red-500 text-sm">Company name is required</p>
                        )}
                      </div>

                      {/* Contact Number */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                          <HiPhone className="text-green-500" />
                          <span>Contact Number *</span>
                        </label>
                        <input
                          type="tel"
                          {...register("contactNumber", { required: true })}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                          placeholder="Enter contact number"
                        />
                        {errors.contactNumber && (
                          <p className="text-red-500 text-sm">Contact number is required</p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                          <HiMail className="text-purple-500" />
                          <span>Email Address *</span>
                        </label>
                        <input
                          type="email"
                          {...register("email", { required: true })}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                          placeholder="Enter email address"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm">Email is required</p>
                        )}
                      </div>

                      {/* Currency */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                          <HiCurrencyDollar className="text-yellow-500" />
                          <span>Currency *</span>
                        </label>
                        <select
                          {...register("currency", { required: true })}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                        >
                          <option value="">Select currency</option>
                          {currencyOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors.currency && (
                          <p className="text-red-500 text-sm">Currency is required</p>
                        )}
                      </div>
                    </div>

                    {/* Company Logo */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center space-x-2">
                        <FaImage className="text-indigo-500" />
                        <span>Company Logo</span>
                      </label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="file"
                          accept="image/*"
                          {...register("companyLogo")}
                          onChange={handleLogoChange}
                          className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                        />
                        {logoPreview && (
                          <img
                            src={logoPreview}
                            alt="Logo Preview"
                            className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                          />
                        )}
                      </div>
                    </div>

                    {/* Office Addresses */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <HiLocationMarker className="text-red-500" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Office Addresses</h3>
                      </div>

                      <div className="space-y-4">
                        {fields.map((item, index) => (
                          <div
                            key={item.id}
                            className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 relative"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Longitude
                                </label>
                                <input
                                  type="text"
                                  {...register(`offices.${index}.longitude`)}
                                  placeholder="Enter longitude"
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Latitude
                                </label>
                                <input
                                  type="text"
                                  {...register(`offices.${index}.latitude`)}
                                  placeholder="Enter latitude"
                                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Office Address
                              </label>
                              <textarea
                                {...register(`offices.${index}.address`)}
                                placeholder="Enter office address"
                                rows="3"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                              />
                            </div>
                            {fields.length > 1 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="absolute top-2 right-2 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                              >
                                <FaTimes className="text-sm" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => append({ longitude: "", latitude: "", address: "" })}
                        className="flex items-center space-x-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      >
                        <FaPlus className="text-sm" />
                        <span>Add Another Office</span>
                      </button>
                    </div>

                    {/* Form Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200 dark:border-gray-600">
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <FaUndo className="text-sm" />
                        <span>Cancel</span>
                      </button>
                      <button
                        type="submit"
                        className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        <FaSave className="text-sm" />
                        <span>{editingCompany ? "Update Company" : "Save Company"}</span>
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Companies List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Registered Companies ({companies.length})
              </h2>
            </div>

            {companies.length === 0 ? (
              <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaBuilding className="text-2xl text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No Companies Found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Add your first company to get started
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companies.map((company, idx) => (
                  <div
                    key={company._id || idx}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Company Header */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                          {company.logo ? (
                            <img
                              src={company.logo}
                              alt="Company Logo"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FaBuilding className="text-gray-400 text-xl" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {company.name || "Unnamed Company"}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Branch #{idx + 1}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Company Details */}
                    <div className="p-6 space-y-4">
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center space-x-3">
                          <FaPhone className="text-green-500 text-sm" />
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Contact</p>
                            <p className="text-sm text-gray-900 dark:text-white">
                              {company.contact || "Not provided"}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <FaEnvelope className="text-purple-500 text-sm" />
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                            <p className="text-sm text-gray-900 dark:text-white">
                              {company.email || "Not provided"}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <FaDollarSign className="text-yellow-500 text-sm" />
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Currency</p>
                            <p className="text-sm text-gray-900 dark:text-white">
                              {company.currency || "Not specified"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Addresses */}
                      {company.addresses && company.addresses.length > 0 && (
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center space-x-2 mb-3">
                            <FaMapMarkerAlt className="text-red-500 text-sm" />
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              Office Locations ({company.addresses.length})
                            </p>
                          </div>
                          <div className="space-y-2 max-h-32 overflow-y-auto">
                            {company.addresses.map((office, i) => (
                              <div key={i} className="text-sm bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                                <p className="font-medium text-gray-900 dark:text-white">
                                  Address #{i + 1}
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                  {office.address || "No address provided"}
                                </p>
                                {(office.latitude || office.longitude) && (
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Lat: {office.latitude || "—"}, Lng: {office.longitude || "—"}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={() => handleEditCompany(company)}
                          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                          <FaEdit className="text-sm" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteClick(company)}
                          className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                        >
                          <FaTrash className="text-sm" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmationDialog
        open={openConfirm}
        title="Confirm Deletion"
        message="Are you sure you want to delete this company? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Yes, delete it!"
        cancelText="Cancel"
      />
    </>
  );
}
