import React, { useState } from "react";
import useVacancyStore from "../../../store/useVacancyStore";
import BaseModal from "../../common/BaseModal";

export default function ReferralModal({ isOpen, onClose, vacancy }) {
  const { createReferral } = useVacancyStore();
  const [referralData, setReferralData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    location: "",
    linkedIn: "",
    resume: null,
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setReferralData((prev) => ({ ...prev, resume: files[0] }));
    } else {
      setReferralData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("jobId", vacancy.id);
      formData.append("name", referralData.name);
      formData.append("email", referralData.email);
      formData.append("phone", referralData.phone);
      formData.append("address", referralData.address);
      formData.append("location", referralData.location);
      formData.append("linkedIn", referralData.linkedIn);
      formData.append("notes", referralData.notes);
      if (referralData.resume) {
        formData.append("resume", referralData.resume);
      }
      const response = await createReferral(formData);
      console.log("Referral submitted successfully:", response);
      alert("Referral submitted successfully!");
      setReferralData({
        name: "",
        email: "",
        phone: "",
        address: "",
        location: "",
        linkedIn: "",
        resume: null,
        notes: "",
      });
      onClose();
    } catch (err) {
      console.error("Error creating referral:", err);
      alert("Failed to create referral. Check console.");
    }
  };

  if (!isOpen || !vacancy) return null;

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Refer Candidate for: {vacancy.title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={referralData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={referralData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={referralData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={referralData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={referralData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">LinkedIn Profile</label>
            <input
              type="text"
              name="linkedIn"
              value={referralData.linkedIn}
              onChange={handleChange}
              placeholder="e.g. https://linkedin.com/in/username"
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Resume</label>
            <input
              type="file"
              name="resume"
              onChange={handleChange}
              className="block w-full text-sm text-gray-900 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Additional Notes</label>
            <textarea
              name="notes"
              value={referralData.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-2 border rounded hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit Referral
            </button>
          </div>
        </form>
      </div>
    </BaseModal>
  );
}
