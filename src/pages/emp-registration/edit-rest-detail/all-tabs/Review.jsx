import React, { useEffect, useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import toast from 'react-hot-toast';
import axiosInstance from '../../../../service/axiosInstance';

export default function Review() {
  const empid = localStorage.getItem('employeeId');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState('');

  useEffect(() => {
    if (!empid) return;
    (async () => {
      try {
        const res = await axiosInstance.get(`/registration/employee/sections/${empid}`);
        setData(res.data.data);
      } catch (err) {
        console.error('Failed to fetch structured employee data:', err);
        toast.error('Failed to fetch employee data.');
      } finally {
        setLoading(false);
      }
    })();
  }, [empid]);

  const handleEdit = (section, key) => {
    const value = data?.[section]?.[key] ?? '';
    setEditField({ section, key });
    setTempValue(typeof value === 'object' ? JSON.stringify(value, null, 2) : value);
  };

  const handleSave = async () => {
    try {
      const parsed = (() => {
        try {
          return JSON.parse(tempValue);
        } catch {
          return tempValue;
        }
      })();

      const payload = { [editField.key]: parsed };
      await axiosInstance.put(`/registration/employee/${empid}`, payload);
      setData(prev => ({
        ...prev,
        [editField.section]: {
          ...prev[editField.section],
          [editField.key]: parsed,
        },
      }));
      toast.success('Field updated successfully!');
      setEditField(null);
    } catch (err) {
      console.error('Update failed:', err);
      toast.error('Update failed. Please try again.');
    }
  };

  const orderedSections = {
    basic: 'Basic',
    qualifications: 'Qualification',
    experiences: 'Experience',
    identityAndBank: 'Identity & Bank',
    personalAndAdditional: 'Personal & Additional',
    uploads: 'Upload',
  };

  if (loading) return <p className="text-center p-6">Loading...</p>;
  if (!data) return <p className="text-center text-red-500">No data found.</p>;

  return (
    <div className="p-6 space-y-10 bg-white dark:bg-[#0e1322] text-gray-800 dark:text-gray-200 rounded-lg shadow">
      <h2 className="text-3xl font-bold border-b pb-2">📋 Review Information</h2>

      {Object.entries(orderedSections).map(([sectionKey, sectionTitle]) =>
        data[sectionKey] && Object.keys(data[sectionKey]).length > 0 ? (
          <Section key={sectionKey} title={sectionTitle} sectionKey={sectionKey} fields={data[sectionKey]} />
        ) : null
      )}
    </div>
  );

  function Section({ title, sectionKey, fields }) {
    const isArray = Array.isArray(fields);
    if (isArray || sectionKey === 'experiences') {
      const entries = sectionKey === 'experiences' ? fields.list : fields;
      return (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold border-b pb-1">{title}</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((item, idx) => (
              <div key={idx} className="bg-gray-100 dark:bg-gray-800 border border-gray-400 dark:border-gray-600 p-4 rounded-lg">
                {Object.entries(item).map(([k, v]) => (
                  <div key={k} className="mb-2">
                    <strong>{labelize(k)}:</strong>{' '}
                    <span className="break-words text-sm">{formatValue(v)}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {sectionKey === 'experiences' && fields.languages_Known?.length > 0 && (
            <div>
              <strong>Languages Known:</strong>
              <ul className="list-disc ml-6 text-sm mt-1">
                {fields.languages_Known.map((lang, i) => (
                  <li key={i}>{lang}</li>
                ))}
              </ul>
            </div>
          )}
          {sectionKey === 'experiences' && (
            <p className="mt-2 text-sm">
              <strong>Total Experience:</strong> {fields.total_Experience} year(s)
            </p>
          )}
        </div>
      );
    }

    if (sectionKey === 'uploads') {
      return (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold border-b pb-1">{title}</h3>
          {fields.avatar && (
            <div>
              <p className="font-medium mb-1">Avatar</p>
              <img src={fields.avatar} alt="Avatar" className="w-32 h-32 rounded-full object-cover border" />
            </div>
          )}
          {fields.documents && fields.documents.length > 0 && (
            <div>
              <p className="font-medium mb-2">Documents</p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {fields.documents.map((doc, i) => (
                  <div key={i} className="border rounded p-2 bg-white dark:bg-gray-800">
                    <p className="text-sm font-semibold">{doc.name}</p>
                    <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                      View
                    </a>
                    <img
                      src={doc.url}
                      alt={doc.name}
                      className="mt-2 max-h-40 rounded border object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold border-b pb-1">{title}</h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(fields).map(([key, value]) => (
            <div
              key={key}
              className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl p-4 shadow-sm"
            >
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{labelize(key)}</label>

              {editField?.key === key && editField?.section === sectionKey ? (
                <div className="mt-2 flex flex-col gap-2">
                  <textarea
                    rows={3}
                    value={tempValue}
                    onChange={(e) => setTempValue(e.target.value)}
                    className="w-full bg-white dark:bg-gray-700 text-sm text-black dark:text-white border border-gray-400 dark:border-gray-500 rounded px-2 py-1"
                  />
                  <div className="flex gap-2 justify-end">
                    <button onClick={handleSave} className="text-green-600 hover:text-green-700">
                      <Check size={18} />
                    </button>
                    <button onClick={() => setEditField(null)} className="text-red-500 hover:text-red-700">
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-2 flex items-start justify-between">
                  <pre className="text-sm whitespace-pre-wrap break-all flex-1">
                    {formatValue(value)}
                  </pre>
                  <button onClick={() => handleEdit(sectionKey, key)} className="text-blue-500 hover:text-blue-700 ml-2">
                    <Pencil size={18} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  function labelize(str) {
    return str.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  }

  function formatValue(value) {
    if (Array.isArray(value)) return value.length ? value.join(', ') : 'None';
    if (!value) return 'Not filled';
    if (typeof value === 'object') return JSON.stringify(value, null, 2);
    return value;
  }
}
