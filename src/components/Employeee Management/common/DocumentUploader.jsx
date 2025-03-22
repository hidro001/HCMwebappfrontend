// import  { useRef, useEffect, useState } from "react";
// import { useFormContext } from "react-hook-form";
// import { FaTrash, FaUpload, FaFilePdf } from "react-icons/fa";

// const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB

// export default function DocumentUploader({ index, removeDocument, totalDocs }) {
//   const { register, setValue, watch, formState } = useFormContext();

//   const docFile = watch(`documents.${index}.file`);
//   const docNameError = formState.errors?.documents?.[index]?.name?.message;
//   const docFileError = formState.errors?.documents?.[index]?.file?.message;

//   const [previewURL, setPreviewURL] = useState(null);
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     if (docFile && docFile.type?.startsWith("image/")) {
//       const objectUrl = URL.createObjectURL(docFile);
//       setPreviewURL(objectUrl);
//       return () => URL.revokeObjectURL(objectUrl);
//     }
//     setPreviewURL(null);
//   }, [docFile]);

//   const handleFileClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > FILE_SIZE_LIMIT) {
//         alert("File must be <= 5MB");
//         return;
//       }
//       const allowed = ["image/png", "image/jpeg", "application/pdf"];
//       if (!allowed.includes(file.type)) {
//         alert("Only JPG/PNG/PDF allowed");
//         return;
//       }
//       setValue(`documents.${index}.file`, file);
//     }
//   };

//   return (
//     <div
//       className="
//         border border-gray-300 dark:border-gray-600
//         rounded p-3 mt-4 mb-4 relative
//       "
//     >
//       <label className="block text-sm font-medium mb-1">
//         Document Name <span className="text-red-500">*</span>
//       </label>
//       <input
//         className={`
//           w-full px-3 py-2 rounded border mb-2
//           focus:outline-none focus:ring-2 bg-bg-secondary
//           ${
//             docNameError
//               ? "border-red-500 focus:ring-red-500"
//               : "border-gray-300 dark:border-gray-600 focus:ring-blue-400"
//           }
//         `}
//         placeholder="Enter Document Name"
//         {...register(`documents.${index}.name`, {
//           required: "Document name is required",
//         })}
//       />
//       {docNameError && <p className="text-red-500 text-sm">{docNameError}</p>}

//       <label className="block text-sm font-medium mb-1">Choose File</label>
//       <input
//         type="file"
//         accept=".png,.jpg,.jpeg,.pdf"
//         ref={fileInputRef}
//         style={{ display: "none" }}
//         onChange={handleFileChange}
//       />

//       <div className="flex items-center space-x-3 mb-2">
//         <button
//           type="button"
//           onClick={handleFileClick}
//           className={`
//             px-3 py-1 bg-gray-200 rounded hover:bg-gray-300
//             dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600
//           `}
//         >
//           <FaUpload className="inline mr-1" />
//           Upload
//         </button>
//         <span className="text-sm text-gray-500 dark:text-gray-400">
//           {docFile ? docFile.name : "No file chosen"}
//         </span>
//       </div>

//       {docFile && (
//         <div className="mt-2">
//           {previewURL && (
//             <img
//               src={previewURL}
//               alt="preview"
//               className="w-24 h-auto border rounded mb-2"
//             />
//           )}
//           {!previewURL && docFile.type === "application/pdf" && (
//             <div className="flex items-center space-x-2 text-sm">
//               <FaFilePdf className="text-red-500" />
//               <span>{docFile.name}</span>
//             </div>
//           )}
//           {!previewURL &&
//             docFile.type !== "application/pdf" &&
//             !docFile.type?.startsWith("image/") && (
//               <p className="text-sm">{docFile.name}</p>
//             )}
//         </div>
//       )}
//       {docFileError && <p className="text-red-500 text-sm">{docFileError}</p>}

//       {docFile && (
//         <button
//           type="button"
//           onClick={() => setValue(`documents.${index}.file`, null)}
//           className="absolute top-3 right-3 text-red-500 hover:text-red-700"
//           title="Remove File"
//         >
//           <FaTrash />
//         </button>
//       )}

//       {totalDocs > 1 && (
//         <button
//           type="button"
//           onClick={() => removeDocument(index)}
//           className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded flex items-center"
//         >
//           <FaTrash className="mr-1" />
//           Remove Document
//         </button>
//       )}
//     </div>
//   );
// }



import { useRef, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaTrash, FaUpload, FaFilePdf, FaEye } from "react-icons/fa";

const FILE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB

export default function DocumentUploader({ index, removeDocument, totalDocs }) {
  const { register, setValue, watch, formState } = useFormContext();

  // docFile can be either a File object or a string URL:
  const docFile = watch(`documents.${index}.file`);

  const docNameError = formState.errors?.documents?.[index]?.name?.message;
  const docFileError = formState.errors?.documents?.[index]?.file?.message;

  const [previewURL, setPreviewURL] = useState(null);
  const fileInputRef = useRef(null);

  // If docFile is a File, we create an object URL for image preview
  useEffect(() => {
    // If docFile is a File and starts with image/, generate a local preview
    if (docFile instanceof File && docFile.type?.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(docFile);
      setPreviewURL(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    // If docFile is a string (an existing URL), setPreviewURL to that if you want to show it inline if it's an image.
    if (typeof docFile === "string") {
      // If it ends with .png/.jpg, you can do some basic check:
      // Or if you only want a "View" button, skip changing previewURL.
      // For demonstration:
      const lowerCaseUrl = docFile.toLowerCase();
      if (
        lowerCaseUrl.endsWith(".jpg") ||
        lowerCaseUrl.endsWith(".jpeg") ||
        lowerCaseUrl.endsWith(".png")
      ) {
        setPreviewURL(docFile);
      } else {
        setPreviewURL(null);
      }
    } else {
      setPreviewURL(null);
    }
  }, [docFile]);

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > FILE_SIZE_LIMIT) {
        alert("File must be <= 5MB");
        return;
      }
      const allowed = ["image/png", "image/jpeg", "application/pdf"];
      if (!allowed.includes(file.type)) {
        alert("Only JPG/PNG/PDF allowed");
        return;
      }
      setValue(`documents.${index}.file`, file);
    }
  };

  // A helper to see if docFile is PDF
  const isPdf = () => {
    if (!docFile) return false;
    if (docFile instanceof File && docFile.type === "application/pdf") {
      return true;
    }
    // If docFile is a string, check if it ends with ".pdf"
    if (typeof docFile === "string") {
      return docFile.toLowerCase().endsWith(".pdf");
    }
    return false;
  };

  const isImagePreview = previewURL !== null;

  return (
    <div className="border border-gray-300 dark:border-gray-600 rounded p-3 mt-4 mb-4 relative">
      {/* Document Name Field */}
      <label className="block text-sm font-medium mb-1">
        Document Name <span className="text-red-500">*</span>
      </label>
      <input
        className={`
          w-full px-3 py-2 rounded border mb-2
          focus:outline-none focus:ring-2 bg-bg-secondary
          ${
            docNameError
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-600 focus:ring-blue-400"
          }
        `}
        placeholder="Enter Document Name"
        {...register(`documents.${index}.name`, {
          required: "Document name is required",
        })}
      />
      {docNameError && <p className="text-red-500 text-sm">{docNameError}</p>}

      {/* File Upload Field (hidden) */}
      <label className="block text-sm font-medium mb-1">Choose File</label>
      <input
        type="file"
        accept=".png,.jpg,.jpeg,.pdf"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* "Upload" button + filename */}
      <div className="flex items-center space-x-3 mb-2">
        <button
          type="button"
          onClick={handleFileClick}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
          <FaUpload className="inline mr-1" />
          Upload
        </button>

        {/* If docFile is a File => show docFile.name, if docFile is string => show docFile substring */}
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {docFile instanceof File
            ? docFile.name
            : typeof docFile === "string"
            ? docFile
            : "No file chosen"}
        </span>
      </div>

      {/* Show error if any */}
      {docFileError && <p className="text-red-500 text-sm">{docFileError}</p>}

      {/* Show Preview if docFile is an Image, or PDF icon, or "View" link */}
      <div className="mt-2 space-y-2">
        {/* 1) IMAGE PREVIEW */}
        {isImagePreview && (
          <img
            src={previewURL}
            alt="Document preview"
            className="w-24 h-auto border rounded"
          />
        )}

        {/* 2) PDF INDICATOR (both for File or for a .pdf URL) */}
        {isPdf() && (
          <div className="flex items-center space-x-2 text-sm">
            <FaFilePdf className="text-red-500" />
            <span>{docFile instanceof File ? docFile.name : "PDF File"}</span>
          </div>
        )}

        {/* 3) VIEW BUTTON/ANCHOR for any docFile that is a URL */}
        {typeof docFile === "string" && (
          <a
            href={docFile}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-2 py-1 text-sm border rounded hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <FaEye className="mr-1" />
            View
          </a>
        )}
      </div>

      {/* Remove the file from the form if it’s a newly uploaded file */}
      {docFile instanceof File && (
        <button
          type="button"
          onClick={() => setValue(`documents.${index}.file`, null)}
          className="absolute top-3 right-3 text-red-500 hover:text-red-700"
          title="Remove File"
        >
          <FaTrash />
        </button>
      )}

      {/* “Remove Document” button only if more than 1 doc */}
      {totalDocs > 1 && (
        <button
          type="button"
          onClick={() => removeDocument(index)}
          className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded flex items-center"
        >
          <FaTrash className="mr-1" />
          Remove Document
        </button>
      )}
    </div>
  );
}
