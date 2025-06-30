import React, { useState } from 'react';
import Select from 'react-select';
import axiosInstance from '../../../../service/axiosInstance'
const bloodOptions = [
  { value: "A+", label: "A+" }, { value: "A-", label: "A-" },
  { value: "B+", label: "B+" }, { value: "B-", label: "B-" },
  { value: "AB+", label: "AB+" }, { value: "AB-", label: "AB-" },
  { value: "O+", label: "O+" }, { value: "O-", label: "O-" },
];

const genderOptions = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
  { value: 'Other', label: 'Other' },
];

export default function AdditionalInfoForm() {
  const [form, setForm] = useState({
    linkedin_Profile_URL: '',
    github_Portfolio_URL: '',
    disability_Status: '',
    marital_Status: '',
    nationality: '',
    emergency_Contact_Person: '',
    emergency_Contact_Number: '',
    emergency_Contact_Blood_Group: '',

    gender: '',
    dob: '',
    permanent_Address: '',
    current_Address: '',
    date_of_Conformation: '',
    working_Email_Id: '',
  });

  const [loading, setLoading] = useState(false);
  const empid = localStorage.getItem('employeeId');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelect = (name, selectedOption) => {
    setForm({ ...form, [name]: selectedOption?.value || '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosInstance.post(`/registration/additional-info/${empid}`, form);
      alert('Additional info saved!');
    } catch (err) {
      console.error(err);
      alert('Failed to save.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 p-4 md:p-6 rounded-lg bg-white dark:bg-[#0e1322] shadow border border-gray-200 dark:border-gray-700">

      {/* Personal Information Section */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-gray-700 dark:text-gray-200">Personal Information</legend>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm mb-1 text-gray-800 dark:text-white">Gender</label>
            <Select
              options={genderOptions}
              value={genderOptions.find(opt => opt.value === form.gender)}
              onChange={(opt) => handleSelect('gender', opt)}
              classNamePrefix="select"
              styles={selectStyles}
            />
          </div>
          <Input label="Date of Birth" name="dob" type="date" value={form.dob} onChange={handleChange} />
          <Textarea label="Permanent Address" name="permanent_Address" value={form.permanent_Address} onChange={handleChange} />
          <Textarea label="Current Address" name="current_Address" value={form.current_Address} onChange={handleChange} />
          <Input label="Date of Confirmation" name="date_of_Conformation" type="date" value={form.date_of_Conformation} onChange={handleChange} />
          <Input label="Office Email" name="working_Email_Id" value={form.working_Email_Id} onChange={handleChange} />
        </div>
      </fieldset>

      {/* Additional Information Section */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-gray-700 dark:text-gray-200">Additional Information</legend>
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="LinkedIn Profile URL" name="linkedin_Profile_URL" value={form.linkedin_Profile_URL} onChange={handleChange} />
          <Input label="GitHub/Portfolio URL" name="github_Portfolio_URL" value={form.github_Portfolio_URL} onChange={handleChange} />
          <Input label="Disability Status" name="disability_Status" value={form.disability_Status} onChange={handleChange} />
          <Input label="Marital Status *" name="marital_Status" value={form.marital_Status} onChange={handleChange} required />
          <Input label="Nationality *" name="nationality" value={form.nationality} onChange={handleChange} required />
          <Input label="Emergency Contact Person *" name="emergency_Contact_Person" value={form.emergency_Contact_Person} onChange={handleChange} required />
          <Input label="Emergency Contact Number *" name="emergency_Contact_Number" value={form.emergency_Contact_Number} onChange={handleChange} required />
          <div className="flex flex-col">
            <label className="text-sm mb-1 text-gray-800 dark:text-white">
              Emergency Contact Blood Group <span className="text-red-500">*</span>
            </label>
            <Select
              options={bloodOptions}
              value={bloodOptions.find(opt => opt.value === form.emergency_Contact_Blood_Group)}
              onChange={(opt) => handleSelect('emergency_Contact_Blood_Group', opt)}
              classNamePrefix="select"
              styles={selectStyles}
            />
          </div>
        </div>
      </fieldset>

      <div className="text-right">
        <button type="submit" disabled={loading} className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50">
          {loading ? 'Saving...' : 'Save Info'}
        </button>
      </div>
    </form>
  );
}

// Input Field Component
function Input({ label, name, value, onChange, type = 'text', required }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm mb-1 text-gray-800 dark:text-white">
        {label}{required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="bg-gray-100 dark:bg-[#1e293b] border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

// Textarea Component
function Textarea({ label, name, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm mb-1 text-gray-800 dark:text-white">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={3}
        className="bg-gray-100 dark:bg-[#1e293b] text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded px-4 py-2"
      />
    </div>
  );
}

// Select Style Overrides
const selectStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: 'transparent',
    borderColor: '#4b5563',
    color: 'white',
  }),
  menu: (base) => ({ ...base, backgroundColor: '#1e293b' }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? '#2563eb'
      : state.isFocused
      ? '#374151'
      : 'transparent',
    color: 'white',
  }),
  singleValue: (base) => ({ ...base, color: 'white' }),
  multiValueLabel: (base) => ({ ...base, color: 'white' }),
};
