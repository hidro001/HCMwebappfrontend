// import React, { useState, useEffect } from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { motion } from "framer-motion";
// import { toast } from "react-hot-toast";
// import { FaTrash } from "react-icons/fa";
// import useCompanyStore from "../../store/companyStore";
// import FullScreenLoader from "../common/FullScreenLoader";
// import ConfirmationDialog from "../common/ConfirmationDialog";

// export default function CompanyInfo() {
//   const {
//     companies,
//     loading,
//     fetchCompanies,
//     saveCompany,
//     updateCompany,
//     deleteCompany,
//     editingCompany,
//     setEditingCompany,
//     clearEditingCompany,
//   } = useCompanyStore();

//   const [logoPreview, setLogoPreview] = useState(null);
//   const [openConfirm, setOpenConfirm] = useState(false);
//   const [companyToDelete, setCompanyToDelete] = useState(null);

//   const currencyOptions = [
//     { label: "USD - United States Dollar", value: "USD" },
//     { label: "EUR - Euro", value: "EUR" },
//     { label: "JPY - Japanese Yen", value: "JPY" },
//     { label: "GBP - British Pound Sterling", value: "GBP" },
//     { label: "AUD - Australian Dollar", value: "AUD" },
//     { label: "CAD - Canadian Dollar", value: "CAD" },
//     { label: "CHF - Swiss Franc", value: "CHF" },
//     { label: "CNY - Chinese Yuan Renminbi", value: "CNY" },
//     { label: "INR - Indian Rupee", value: "INR" },
//     { label: "BRL - Brazilian Real", value: "BRL" },
//     { label: "RUB - Russian Ruble", value: "RUB" },
//     { label: "ZAR - South African Rand", value: "ZAR" },
//     { label: "SGD - Singapore Dollar", value: "SGD" },
//     { label: "HKD - Hong Kong Dollar", value: "HKD" },
//     { label: "KRW - South Korean Won", value: "KRW" },
//     { label: "MXN - Mexican Peso", value: "MXN" },
//     { label: "MYR - Malaysian Ringgit", value: "MYR" },
//     { label: "THB - Thai Baht", value: "THB" },
//     { label: "SEK - Swedish Krona", value: "SEK" },
//     { label: "NOK - Norwegian Krone", value: "NOK" },
//     { label: "DKK - Danish Krone", value: "DKK" },
//     { label: "PLN - Polish Zloty", value: "PLN" },
//     { label: "NZD - New Zealand Dollar", value: "NZD" },
//     { label: "PHP - Philippine Peso", value: "PHP" },
//     { label: "IDR - Indonesian Rupiah", value: "IDR" },
//     { label: "TRY - Turkish Lira", value: "TRY" },
//     { label: "AED - United Arab Emirates Dirham", value: "AED" },
//     { label: "SAR - Saudi Riyal", value: "SAR" },
//     { label: "ILS - Israeli Shekel", value: "ILS" },
//     { label: "EGP - Egyptian Pound", value: "EGP" },
//     { label: "PKR - Pakistani Rupee", value: "PKR" },
//     { label: "VND - Vietnamese Dong", value: "VND" },
//   ];

//   const {
//     register,
//     handleSubmit,
//     reset,
//     control,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       companyName: "",
//       companyLogo: null,
//       contactNumber: "",
//       currency: "",
//       email: "",
//       offices: [{ longitude: "", latitude: "", address: "" }],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({ control, name: "offices" });

//   useEffect(() => {
//     fetchCompanies();
//   }, [fetchCompanies]);

//   useEffect(() => {
//     if (editingCompany) {
//       reset({
//         companyName: editingCompany.name || "",
//         contactNumber: editingCompany.contact || "",
//         email: editingCompany.email || "",
//         currency: editingCompany.currency || "",
//         offices:
//           editingCompany.addresses && editingCompany.addresses.length > 0
//             ? editingCompany.addresses
//             : [{ longitude: "", latitude: "", address: "" }],
//         companyLogo: null,
//       });
//       setLogoPreview(editingCompany.logo || null);
//     } else {
//       reset({
//         companyName: "",
//         contactNumber: "",
//         email: "",
//         currency: "",
//         offices: [{ longitude: "", latitude: "", address: "" }],
//         companyLogo: null,
//       });
//       setLogoPreview(null);
//     }
//   }, [editingCompany, reset]);

//   const handleLogoChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setLogoPreview(URL.createObjectURL(file));
//     } else {
//       setLogoPreview(null);
//     }
//   };

//   const onSubmit = async (data) => {
//     const formData = new FormData();
//     formData.append("name", data.companyName);
//     formData.append("contact", data.contactNumber);
//     formData.append("email", data.email);
//     formData.append("currency", data.currency);

//     data.offices.forEach((office, index) => {
//       formData.append(`addresses[${index}][address]`, office.address.trim());
//       formData.append(`addresses[${index}][latitude]`, office.latitude.trim());
//       formData.append(`addresses[${index}][longitude]`, office.longitude.trim());
//     });

//     if (data.companyLogo && data.companyLogo[0]) {
//       formData.append("logo", data.companyLogo[0]);
//     }

//     if (editingCompany && (editingCompany._id || editingCompany.id)) {
//       const id = editingCompany._id || editingCompany.id;
//       await updateCompany(id, formData);
//     } else {
//       await saveCompany(formData);
//     }

//     reset({
//       companyName: "",
//       contactNumber: "",
//       email: "",
//       currency: "",
//       offices: [{ longitude: "", latitude: "", address: "" }],
//       companyLogo: null,
//     });
//     setLogoPreview(null);
//     clearEditingCompany();
//   };

//   const handleEditCompany = (company) => {
//     setEditingCompany(company);
//   };

//   const handleDeleteClick = (company) => {
//     setCompanyToDelete(company);
//     setOpenConfirm(true);
//   };

//   const handleConfirmDelete = async () => {
//     if (companyToDelete && (companyToDelete._id || companyToDelete.id)) {
//       const id = companyToDelete._id || companyToDelete.id;
//       await deleteCompany(id);
//     }
//     setOpenConfirm(false);
//     setCompanyToDelete(null);
//   };

//   const handleCancelDelete = () => {
//     setOpenConfirm(false);
//     setCompanyToDelete(null);
//   };

//   const handleCancelEdit = () => {
//     reset({
//       companyName: "",
//       contactNumber: "",
//       email: "",
//       currency: "",
//       offices: [{ longitude: "", latitude: "", address: "" }],
//       companyLogo: null,
//     });
//     setLogoPreview(null);
//     clearEditingCompany();
//   };

//   return (
//     <>
//       {loading && <FullScreenLoader />}
//       <div className="p-4 md:p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//           className="mx-auto w-full bg-white dark:bg-gray-800 rounded-md shadow p-6"
//         >
//           <h2 className="text-2xl font-semibold mb-6">
//             {editingCompany ? "Edit Company Information" : "Add Company Information"}
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:col-span-2">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label htmlFor="companyName" className="block font-medium mb-1">
//                     Company Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     id="companyName"
//                     type="text"
//                     {...register("companyName", { required: true })}
//                     className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
//                     placeholder="Enter Company Name"
//                   />
//                   {errors.companyName && (
//                     <p className="text-red-500 text-sm mt-1">Company Name is required</p>
//                   )}
//                 </div>
//                 <div>
//                   <label htmlFor="companyLogo" className="block font-medium mb-1">
//                     Company Logo
//                   </label>
//                   <input
//                     id="companyLogo"
//                     type="file"
//                     accept="image/*"
//                     {...register("companyLogo")}
//                     onChange={handleLogoChange}
//                     className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
//                   />
//                   {logoPreview && (
//                     <div className="mt-2">
//                       <img src={logoPreview} alt="Logo Preview" className="object-contain h-20" />
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label htmlFor="contactNumber" className="block font-medium mb-1">
//                     Contact Number <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     id="contactNumber"
//                     type="tel"
//                     {...register("contactNumber", { required: true })}
//                     className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
//                     placeholder="Enter Contact Number"
//                   />
//                   {errors.contactNumber && (
//                     <p className="text-red-500 text-sm mt-1">Contact Number is required</p>
//                   )}
//                 </div>
//                 <div>
//                   <label htmlFor="currency" className="block font-medium mb-1">
//                     Currency <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     id="currency"
//                     {...register("currency", { required: true })}
//                     className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
//                   >
//                     <option value="">Select Currency</option>
//                     {currencyOptions.map((option) => (
//                       <option key={option.value} value={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </select>
//                   {errors.currency && (
//                     <p className="text-red-500 text-sm mt-1">Currency is required</p>
//                   )}
//                 </div>
//               </div>
//               <div>
//                 <label htmlFor="email" className="block font-medium mb-1">
//                   Email <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   id="email"
//                   type="email"
//                   {...register("email", { required: true })}
//                   className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
//                   placeholder="Enter Email Address"
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-sm mt-1">Email is required</p>
//                 )}
//               </div>
//               <div className="mt-4">
//                 <h3 className="text-lg font-medium mb-2">Office Addresses</h3>
//                 {fields.map((item, index) => (
//                   <div
//                     key={item.id}
//                     className="relative border border-gray-200 dark:border-gray-600 p-4 rounded-md mb-4 bg-white dark:bg-gray-800"
//                   >
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <label htmlFor={`offices[${index}].longitude`} className="block font-medium mb-1">
//                           Longitude
//                         </label>
//                         <input
//                           type="text"
//                           {...register(`offices.${index}.longitude`)}
//                           placeholder="Enter Longitude"
//                           className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
//                         />
//                       </div>
//                       <div>
//                         <label htmlFor={`offices[${index}].latitude`} className="block font-medium mb-1">
//                           Latitude
//                         </label>
//                         <input
//                           type="text"
//                           {...register(`offices.${index}.latitude`)}
//                           placeholder="Enter Latitude"
//                           className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
//                         />
//                       </div>
//                     </div>
//                     <div className="mt-4">
//                       <label htmlFor={`offices[${index}].address`} className="block font-medium mb-1">
//                         Office Address
//                       </label>
//                       <textarea
//                         {...register(`offices.${index}.address`)}
//                         placeholder="Enter Office Address"
//                         rows="2"
//                         className="w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-800"
//                       />
//                     </div>
//                     {fields.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => remove(index)}
//                         className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm p-1"
//                       >
//                         <FaTrash />
//                       </button>
//                     )}
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() => append({ longitude: "", latitude: "", address: "" })}
//                   className="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors text-sm"
//                 >
//                   Add Office Address
//                 </button>
//               </div>
//               <div className="flex space-x-4 mt-6">
//                 <button
//                   type="button"
//                   onClick={handleCancelEdit}
//                   className="px-4 py-2 rounded-md text-orange-600 border border-orange-600 hover:bg-orange-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
//                 >
//                   {editingCompany ? "Update" : "Save"}
//                 </button>
//               </div>
//             </form>
//             <div className="space-y-6 md:col-span-1 w-full">
//               {companies.map((company, idx) => (
//                 <div
//                   key={company._id || idx}
//                   className="shadow-lg p-4 rounded-md bg-white dark:bg-gray-800"
//                 >
//                   <h3 className="font-semibold text-xl mb-4 text-center">
//                     {company.name || "Unnamed Company"} (Branch - {idx + 1})
//                   </h3>
//                   <div className="w-full flex items-center justify-center mb-4">
//                     {company.logo ? (
//                       <img
//                         src={company.logo}
//                         alt="Company Logo"
//                         className="object-contain h-20"
//                       />
//                     ) : (
//                       <img
//                         src="https://via.placeholder.com/150?text=Logo"
//                         alt="placeholder"
//                         className="object-contain h-20"
//                       />
//                     )}
//                   </div>
//                   <div className="text-sm space-y-2">
//                     <p className="flex flex-col lg:flex-row lg:justify-between">
//                       <strong className="uppercase mr-1">Contact:</strong>
//                       <span>{company.contact || "—"}</span>
//                     </p>
//                     <p className="flex flex-col lg:flex-row lg:justify-between">
//                       <strong className="uppercase mr-1">Email:</strong>
//                       <span>{company.email || "—"}</span>
//                     </p>
//                     <p className="flex flex-col lg:flex-row lg:justify-between">
//                       <strong className="uppercase mr-1">Currency:</strong>
//                       <span>{company.currency || "—"}</span>
//                     </p>
//                     {company.addresses &&
//                       company.addresses.map((office, i) => (
//                         <div key={i} className="pt-3">
//                           <p className="flex flex-col lg:flex-row lg:justify-between">
//                             <strong className="uppercase mr-1">Address #{i + 1}:</strong>
//                             <span>{office.address || "No address"}</span>
//                           </p>
//                           <p className="flex flex-col lg:flex-row lg:justify-between">
//                             <strong className="uppercase mr-1">Latitude:</strong>
//                             <span>{office.latitude || "—"}</span>
//                           </p>
//                           <p className="flex flex-col lg:flex-row lg:justify-between">
//                             <strong className="uppercase mr-1">Longitude:</strong>
//                             <span>{office.longitude || "—"}</span>
//                           </p>
//                         </div>
//                       ))}
//                   </div>
//                   <div className="flex items-center space-x-2 mt-4 justify-center">
//                     <button
//                       onClick={() => handleEditCompany(company)}
//                       className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDeleteClick(company)}
//                       className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </motion.div>
//       </div>
//       <ConfirmationDialog
//         open={openConfirm}
//         title="Confirm Deletion"
//         message="Do you want to delete this company information?"
//         onConfirm={handleConfirmDelete}
//         onCancel={handleCancelDelete}
//         confirmText="Yes, delete it!"
//         cancelText="Cancel"
//       />
//     </>
//   );
// }

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

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    hover: {
      scale: 1.02,
      y: -5,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <>
      {loading && <FullScreenLoader />}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className=" bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-2xl p-4 md:p-6 lg:p-8"
      >
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full">
                <FaBuilding className="text-white text-2xl" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Company Management
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Manage your company information and office locations
            </p>
          </motion.div>

          {/* Add/Edit Company Form */}
          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <div
              className="p-6 bg-gradient-to-r from-blue-500 to-indigo-600 cursor-pointer"
              onClick={() => setIsFormExpanded(!isFormExpanded)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FaPlus className="text-white text-xl" />
                  <h2 className="text-2xl font-bold text-white">
                    {editingCompany
                      ? "Edit Company Information"
                      : "Add New Company"}
                  </h2>
                </div>
                <motion.div
                  animate={{ rotate: isFormExpanded ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaPlus className="text-white text-xl" />
                </motion.div>
              </div>
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
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="p-6 space-y-6"
                  >
                    {/* Basic Information Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Company Name */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="space-y-2"
                      >
                        <label className="flex items-center space-x-2 font-medium text-gray-700 dark:text-gray-300">
                          <HiOfficeBuilding className="text-blue-500" />
                          <span>
                            Company Name <span className="text-red-500">*</span>
                          </span>
                        </label>
                        <input
                          type="text"
                          {...register("companyName", { required: true })}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
                          placeholder="Enter Company Name"
                        />
                        {errors.companyName && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm flex items-center space-x-1"
                          >
                            <span>Company Name is required</span>
                          </motion.p>
                        )}
                      </motion.div>

                      {/* Contact Number */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="space-y-2"
                      >
                        <label className="flex items-center space-x-2 font-medium text-gray-700 dark:text-gray-300">
                          <HiPhone className="text-green-500" />
                          <span>
                            Contact Number{" "}
                            <span className="text-red-500">*</span>
                          </span>
                        </label>
                        <input
                          type="tel"
                          {...register("contactNumber", { required: true })}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
                          placeholder="Enter Contact Number"
                        />
                        {errors.contactNumber && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm"
                          >
                            Contact Number is required
                          </motion.p>
                        )}
                      </motion.div>

                      {/* Email */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="space-y-2"
                      >
                        <label className="flex items-center space-x-2 font-medium text-gray-700 dark:text-gray-300">
                          <HiMail className="text-purple-500" />
                          <span>
                            Email <span className="text-red-500">*</span>
                          </span>
                        </label>
                        <input
                          type="email"
                          {...register("email", { required: true })}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
                          placeholder="Enter Email Address"
                        />
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm"
                          >
                            Email is required
                          </motion.p>
                        )}
                      </motion.div>

                      {/* Currency */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="space-y-2"
                      >
                        <label className="flex items-center space-x-2 font-medium text-gray-700 dark:text-gray-300">
                          <HiCurrencyDollar className="text-yellow-500" />
                          <span>
                            Currency <span className="text-red-500">*</span>
                          </span>
                        </label>
                        <select
                          {...register("currency", { required: true })}
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
                        >
                          <option value="">Select Currency</option>
                          {currencyOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors.currency && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-500 text-sm"
                          >
                            Currency is required
                          </motion.p>
                        )}
                      </motion.div>

                      {/* Company Logo */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="space-y-2 md:col-span-2"
                      >
                        <label className="flex items-center space-x-2 font-medium text-gray-700 dark:text-gray-300">
                          <FaImage className="text-indigo-500" />
                          <span>Company Logo</span>
                        </label>
                        <div className="flex items-center space-x-4">
                          <input
                            type="file"
                            accept="image/*"
                            {...register("companyLogo")}
                            onChange={handleLogoChange}
                            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
                          />
                          {logoPreview && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="shrink-0"
                            >
                              <img
                                src={logoPreview}
                                alt="Logo Preview"
                                className="w-16 h-16 object-cover rounded-xl border-2 border-gray-200 dark:border-gray-600"
                              />
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    </div>

                    {/* Office Addresses Section */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <HiLocationMarker className="text-red-500 text-xl" />
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                          Office Addresses
                        </h3>
                      </div>

                      <AnimatePresence>
                        {fields.map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="relative bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900 p-6 rounded-xl border border-gray-200 dark:border-gray-600"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              <div className="space-y-2">
                                <label className="flex items-center space-x-2 font-medium text-gray-700 dark:text-gray-300">
                                  <FaGlobe className="text-blue-500" />
                                  <span>Longitude</span>
                                </label>
                                <input
                                  type="text"
                                  {...register(`offices.${index}.longitude`)}
                                  placeholder="Enter Longitude"
                                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="flex items-center space-x-2 font-medium text-gray-700 dark:text-gray-300">
                                  <FaGlobe className="text-blue-500" />
                                  <span>Latitude</span>
                                </label>
                                <input
                                  type="text"
                                  {...register(`offices.${index}.latitude`)}
                                  placeholder="Enter Latitude"
                                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="flex items-center space-x-2 font-medium text-gray-700 dark:text-gray-300">
                                <FaMapMarkerAlt className="text-red-500" />
                                <span>Office Address</span>
                              </label>
                              <textarea
                                {...register(`offices.${index}.address`)}
                                placeholder="Enter Office Address"
                                rows="3"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 resize-none"
                              />
                            </div>
                            {fields.length > 1 && (
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                type="button"
                                onClick={() => remove(index)}
                                className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors duration-200 shadow-lg"
                              >
                                <FaTimes className="text-sm" />
                              </motion.button>
                            )}
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() =>
                          append({ longitude: "", latitude: "", address: "" })
                        }
                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <FaPlus />
                        <span>Add Office Address</span>
                      </motion.button>
                    </div>

                    {/* Form Actions */}
                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200 dark:border-gray-600">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={handleCancelEdit}
                        className="flex items-center justify-center space-x-2 px-6 py-3 border-2 border-orange-500 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 rounded-xl font-medium transition-all duration-200"
                      >
                        <FaUndo />
                        <span>Cancel</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        <FaSave />
                        <span>
                          {editingCompany ? "Update Company" : "Save Company"}
                        </span>
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Companies Grid */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                <FaBuilding className="text-white text-lg" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                Registered Companies ({companies.length})
              </h2>
            </div>

            {companies.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <FaBuilding className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  No Companies Found
                </h3>
                <p className="text-gray-500 dark:text-gray-500">
                  Add your first company to get started
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {companies.map((company, idx) => (
                    <motion.div
                      key={company._id || idx}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      whileHover="hover"
                      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
                    >
                      {/* Card Header */}
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-xl font-bold truncate">
                              {company.name || "Unnamed Company"}
                            </h3>
                            <p className="text-blue-100 text-sm">
                              Branch #{idx + 1}
                            </p>
                          </div>
                          <div className="shrink-0">
                            {company.logo ? (
                              <img
                                src={company.logo}
                                alt="Company Logo"
                                className="w-12 h-12 object-cover rounded-lg border-2 border-white/20"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                                <FaBuilding className="text-xl" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-6 space-y-4">
                        {/* Contact Info */}
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                              <FaPhone className="text-green-600 dark:text-green-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Contact
                              </p>
                              <p className="text-gray-900 dark:text-gray-100 truncate">
                                {company.contact || "Not provided"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                              <FaEnvelope className="text-purple-600 dark:text-purple-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Email
                              </p>
                              <p className="text-gray-900 dark:text-gray-100 truncate">
                                {company.email || "Not provided"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                              <FaDollarSign className="text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Currency
                              </p>
                              <p className="text-gray-900 dark:text-gray-100">
                                {company.currency || "Not specified"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Addresses Section */}
                        {company.addresses && company.addresses.length > 0 && (
                          <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                            <div className="flex items-center space-x-2">
                              <FaMapMarkerAlt className="text-red-500" />
                              <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                                Office Locations ({company.addresses.length})
                              </h4>
                            </div>
                            <div className="space-y-3 max-h-40 overflow-y-auto">
                              {company.addresses.map((office, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.1 }}
                                  className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg space-y-2"
                                >
                                  <div className="flex items-start space-x-2">
                                    <FaMapMarkerAlt className="text-red-400 text-sm mt-1" />
                                    <div className="flex-1 min-w-0">
                                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                        Address #{i + 1}
                                      </p>
                                      <p className="text-sm text-gray-800 dark:text-gray-200 break-words">
                                        {office.address ||
                                          "No address provided"}
                                      </p>
                                    </div>
                                  </div>
                                  {(office.latitude || office.longitude) && (
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                      <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                                        <span className="font-medium text-blue-600 dark:text-blue-400">
                                          Lat:
                                        </span>
                                        <span className="ml-1 text-gray-700 dark:text-gray-300">
                                          {office.latitude || "—"}
                                        </span>
                                      </div>
                                      <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded">
                                        <span className="font-medium text-green-600 dark:text-green-400">
                                          Lng:
                                        </span>
                                        <span className="ml-1 text-gray-700 dark:text-gray-300">
                                          {office.longitude || "—"}
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex space-x-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleEditCompany(company)}
                            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            <FaEdit className="text-sm" />
                            <span>Edit</span>
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDeleteClick(company)}
                            className="flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            <FaTrash className="text-sm" />
                            <span>Delete</span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Confirmation Dialog */}
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
