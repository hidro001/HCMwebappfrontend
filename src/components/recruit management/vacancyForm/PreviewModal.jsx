import React from "react";

export default function PreviewModal({ data, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-xl space-y-4">
        <h2 className="text-2xl font-bold">Preview Vacancy</h2>
        <div>
          <h3 className="font-semibold">Basic Info</h3>
          <p><strong>Job Title:</strong> {data.jobTitle}</p>
          <p><strong>Department:</strong> {data.jobDepartment}</p>
        </div>
        <div>
          <h3 className="font-semibold">Employment Details</h3>
          <p><strong>Salary:</strong> {data.currency} {data.salary} / {data.payPeriod}</p>
          <p><strong>Type:</strong> {(data.employmentType||[]).join(", ")}</p>
        </div>
        <div>
          <h3 className="font-semibold">Responsibilities</h3>
          <ul>{(data.responsibilities||[]).map((r,i)=><li key={i}>• {r.text}</li>)}</ul>
        </div>
        <div>
          <h3 className="font-semibold">Contact</h3>
          <p>{data.contactPerson} – {data.contactPhone}</p>
        </div>
        <button onClick={onClose} className="mt-4 bg-blue-600 text-white px-4 py-2">Close Preview</button>
      </div>
    </div>
  );
}
