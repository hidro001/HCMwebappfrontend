import React, { useState } from 'react';
import axiosInstance from '../../../../service/axiosInstance';

export default function PersonalIdentityForm() {
  const [form, setForm] = useState({
    pan_No: '',
    adhaar_Number: '',
    pf_Details: '',
    esi_Details: '',
    passport_Number: '',
    bank_Holder_Name: '',
    bank_Name: '',
    bank_Account_No: '',
    confirm_Account_No: '',
    ifsc_Code: '',
  });

  const [loading, setLoading] = useState(false);
  const empid = localStorage.getItem('employeeId');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.bank_Account_No !== form.confirm_Account_No) {
      alert("Bank account numbers do not match");
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.post(`/registration/personal-bank/${empid}`, form);
      alert('Saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 bg-[#0e1322] text-white rounded-lg">
      <h3 className="text-xl font-bold mb-4">Personal Identity</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <Input label="PAN Number" name="pan_No" value={form.pan_No} onChange={handleChange} required />
        <Input label="Aadhaar Number" name="adhaar_Number" value={form.adhaar_Number} onChange={handleChange} required />
        <Input label="PF Details" name="pf_Details" value={form.pf_Details} onChange={handleChange} />
        <Input label="ESI Details" name="esi_Details" value={form.esi_Details} onChange={handleChange} />
        <Input label="Passport Number" name="passport_Number" value={form.passport_Number} onChange={handleChange} />
      </div>

      <h3 className="text-xl font-bold mt-6 mb-4">Bank Details</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <Input label="Bank Holder Name" name="bank_Holder_Name" value={form.bank_Holder_Name} onChange={handleChange} required />
        <Input label="Bank Name" name="bank_Name" value={form.bank_Name} onChange={handleChange} required />
        <Input label="Bank Account No." name="bank_Account_No" value={form.bank_Account_No} onChange={handleChange} required />
        <Input label="Confirm Account No." name="confirm_Account_No" value={form.confirm_Account_No} onChange={handleChange} required />
        <Input label="IFSC Code" name="ifsc_Code" value={form.ifsc_Code} onChange={handleChange} required />
      </div>

      <button type="submit" disabled={loading} className="bg-green-600 px-6 py-2 rounded hover:bg-green-700">
        {loading ? 'Saving...' : 'Save Info'}
      </button>
    </form>
  );
}

function Input({ label, name, value, onChange, required }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm mb-1">{label}{required && ' *'}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="bg-[#1e293b] border border-gray-600 rounded px-4 py-2 text-white"
      />
    </div>
  );
}
