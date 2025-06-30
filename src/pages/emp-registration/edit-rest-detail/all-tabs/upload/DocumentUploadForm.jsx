import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import axiosInstance from '../../../../../service/axiosInstance';

export default function DocumentUploadForm() {
  const [documents, setDocuments] = useState([{ name: '', file: null, preview: null, error: '' }]);
  const [message, setMessage] = useState('');
  const empid = localStorage.getItem('employeeId');

  const handleChange = (index, field, value) => {
    const updated = [...documents];
    updated[index][field] = value;
    updated[index].error = '';
    setDocuments(updated);
  };

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const updated = [...documents];
    updated[index].file = file;
    updated[index].error = '';

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updated[index].preview = reader.result;
        setDocuments([...updated]);
      };
      reader.readAsDataURL(file);
    } else {
      updated[index].preview = null;
      setDocuments([...updated]);
    }

    if (index === documents.length - 1 && updated[index].name.trim()) {
      updated.push({ name: '', file: null, preview: null, error: '' });
    }
  };

  const handleRemove = (index) => {
    const updated = [...documents];
    updated.splice(index, 1);
    setDocuments(updated.length ? updated : [{ name: '', file: null, preview: null, error: '' }]);
  };

  const validate = () => {
    const updated = documents.map((doc) => {
      if (!doc.name.trim()) return { ...doc, error: 'Document name is required' };
      if (!doc.file) return { ...doc, error: 'Please choose a file' };
      return { ...doc, error: '' };
    });
    setDocuments(updated);
    return updated.every((doc) => !doc.error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!empid) {
      setMessage("Employee ID not found in localStorage");
      return;
    }

    if (!validate()) return;

    try {
      setMessage('Uploading...');
      const formData = new FormData();

      documents.forEach((doc, i) => {
        formData.append(`documents[${i}][name]`, doc.name);
        formData.append(`documents[${i}][file]`, doc.file);
      });

      const response = await axiosInstance.post(
        `/registration/upload/documents/${empid}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data.success) {
        setMessage('Documents uploaded successfully!');
        setDocuments([{ name: '', file: null, preview: null, error: '' }]);
      } else {
        setMessage(response.data.message || 'Upload failed.');
      }
    } catch (err) {
      console.error(err);
      setMessage('Upload failed. Try again.');
    }
  };

  const isFormReady = documents.some((doc) => doc.name.trim() && doc.file);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col justify-between">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-white">
          Upload Documents <span className="text-red-500">*</span>
        </h3>

        {documents.map((doc, index) => (
          <div
            key={index}
            className="relative border border-gray-600 rounded-lg p-4 space-y-4 bg-[#0e1322]"
          >
            {documents.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                aria-label="Remove Document"
              >
                <X size={18} />
              </button>
            )}

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-white">
                Document Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter Document Name"
                value={doc.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
                className={`w-full bg-gray-800 text-white border ${
                  doc.error && !doc.name ? 'border-red-500' : 'border-gray-600'
                } rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {doc.error && !doc.name && (
                <p className="text-red-500 text-xs">{doc.error}</p>
              )}
            </div>

            <div className="flex items-start gap-4 flex-wrap">
              <label className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-md cursor-pointer hover:bg-gray-600">
                <Upload size={18} className="mr-2" />
                Select Document
                <input
                  type="file"
                  accept=".pdf,image/*"
                  onChange={(e) => handleFileChange(index, e)}
                  className="hidden"
                />
              </label>

              {doc.preview ? (
                <img
                  src={doc.preview}
                  alt="Preview"
                  className="h-16 w-16 object-cover border border-gray-500 rounded-md"
                />
              ) : (
                <span className="text-sm text-gray-300 truncate max-w-[250px] mt-2">
                  {doc.file?.name || 'No file chosen'}
                </span>
              )}

              {doc.error && doc.name && !doc.file && (
                <p className="text-red-500 text-xs w-full">{doc.error}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={!isFormReady}
          className={`bg-blue-600 text-white text-sm px-4 py-1.5 rounded transition ${
            isFormReady ? 'hover:bg-blue-700' : 'opacity-50 cursor-not-allowed'
          }`}
        >
          Upload
        </button>
      </div>

      {message && <p className="text-sm text-gray-300">{message}</p>}
    </form>
  );
}
