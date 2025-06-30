import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import axiosInstance from '../../../../service/axiosInstance';

const languageOptions = [

 { value: "English", label: "English" },
  { value: "Spanish", label: "Spanish" },
  { value: "Mandarin", label: "Mandarin" },
  { value: "Hindi", label: "Hindi" },
  { value: "Arabic", label: "Arabic" },
  { value: "Portuguese", label: "Portuguese" },
  { value: "Bengali", label: "Bengali" },
  { value: "Russian", label: "Russian" },
  { value: "Japanese", label: "Japanese" },
  { value: "German", label: "German" },
  { value: "French", label: "French" },
  { value: "Italian", label: "Italian" },
  { value: "Korean", label: "Korean" },
  { value: "Vietnamese", label: "Vietnamese" },
  { value: "Turkish", label: "Turkish" },
  { value: "Persian", label: "Persian" },
  { value: "Swahili", label: "Swahili" },
  { value: "Dutch", label: "Dutch" },
  { value: "Polish", label: "Polish" },
  { value: "Urdu", label: "Urdu" },
  { value: "Indonesian", label: "Indonesian" },
  { value: "Thai", label: "Thai" },
  { value: "Romanian", label: "Romanian" },
  { value: "Greek", label: "Greek" },
  { value: "Czech", label: "Czech" },
  { value: "Hungarian", label: "Hungarian" },
  { value: "Swedish", label: "Swedish" },
  { value: "Norwegian", label: "Norwegian" },
  { value: "Finnish", label: "Finnish" },
  { value: "Danish", label: "Danish" },
  { value: "Hebrew", label: "Hebrew" },
  { value: "Malay", label: "Malay" },
  { value: "Tamil", label: "Tamil" },
  { value: "Telugu", label: "Telugu" },
  { value: "Marathi", label: "Marathi" },
  { value: "Gujarati", label: "Gujarati" },
  { value: "Kannada", label: "Kannada" },
  { value: "Malayalam", label: "Malayalam" },
  { value: "Punjabi", label: "Punjabi" },
  { value: "Burmese", label: "Burmese" },
  { value: "Bulgarian", label: "Bulgarian" },
  { value: "Slovak", label: "Slovak" },
  { value: "Croatian", label: "Croatian" },
  { value: "Serbian", label: "Serbian" },
  { value: "Ukrainian", label: "Ukrainian" },
  { value: "Lithuanian", label: "Lithuanian" },
  { value: "Latvian", label: "Latvian" },
  { value: "Estonian", label: "Estonian" },
  { value: "Slovenian", label: "Slovenian" },
  { value: "Icelandic", label: "Icelandic" },
  { value: "Irish", label: "Irish" },
  { value: "Scots Gaelic", label: "Scots Gaelic" },


];
export default function ExperienceForm() {
  const [experiences, setExperiences] = useState([
    {
      companyName: '',
      designation: '',
      grade_Band_Level: '',
      previous_Positions: '',
      startDate: '',
      endDate: '',
    },
  ]);

  const [languages, setLanguages] = useState([]);
  const [totalExperience, setTotalExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const empid = localStorage.getItem('employeeId');

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...experiences];
    updated[index][name] = value;
    setExperiences(updated);
  };

  const addMore = () => {
    setExperiences([
      ...experiences,
      {
        companyName: '',
        designation: '',
        grade_Band_Level: '',
        previous_Positions: '',
        startDate: '',
        endDate: '',
      },
    ]);
  };

  const removeField = (index) => {
    if (experiences.length === 1) return;
    const updated = experiences.filter((_, i) => i !== index);
    setExperiences(updated);
  };

  const isFormValid = () => {
    if (!languages.length || totalExperience.trim() === '') return false;

    return experiences.every(exp =>
      exp.companyName.trim() &&
      exp.designation.trim() &&
      exp.grade_Band_Level.trim() &&
      exp.previous_Positions.trim() &&
      exp.startDate &&
      exp.endDate
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setError('Please fill all required fields.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      await axiosInstance.post(`/registration/experiences/${empid}`, {
        experiences,
        languages_Known: languages.map((lang) => lang.value),
        total_Experience: parseFloat(totalExperience || 0),
      });

      alert('Experience submitted successfully!');

      // ✅ Reset form
      setExperiences([
        {
          companyName: '',
          designation: '',
          grade_Band_Level: '',
          previous_Positions: '',
          startDate: '',
          endDate: '',
        },
      ]);
      setLanguages([]);
      setTotalExperience('');
    } catch (err) {
      console.error(err);
      alert('Failed to submit experience.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-white mb-6">Experience</h2>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-10">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="relative border border-gray-600 rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 bg-[#0e1322]"
          >
            {experiences.length > 1 && (
              <button
                type="button"
                onClick={() => removeField(index)}
                className="absolute top-3 right-3 text-sm text-red-400 hover:text-red-600"
              >
                Remove
              </button>
            )}

            <InputField label="Company Name *" name="companyName" value={exp.companyName} onChange={(e) => handleChange(index, e)} placeholder="Enter Company Name" />
            <InputField label="Designation *" name="designation" value={exp.designation} onChange={(e) => handleChange(index, e)} placeholder="Enter Designation" />
            <InputField label="Grade / Band / Level *" name="grade_Band_Level" value={exp.grade_Band_Level} onChange={(e) => handleChange(index, e)} placeholder="Enter Grade/Band/Level" />
            <InputField label="Previous Positions *" name="previous_Positions" value={exp.previous_Positions} onChange={(e) => handleChange(index, e)} placeholder="Enter previous roles" />
            <InputField label="Start Date *" name="startDate" type="date" value={exp.startDate} onChange={(e) => handleChange(index, e)} />
            <InputField label="End Date *" name="endDate" type="date" value={exp.endDate} onChange={(e) => handleChange(index, e)} />
          </div>
        ))}

        {/* Additional Fields */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-white mb-1">
              Languages Known <span className="text-red-500">*</span>
            </label>
            <Select
              options={languageOptions}
              isMulti
              value={languages}
              onChange={setLanguages}
              classNamePrefix="react-select"
              styles={{
                control: (base) => ({
                  ...base,
                  backgroundColor: '#1e293b',
                  color: 'white',
                  borderColor: '#4b5563',
                }),
                menu: (base) => ({ ...base, backgroundColor: '#1e293b' }),
                multiValue: (base) => ({ ...base, backgroundColor: '#334155' }),
                multiValueLabel: (base) => ({ ...base, color: 'white' }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isSelected
                    ? '#2563eb'
                    : state.isFocused
                    ? '#374151'
                    : '#1e293b',
                  color: 'white',
                }),
              }}
            />
          </div>

          <InputField
            label="Total Years of Experience *"
            name="totalExperience"
            type="number"
            value={totalExperience}
            onChange={(e) => setTotalExperience(e.target.value)}
            placeholder="e.g. 3"
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={addMore}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Add More
          </button>
          <button
            type="submit"
            disabled={!isFormValid() || loading}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

function InputField({ label, name, value, onChange, placeholder, type = 'text' }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-white mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-[#1e293b] text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
