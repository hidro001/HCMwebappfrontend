import React, { useState } from 'react';
import { submitQualifications } from '../../../../service/registrationService';
import { toast } from 'react-hot-toast';

export default function QualificationForm() {
  const [qualifications, setQualifications] = useState([createEmptyQualification()]);
  const [errors, setErrors] = useState([{}]);
  const empid = localStorage.getItem('employeeId');

  function createEmptyQualification() {
    return {
      qualificationName: '',
      universityBoard: '',
      specialization: '',
      certifications: '',
      totalMarks: '',
      year: '',
      percentageCgpa: '',
    };
  }

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...qualifications];
    updated[index][name] = value;
    setQualifications(updated);
    validateField(index, name, value);
  };

  const validateField = (index, name, value) => {
    const fieldErrors = [...errors];
    const errorText = getValidationError(name, value);
    fieldErrors[index] = { ...fieldErrors[index], [name]: errorText };
    setErrors(fieldErrors);
  };

  const getValidationError = (name, value) => {
    if (!value) return 'This field is required';
    if ((name === 'totalMarks' || name === 'year') && isNaN(value)) return 'Must be a number';
    if (name === 'percentageCgpa' && isNaN(parseFloat(value))) return 'Must be a valid percentage or CGPA';
    return '';
  };

  const isFormValid = () => {
    return qualifications.every((q, index) =>
      Object.keys(q).every((key) => q[key] && !getValidationError(key, q[key]))
    );
  };

  const addMore = () => {
    setQualifications([...qualifications, createEmptyQualification()]);
    setErrors([...errors, {}]);
  };

  const removeField = (index) => {
    if (qualifications.length === 1) return;
    setQualifications(qualifications.filter((_, i) => i !== index));
    setErrors(errors.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      toast.error('Please fill in all required fields correctly.');
      return;
    }

    const result = await submitQualifications(empid, qualifications);

    if (result.success) {
      toast.success('Qualifications submitted successfully!');
      setQualifications([createEmptyQualification()]);
      setErrors([{}]);
    } else {
      toast.error(`Failed to submit: ${result.error}`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-white mb-6">Qualifications</h2>

      <form onSubmit={handleSubmit} className="space-y-10">
        {qualifications.map((qual, index) => (
          <div
            key={index}
            className="relative border border-gray-600 rounded-xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#0e1322]"
          >
            {qualifications.length > 1 && (
              <button
                type="button"
                onClick={() => removeField(index)}
                className="absolute top-3 right-3 text-sm text-red-400 hover:text-red-600"
              >
                Remove
              </button>
            )}

            {renderField('Qualification Name', 'qualificationName', index, qual.qualificationName)}
            {renderField('University/Board', 'universityBoard', index, qual.universityBoard)}
            {renderField('Certifications & Licenses', 'certifications', index, qual.certifications)}
            {renderField('Specialization', 'specialization', index, qual.specialization)}
            {renderField('Total Marks', 'totalMarks', index, qual.totalMarks, 'number')}
            {renderField('Passing Year', 'year', index, qual.year, 'number')}
            {renderField('Percentage/CGPA', 'percentageCgpa', index, qual.percentageCgpa)}
          </div>
        ))}

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
            disabled={!isFormValid()}
            className={`px-6 py-2 rounded-md text-white transition ${
              isFormValid() ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-500 cursor-not-allowed'
            }`}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );

  function renderField(label, name, index, value, type = 'text') {
    return (
      <div className="flex flex-col">
        <label className="text-sm font-medium text-white mb-1">{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={(e) => handleChange(index, e)}
          placeholder={`Enter ${label}`}
          className={`bg-[#1e293b] text-white border ${
            errors[index]?.[name] ? 'border-red-500' : 'border-gray-600'
          } rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
            errors[index]?.[name] ? 'focus:ring-red-500' : 'focus:ring-blue-500'
          }`}
        />
        {errors[index]?.[name] && (
          <span className="text-xs text-red-400 mt-1">{errors[index][name]}</span>
        )}
      </div>
    );
  }
}
