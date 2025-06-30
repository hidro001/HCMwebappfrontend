import React, { useState } from 'react';
import Select from 'react-select';
import axiosInstance from '../../../../service/axiosInstance';

const verificationOptions = [
  { value: 'Verified', label: 'Verified' },
  { value: 'Pending', label: 'Pending' }
];

const yesNoOptions = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' }
];

const policeOptions = [
  { value: 'Cleared', label: 'Cleared' },
  { value: 'Pending', label: 'Pending' }
];

const trainingOptions = [
  { value: 'upToDate', label: 'upToDate' },
  { value: 'needsRefresh', label: 'needsRefresh' },
  { value: 'needsCertification', label: 'needsCertification' }
];

const complianceOptions = [
  { value: 'completed', label: 'completed' },
  { value: 'pending', label: 'pending' },
  { value: 'needsCertification', label: 'needsCertification' }
];

export default function BenefitsAndVerificationForm({ employeeId }) {
  const [form, setForm] = useState({
    gratuity_Details: '',
    medical_Insurance: '',
    other_Benefits: '',
    background_Verification_Status: '',
    police_Verification: '',
    trainingStatus: '',
    complianceTrainingStatus: ''
  });

  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelect = (name, option) => {
    setForm({ ...form, [name]: option?.value || '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosInstance.post(`/registration/verification-benefits/${employeeId}`, form);
      alert('Saved!');
    } catch (err) {
      console.error(err);
      alert('Error saving data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 rounded-lg bg-white dark:bg-[#0e1322] text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 mb-10"
    >
      <h3 className="text-xl font-bold">Gratuity & Verification</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <Textarea name="gratuity_Details" label="Gratuity Eligibility & Details" value={form.gratuity_Details} onChange={handleInput} />
        <SelectField name="medical_Insurance" label="Medical Insurance / Health Benefits *" value={form.medical_Insurance} options={yesNoOptions} onChange={handleSelect} />
        <Textarea name="other_Benefits" label="Other Company-Specific Benefits" value={form.other_Benefits} onChange={handleInput} />
        <SelectField name="background_Verification_Status" label="Background Verification Status *" value={form.background_Verification_Status} options={verificationOptions} onChange={handleSelect} />
      </div>

      <h3 className="text-xl font-bold pt-6">Verification & Certifications</h3>
      <div className="grid md:grid-cols-3 gap-4">
        <SelectField name="police_Verification" label="Police Verification" value={form.police_Verification} options={policeOptions} onChange={handleSelect} />
        <SelectField name="trainingStatus" label="Training Status" value={form.trainingStatus} options={trainingOptions} onChange={handleSelect} />
        <SelectField name="complianceTrainingStatus" label="Compliance Training Status" value={form.complianceTrainingStatus} options={complianceOptions} onChange={handleSelect} />
      </div>

      <div className="pt-6 text-right">
        <button type="submit" disabled={loading} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
          {loading ? 'Saving...' : 'Save Info'}
        </button>
      </div>
    </form>
  );
}

// ========== Input Components ==========

function Textarea({ name, label, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm mb-1">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={3}
        className="bg-gray-100 dark:bg-[#1e293b] text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded px-3 py-2"
      />
    </div>
  );
}

function SelectField({ name, label, value, onChange, options }) {
  return (
    <div className="flex flex-col z-10"> {/* Ensures dropdown is not clipped */}
      <label className="text-sm mb-1">{label}</label>
      <Select
        value={options.find(opt => opt.value === value)}
        onChange={(opt) => onChange(name, opt)}
        options={options}
        menuPortalTarget={document.body}
        menuPosition="absolute"
        classNamePrefix="select"
        styles={{
          menuPortal: base => ({ ...base, zIndex: 9999 }),
          control: (base) => ({
            ...base,
            backgroundColor: '#1e293b',
            borderColor: '#4b5563',
            color: 'white',
          }),
          menu: (base) => ({ ...base, backgroundColor: '#1e293b' }),
          singleValue: (base) => ({ ...base, color: 'white' }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected ? '#2563eb' : state.isFocused ? '#374151' : 'transparent',
            color: 'white',
          }),
        }}
      />
    </div>
  );
}
