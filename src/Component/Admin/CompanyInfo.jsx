import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const CompanyInfo = () => {
  const [companyInfo, setCompanyInfo] = useState({
    name: "",
    addresses: [""],
    contact: "",
    email: "",
    currency: "",
    logo: null,
  });
  const [savedInfo, setSavedInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  console.log("edit id is :", editId);

  const currencyOptions = [
    "USD - United States Dollar",
    "EUR - Euro",
    "JPY - Japanese Yen",
    "GBP - British Pound Sterling",
    "AUD - Australian Dollar",
    "CAD - Canadian Dollar",
    "CHF - Swiss Franc",
    "CNY - Chinese Yuan Renminbi",
    "INR - Indian Rupee",
    "BRL - Brazilian Real",
    "RUB - Russian Ruble",
    "ZAR - South African Rand",
    "SGD - Singapore Dollar",
    "HKD - Hong Kong Dollar",
    "KRW - South Korean Won",
    "MXN - Mexican Peso",
    "MYR - Malaysian Ringgit",
    "THB - Thai Baht",
    "SEK - Swedish Krona",
    "NOK - Norwegian Krone",
    "DKK - Danish Krone",
    "PLN - Polish Zloty",
    "NZD - New Zealand Dollar",
    "PHP - Philippine Peso",
    "IDR - Indonesian Rupiah",
    "TRY - Turkish Lira",
    "AED - United Arab Emirates Dirham",
    "SAR - Saudi Riyal",
    "ILS - Israeli Shekel",
    "EGP - Egyptian Pound",
    "PKR - Pakistani Rupee",
    "VND - Vietnamese Dong",
  ];

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const fetchCompanyInfo = async () => {
    try {
      const response = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/info/getCompanyInfo"
      );
      if (response.data.success) {
        // Ensure every entry has an addresses array
        const formattedData = response.data.data.map((info) => ({
          ...info,
          addresses: info.addresses || [], // Default to an empty array if undefined
        }));
        setSavedInfo(formattedData);
      } else {
        toast.error("Failed to fetch company information.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching company information.");
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setCompanyInfo((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCompanyInfo((prev) => ({ ...prev, logo: file }));
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    } else {
      setPreview(null);
    }
  };

  const handleAddressChange = (index, field, value) => {
    const updatedAddresses = [...companyInfo.addresses];
    if (!updatedAddresses[index])
      updatedAddresses[index] = { address: "", latitude: "", longitude: "" };
    updatedAddresses[index][field] = value;
    setCompanyInfo((prev) => ({ ...prev, addresses: updatedAddresses }));
  };

  const addAddressField = () => {
    setCompanyInfo((prev) => ({
      ...prev,
      addresses: [
        ...prev.addresses,
        { address: "", latitude: "", longitude: "" },
      ],
    }));
  };

  const removeAddressField = (index) => {
    const updatedAddresses = companyInfo.addresses.filter(
      (_, i) => i !== index
    );
    setCompanyInfo((prev) => ({ ...prev, addresses: updatedAddresses }));
  };

  const saveCompanyInfo = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", companyInfo.name);
      formData.append("contact", companyInfo.contact);
      formData.append("email", companyInfo.email);
      formData.append("currency", companyInfo.currency);

      companyInfo.addresses.forEach((addressObj, index) => {
        formData.append(
          `addresses[${index}][address]`,
          addressObj.address.trim()
        );
        formData.append(
          `addresses[${index}][latitude]`,
          addressObj.latitude.trim()
        );
        formData.append(
          `addresses[${index}][longitude]`,
          addressObj.longitude.trim()
        );
      });

      if (companyInfo.logo) {
        formData.append("logo", companyInfo.logo);
      }

      const url = isEditing
        ? `https://apiv2.humanmaximizer.com/api/v1/superadmin/info/editCompanyInfo/${editId}`
        : "https://apiv2.humanmaximizer.com/api/v1/superadmin/info/saveCompanyInfo";

      const response = await axios({
        method: isEditing ? "put" : "post",
        url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success(
          isEditing
            ? "Company information updated successfully!"
            : "Company information saved successfully!"
        );
        resetForm();
        fetchCompanyInfo();
      } else {
        toast.error(
          response.data.message || "Failed to save company information."
        );
      }
    } catch (error) {
      console.error(
        "Error saving company information:",
        error.message || error
      );
      toast.error(
        error.response?.data?.message ||
          "An error occurred while saving company information."
      );
    } finally {
      setLoading(false);
    }
  };

  const editCompanyInfo = (info) => {
    console.log("Editing Company Info:", info); // Debugging

    setIsEditing(true);
    setEditId(info.id);

    setCompanyInfo({
      name: info.name || "",
      addresses: info.addresses?.map((addressObj) => ({
        address: addressObj.address || "",
        latitude: addressObj.latitude || "",
        longitude: addressObj.longitude || "",
      })) || [{ address: "", latitude: "", longitude: "" }],
      contact: info.contact || "",
      email: info.email || "",
      currency: info.currency || "",
      logo: null,
    });

    setPreview(info.logo || null);
  };

  const deleteCompanyInfo = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this company information?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `https://apiv2.humanmaximizer.com/api/v1/superadmin/info/deleteCompanyInfo/${id}`
          );
          if (response.data.success) {
            Swal.fire(
              "Deleted!",
              "The company information has been deleted.",
              "success"
            );
            fetchCompanyInfo();
          } else {
            toast.error("Failed to delete company information.");
          }
        } catch (error) {
          console.error(error);
          toast.error("Error deleting company information.");
        }
      }
    });
  };

  const resetForm = () => {
    setCompanyInfo({
      name: "",
      addresses: [{ address: "", latitude: "", longitude: "" }], // Reset with one empty address object
      contact: "",
      email: "",
      currency: "",
      logo: null,
    });
    setPreview(null); // Clear logo preview
    setIsEditing(false); // Reset editing state
    setEditId(null); // Clear edit ID
  };

  return (
    <div className="container py-4 rzr-companyinfo p-5">
      <div className="card shadow">
        <div className="card-header  text-white text-center">
          <h4>
            {isEditing ? "Edit Company Information" : "Add Company Information"}
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={saveCompanyInfo}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="name" className="form-label fw-bold">
                  Company Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={companyInfo.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="logo" className="form-label fw-bold">
                  Company Logo
                </label>
                <input
                  type="file"
                  id="logo"
                  className="form-control"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                {preview && (
                  <div className="mt-2">
                    <img
                      src={preview}
                      alt="Preview"
                      className="img-thumbnail"
                      style={{ maxWidth: "100px" }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="mb-3">
                <label className="form-label fw-bold">Addresses</label>
                {companyInfo.addresses.map((addressObj, index) => (
                  <div key={index} className="mb-2">
                    <div className="d-flex align-items-center mb-2">
                      <textarea
                        className="form-control me-2"
                        rows="2"
                        value={addressObj.address}
                        onChange={(e) =>
                          handleAddressChange(index, "address", e.target.value)
                        }
                        placeholder="Enter address"
                        required
                      ></textarea>
                      {companyInfo.addresses.length > 1 && (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => removeAddressField(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <div className="d-flex mb-2">
                      <input
                        type="text"
                        className="form-control me-2"
                        value={addressObj.latitude}
                        onChange={(e) =>
                          handleAddressChange(index, "latitude", e.target.value)
                        }
                        placeholder="Latitude"
                      />
                      <input
                        type="text"
                        className="form-control"
                        value={addressObj.longitude}
                        onChange={(e) =>
                          handleAddressChange(
                            index,
                            "longitude",
                            e.target.value
                          )
                        }
                        placeholder="Longitude"
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={addAddressField}
                >
                  Add Address
                </button>
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="contact" className="form-label fw-bold">
                  Contact
                </label>
                <input
                  type="text"
                  id="contact"
                  className="form-control"
                  value={companyInfo.contact}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="email" className="form-label fw-bold">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={companyInfo.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="currency" className="form-label fw-bold">
                  Currency
                </label>
                <select
                  id="currency"
                  className="form-select"
                  value={companyInfo.currency}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select Currency
                  </option>
                  {currencyOptions.map((currency, index) => (
                    <option key={index} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary me-2"
                disabled={loading}
              >
                {loading ? "Saving..." : isEditing ? "Update" : "Save"}
              </button>
              <button
                type="button"
                className="btn text-light"
                style={{ backgroundColor: "#679903" }}
                onClick={resetForm}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="row mt-4">
        {savedInfo.map((info) => (
          <div key={info._id} className="col-md-4 mb-3">
            <div className="card shadow">
              <div
                className="card-header text-white text-center"
                style={{ backgroundColor: "#679903" }}
              >
                <h5>{info.name}</h5>
              </div>
              <div className="card-body">
                <p>
                  <strong>Addresses:</strong>
                </p>
                <ul>
                  {info.addresses && info.addresses.length > 0 ? (
                    info.addresses.map((addressObj, index) => (
                      <li key={index}>
                        <div>
                          <strong>Address:</strong>{" "}
                          {addressObj?.address?.trim() || "No Address Provided"}
                        </div>
                        <div>
                          <strong>Latitude:</strong>{" "}
                          {addressObj?.latitude || "N/A"}
                        </div>
                        <div>
                          <strong>Longitude:</strong>{" "}
                          {addressObj?.longitude || "N/A"}
                        </div>
                      </li>
                    ))
                  ) : (
                    <li>No Addresses Available</li>
                  )}
                </ul>

                <p>
                  <strong>Contact:</strong> {info.contact}
                </p>
                <p>
                  <strong>Email:</strong> {info.email}
                </p>
                <p>
                  <strong>Currency:</strong> {info.currency}
                </p>
                {info.logo && (
                  <div className="text-center">
                    <img
                      src={info.logo}
                      alt="Logo"
                      className="img-thumbnail"
                      style={{ maxWidth: "100px" }}
                    />
                  </div>
                )}
                <div className="mt-3 d-flex justify-content-between">
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteCompanyInfo(info._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn text-light"
                    style={{ backgroundColor: "#679903" }}
                    onClick={() => editCompanyInfo(info)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default CompanyInfo;
