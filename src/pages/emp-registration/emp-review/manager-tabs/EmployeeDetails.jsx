import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../../service/axiosInstance';

export default function EmployeeDetails({ employeeId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!employeeId) return;

    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(
          `/registration/employee/sections/${employeeId}`
        );
        setData(res.data.data || {});
      } catch (error) {
        console.error('Error fetching employee data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [employeeId]);

  if (loading) return <p className="text-center text-sm text-gray-500">Loading...</p>;
  if (!data) return <p className="text-center text-red-500">No data found.</p>;

  return (
   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm p-6 mb-12">

      {/* Basic Info */}
      {data.basic && (
        <Section title="👤 Basic Information" data={data.basic} />
      )}

      {/* Qualifications */}
      {Array.isArray(data.qualifications) && data.qualifications.length > 0 && (
        <Section title="🎓 Qualifications" data={data.qualifications} isArray />
      )}

      {/* Experiences */}
      {data.experiences && (
        <div className="md:col-span-2">
          <Section title="💼 Experiences" data={data.experiences.list} isArray />
          {data.experiences.languages_Known?.length > 0 && (
            <div className="mt-3">
              <LabelValue label="Languages Known" value={data.experiences.languages_Known.join(', ')} />
            </div>
          )}
          <LabelValue label="Total Experience" value={`${data.experiences.total_Experience} year(s)`} />
        </div>
      )}

      {/* Identity & Bank */}
      {data.identityAndBank && (
        <Section title="🪪 Identity & Bank" data={data.identityAndBank} />
      )}

      {/* Personal & Additional */}
      {data.personalAndAdditional && (
        <Section title="👤 Personal & Additional" data={data.personalAndAdditional} />
      )}

      {/* Uploads */}
      {data.uploads && (
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white dark:bg-gray-900 border rounded p-4 shadow">
            <h3 className="text-md font-bold mb-4">📎 Uploaded Files</h3>

            {/* Avatar */}
            {data.uploads.avatar && (
              <div className="mb-6">
                <p className="font-medium mb-2">Avatar:</p>
                <img
                  src={data.uploads.avatar}
                  alt="Avatar"
                  className="w-32 h-32 rounded-full border object-cover shadow"
                />
              </div>
            )}

            {/* Documents */}
            {Array.isArray(data.uploads.documents) && data.uploads.documents.length > 0 && (
              <div>
                <p className="font-medium mb-2">Documents:</p>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {data.uploads.documents.map((doc) => (
                    <div key={doc._id} className="border p-3 rounded bg-gray-50 dark:bg-gray-800 shadow">
                      <p className="text-sm font-semibold mb-1">{doc.name}</p>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline text-sm"
                      >
                        View
                      </a>
                      <img
                        src={doc.url}
                        alt={doc.name}
                        className="mt-2 max-h-40 object-contain border rounded shadow"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// === Reusable Section ===
function Section({ title, data, isArray = false }) {
  return (
    <div className="bg-white dark:bg-gray-900 border rounded p-4 shadow">
      <h3 className="text-md font-bold mb-4">{title}</h3>
      {isArray ? (
        <div className="space-y-4">
          {data.map((item, i) => (
            <div key={i} className="border p-3 rounded bg-gray-50 dark:bg-gray-800">
              {Object.entries(item).map(([k, v]) => (
                <LabelValue key={k} label={k} value={v} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {Object.entries(data).map(([k, v]) => (
            <LabelValue key={k} label={k} value={v} />
          ))}
        </div>
      )}
    </div>
  );
}

// === Label + Value block ===
function LabelValue({ label, value }) {
  return (
    <div>
      <div className="text-xs font-semibold text-gray-500 uppercase">{labelize(label)}</div>
      <div className="text-sm text-gray-900 dark:text-gray-100">{formatValue(value)}</div>
    </div>
  );
}

// === Utils ===
function labelize(str) {
  return str.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatValue(val) {
  if (!val) return '—';
  if (typeof val === 'string' && val.includes('T')) return new Date(val).toLocaleDateString();
  if (Array.isArray(val)) return val.join(', ');
  return val;
}
