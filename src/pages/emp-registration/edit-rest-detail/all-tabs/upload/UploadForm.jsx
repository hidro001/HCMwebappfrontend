import React from 'react';
import AvatarUploadForm from './AvatarUploadForm';
import DocumentUploadForm from './DocumentUploadForm';

export default function UploadForm() {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 w-full">
      {/* Avatar Upload */}
      <div className="w-full md:w-[50vw] bg-[#0e1322] p-4 rounded-xl border border-gray-700">
        <AvatarUploadForm />
      </div>

      {/* Document Upload */}
      <div className="w-full md:w-[50vw] bg-[#0e1322] p-4 rounded-xl border border-gray-700">
        <DocumentUploadForm />
      </div>
    </div>
  );
}
