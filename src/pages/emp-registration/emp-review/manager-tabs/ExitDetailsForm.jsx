import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axiosInstance from '../../../../service/axiosInstance';

export default function ExitDetailsForm({ employeeId }) {
  const [form, setForm] = useState({
    certifications: '',
    org_Specific_IDs: '',
    date_of_Resignation: '',
    reason_for_Leaving: '',
    notice_Period_Served: '',
    exit_Interview_Feedback: '',
    full_Final_Settlement: '',
    relieving_Certificate_Date: '',
  });

  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const errors = [];
    const { date_of_Resignation, reason_for_Leaving, notice_Period_Served, relieving_Certificate_Date } = form;

    if (!date_of_Resignation) errors.push('Date of Resignation is required.');
    if (!relieving_Certificate_Date) errors.push('Relieving Certificate Date is required.');
    if (!reason_for_Leaving.trim()) errors.push('Reason for Leaving is required.');
    if (!notice_Period_Served.trim()) errors.push('Notice Period Served is required.');

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (errors.length) {
      errors.forEach(err => toast.error(err));
      return;
    }

    try {
      setLoading(true);
      const res = await axiosInstance.post(
        `/registration/exit-details/${employeeId}`,
        form
      );
      toast.success(res.data?.message || 'Exit details saved successfully!');

      // ✅ Clear the form after success
      setForm({
        certifications: '',
        org_Specific_IDs: '',
        date_of_Resignation: '',
        reason_for_Leaving: '',
        notice_Period_Served: '',
        exit_Interview_Feedback: '',
        full_Final_Settlement: '',
        relieving_Certificate_Date: '',
      });

    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
   <form
  onSubmit={handleSubmit}
  className="space-y-6 p-6 pb-16 rounded-lg bg-white dark:bg-[#0e1322] text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 overflow-y-auto"
>
      <h3 className="text-xl font-bold">Exit Details</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <Textarea name="certifications" label="Legal or Regulatory Certifications" value={form.certifications} onChange={handleChange} />
        <Textarea name="org_Specific_IDs" label="Organization-Specific ID(s)" value={form.org_Specific_IDs} onChange={handleChange} />
        <Input name="date_of_Resignation" type="date" label="Date of Resignation / Separation" value={form.date_of_Resignation} onChange={handleChange} />
        <Textarea name="reason_for_Leaving" label="Reason for Leaving" value={form.reason_for_Leaving} onChange={handleChange} />
        <Input name="notice_Period_Served" label="Notice Period Served" value={form.notice_Period_Served} onChange={handleChange} />
        <Textarea name="exit_Interview_Feedback" label="Exit Interview Feedback" value={form.exit_Interview_Feedback} onChange={handleChange} />
        <Textarea name="full_Final_Settlement" label="Full & Final Settlement Details" value={form.full_Final_Settlement} onChange={handleChange} />
        <Input name="relieving_Certificate_Date" type="date" label="Relieving Certificate Issued Date" value={form.relieving_Certificate_Date} onChange={handleChange} />
      </div>

      <div className="text-right">
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          {loading ? 'Saving...' : 'Save Exit Info'}
        </button>
      </div>
    </form>
  );
}

function Input({ name, label, value, onChange, type = 'text' }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm mb-1 font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="bg-gray-100 dark:bg-[#1e293b] border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm text-black dark:text-white"
      />
    </div>
  );
}

function Textarea({ name, label, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm mb-1 font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={3}
        className="bg-gray-100 dark:bg-[#1e293b] border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm text-black dark:text-white"
      />
    </div>
  );
}
