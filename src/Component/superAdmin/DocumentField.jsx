// // src/components/superAdmin/DocumentField.jsx

// import React, { useEffect } from "react";
// import { useDropzone } from "react-dropzone";
// import { FaFilePdf, FaFileAlt } from "react-icons/fa";
// import { useFormikContext, getIn } from "formik";

// const DocumentField = ({ index, remove, maxDocuments }) => {
//   const {
//     values,
//     errors,
//     touched,
//     setFieldValue,
//     setFieldError,
//     setFieldTouched,
//   } = useFormikContext();

//   const fieldName = `documents[${index}].file`;
//   const docNameField = `documents[${index}].name`;
//   const previewField = `documents[${index}].preview`;

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop: (acceptedFiles) => {
//       const file = acceptedFiles[0];
//       if (!file) return;

//       // File size validation (5MB limit)
//       if (file.size > 5 * 1024 * 1024) {
//         setFieldError(fieldName, "File size must be less than 5MB");
//         return;
//       }

//       // File type validation
//       if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
//         setFieldError(fieldName, "Only JPG, PNG, or PDF files are allowed.");
//         return;
//       }

//       // Set the file in Formik state
//       setFieldValue(fieldName, file);
//       setFieldTouched(fieldName, true, false);

//       // Generate preview for image files
//       if (file.type.startsWith("image/")) {
//         const reader = new FileReader();
//         reader.onload = () => {
//           setFieldValue(previewField, reader.result);
//         };
//         reader.readAsDataURL(file);
//       } else {
//         // For PDFs and other files, set the file name as preview
//         setFieldValue(previewField, file.name);
//       }
//     },
//     accept: ".pdf, .jpg, .jpeg, .png",
//     multiple: false,
//   });

//   // Retrieve errors and touched state for the current fields
//   const fileError = getIn(errors, fieldName);
//   const fileTouched = getIn(touched, fieldName);
//   const docNameError = getIn(errors, docNameField);
//   const docNameTouched = getIn(touched, docNameField);

//   // Cleanup object URLs to prevent memory leaks
//   useEffect(() => {
//     return () => {
//       if (
//         values.documents[index].preview &&
//         typeof values.documents[index].preview === "string"
//       ) {
//         URL.revokeObjectURL(values.documents[index].preview);
//       }
//     };
//   }, [values.documents, index]);

//   return (
//     <div className="document-field mb-4 p-3 border rounded">
//       {/* Document Name Input */}
//       <div className="mb-3">
//         <label htmlFor={`documents[${index}].name`} className="form-label">
//           Document Name*
//         </label>
//         <input
//           type="text"
//           id={`documents[${index}].name`}
//           name={`documents[${index}].name`}
//           className={`form-control ${
//             docNameTouched && docNameError ? "is-invalid" : ""
//           }`}
//           value={values.documents[index].name}
//           onChange={(e) => setFieldValue(docNameField, e.target.value)}
//           onBlur={() => setFieldTouched(docNameField, true, false)}
//           placeholder="Enter document name"
//         />
//         {docNameTouched && docNameError && (
//           <div className="invalid-feedback">{docNameError}</div>
//         )}
//       </div>

//       {/* File Upload Dropzone */}
//       <div
//         {...getRootProps()}
//         className={`dropzone border p-3 text-center ${
//           fileTouched && fileError ? "is-invalid" : ""
//         }`}
//         style={{
//           backgroundColor: isDragActive ? "#f0f8ff" : "#fafafa",
//           cursor: "pointer",
//         }}
//       >
//         <input {...getInputProps()} />
//         {isDragActive ? (
//           <p>Drop the file here ...</p>
//         ) : (
//           <p>Drag and drop file here, or click to select file</p>
//         )}
//       </div>
//       {fileTouched && fileError && (
//         <div className="hm-razr-add-user-error">{fileError}</div>
//       )}

//       {/* File Preview */}
//       {values.documents[index].preview && (
//         <div className="preview mt-2">
//           {values.documents[index].file.type.startsWith("image/") ? (
//             <img
//               src={values.documents[index].preview}
//               alt={`Document ${index + 1} Preview`}
//               width="200"
//             />
//           ) : values.documents[index].file.type === "application/pdf" ? (
//             <div className="pdf-preview d-flex align-items-center">
//               <FaFilePdf size={50} color="#e74c3c" />
//               <p className="ms-2">{values.documents[index].preview}</p>
//             </div>
//           ) : (
//             <div className="generic-file-preview d-flex align-items-center">
//               <FaFileAlt size={50} color="#95a5a6" />
//               <p className="ms-2">{values.documents[index].preview}</p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Remove Button */}
//       {values.documents.length > 1 && (
//         <button
//           type="button"
//           className="btn btn-danger mt-3"
//           onClick={() => remove(index)}
//         >
//           Remove Document
//         </button>
//       )}
//     </div>
//   );
// };

// export default DocumentField;

// src/components/superAdmin/DocumentField.jsx

// import React, { useEffect } from "react";
// import { useDropzone } from "react-dropzone";
// import { FaFilePdf, FaFileAlt, FaTrash } from "react-icons/fa";
// import { useFormikContext, getIn } from "formik";
// import PropTypes from "prop-types";

// const DocumentField = ({ index, remove, maxDocuments }) => {
//   const {
//     values,
//     errors,
//     touched,
//     setFieldValue,
//     setFieldError,
//     setFieldTouched,
//   } = useFormikContext();

//   const fieldName = `documents[${index}].file`;
//   const docNameField = `documents[${index}].name`;
//   const previewField = `documents[${index}].preview`;

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop: (acceptedFiles) => {
//       const file = acceptedFiles[0];
//       if (!file) return;

//       // File size validation (5MB limit)
//       if (file.size > 5 * 1024 * 1024) {
//         setFieldError(fieldName, "File size must be less than 5MB");
//         return;
//       }

//       // File type validation
//       if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
//         setFieldError(fieldName, "Only JPG, PNG, or PDF files are allowed.");
//         return;
//       }

//       // Set the file in Formik state
//       setFieldValue(fieldName, file);
//       setFieldTouched(fieldName, true, false);

//       // Generate preview for image files
//       if (file.type.startsWith("image/")) {
//         const reader = new FileReader();
//         reader.onload = () => {
//           setFieldValue(previewField, reader.result);
//         };
//         reader.readAsDataURL(file);
//       } else {
//         // For PDFs, no image preview
//         setFieldValue(previewField, null);
//       }
//     },
//     accept: {
//       "image/jpeg": [".jpeg", ".jpg"],
//       "image/png": [".png"],
//       "application/pdf": [".pdf"],
//     },
//     multiple: false,
//   });

//   // Retrieve errors and touched state for the current fields
//   const fileError = getIn(errors, fieldName);
//   const fileTouched = getIn(touched, fieldName);
//   const docNameError = getIn(errors, docNameField);
//   const docNameTouched = getIn(touched, docNameField);

//   // Cleanup object URLs to prevent memory leaks
//   useEffect(() => {
//     return () => {
//       if (
//         values.documents[index].preview &&
//         typeof values.documents[index].preview === "string"
//       ) {
//         URL.revokeObjectURL(values.documents[index].preview);
//       }
//     };
//   }, [values.documents, index]);

//   return (
//     <div className="document-field mb-4 p-3 border rounded">
//       {/* Document Name Input */}
//       <div className="mb-3">
//         <label htmlFor={`documents[${index}].name`} className="form-label">
//           Document Name<span className="text-danger">*</span>
//         </label>
//         <input
//           type="text"
//           id={`documents[${index}].name`}
//           name={`documents[${index}].name`}
//           className={`form-control ${
//             docNameTouched && docNameError ? "is-invalid" : ""
//           }`}
//           value={values.documents[index].name}
//           onChange={(e) => setFieldValue(docNameField, e.target.value.trimStart())}
//           onBlur={() => setFieldTouched(docNameField, true, false)}
//           placeholder="Enter document name"
//         />
//         {docNameTouched && docNameError && (
//           <div className="invalid-feedback">{docNameError}</div>
//         )}
//       </div>

//       {/* File Upload Dropzone */}
//       <div
//         {...getRootProps()}
//         className={`dropzone border p-3 text-center ${
//           fileTouched && fileError ? "is-invalid" : ""
//         }`}
//         style={{
//           backgroundColor: isDragActive ? "#f0f8ff" : "#fafafa",
//           cursor: "pointer",
//           borderColor: fileTouched && fileError ? "#dc3545" : "#ced4da",
//         }}
//       >
//         <input {...getInputProps()} aria-label="File Upload" />
//         {isDragActive ? (
//           <p>Drop the file here...</p>
//         ) : (
//           <p>Drag and drop a file here, or click to select a file</p>
//         )}
//       </div>
//       {fileTouched && fileError && (
//         <div className="text-danger mt-1">{fileError}</div>
//       )}

//       {/* File Preview */}
//       {values.documents[index].file && (
//         <div className="preview mt-2 d-flex align-items-center">
//           {values.documents[index].file.type.startsWith("image/") ? (
//             <img
//               src={values.documents[index].preview}
//               alt={`Document ${index + 1} Preview`}
//               width="100"
//               className="me-3 border rounded"
//             />
//           ) : values.documents[index].file.type === "application/pdf" ? (
//             <FaTrash size={50} color="#e74c3c" className="me-3" />
//           ) : (
//             <FaFileAlt size={50} color="#95a5a6" className="me-3" />
//           )}
//           <span>{values.documents[index].file.name}</span>
//         </div>
//       )}

//       {/* Remove Button */}
//       {values.documents.length > 1 && (
//         <button
//           type="button"
//           className="btn btn-danger mt-3 d-flex align-items-center"
//           onClick={() => remove(index)}
//         >
//           <FaTrash className="me-2" /> Remove Document
//         </button>
//       )}
//     </div>
//   );
// };

// // PropTypes for type checking
// DocumentField.propTypes = {
//   index: PropTypes.number.isRequired,
//   remove: PropTypes.func.isRequired,
//   maxDocuments: PropTypes.number,
// };

// DocumentField.defaultProps = {
//   maxDocuments: 20,
// };

// export default DocumentField;

// src/components/superAdmin/DocumentField.jsx

import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FaFilePdf, FaFileAlt, FaTrash } from "react-icons/fa";
import { useFormikContext, getIn } from "formik";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";

const DocumentField = ({ index, remove, maxDocuments }) => {
  const {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldError,
    setFieldTouched,
  } = useFormikContext();

  const fieldName = `documents[${index}].file`;
  const docNameField = `documents[${index}].name`;
  const previewField = `documents[${index}].preview`;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;

      // File size validation (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        setFieldError(fieldName, "File size must be less than 5MB");
        return;
      }

      // File type validation
      if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
        toast.error("Only JPG, PNG, or PDF files are allowed.");
        setFieldError(fieldName, "Only JPG, PNG, or PDF files are allowed.");
        return;
      }

      // Set the file in Formik state
      setFieldValue(fieldName, file);
      setFieldTouched(fieldName, true, false);

      // Log the file type for debugging
      console.log(`Selected file type for document ${index}:`, file.type);

      // Generate preview for image files
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          setFieldValue(previewField, reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        // For PDFs, no image preview
        setFieldValue(previewField, null);
      }
    },
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  // Retrieve errors and touched state for the current fields
  const fileError = getIn(errors, fieldName);
  const fileTouched = getIn(touched, fieldName);
  const docNameError = getIn(errors, docNameField);
  const docNameTouched = getIn(touched, docNameField);

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (
        values.documents[index].preview &&
        typeof values.documents[index].preview === "string"
      ) {
        URL.revokeObjectURL(values.documents[index].preview);
      }
    };
  }, [values.documents, index]);

  // Additional Debugging: Log the file type during rendering
  useEffect(() => {
    if (values.documents[index].file) {
      console.log(
        `Rendering document ${index} with file type:`,
        values.documents[index].file.type
      );
    }
  }, [values.documents, index]);

  return (
    <div className="document-field mb-4 p-3 border rounded">
      {/* Document Name Input */}
      <div className="mb-3">
        <label htmlFor={`documents[${index}].name`} className="form-label">
          Document Name<span className="text-danger">*</span>
        </label>
        <input
          type="text"
          id={`documents[${index}].name`}
          name={`documents[${index}].name`}
          className={`form-control ${
            docNameTouched && docNameError ? "is-invalid" : ""
          }`}
          value={values.documents[index].name}
          onChange={(e) =>
            setFieldValue(docNameField, e.target.value.trimStart())
          }
          onBlur={() => setFieldTouched(docNameField, true, false)}
          placeholder="Enter document name"
        />
        {docNameTouched && docNameError && (
          <div className="invalid-feedback">{docNameError}</div>
        )}
      </div>

      {/* File Upload Dropzone */}
      <div
        {...getRootProps()}
        className={`dropzone border p-3 text-center ${
          fileTouched && fileError ? "is-invalid" : ""
        }`}
        style={{
          backgroundColor: isDragActive ? "#f0f8ff" : "#fafafa",
          cursor: "pointer",
          borderColor: fileTouched && fileError ? "#dc3545" : "#ced4da",
        }}
      >
        <input {...getInputProps()} aria-label="File Upload" />
        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <p>Drag and drop a file here, or click to select a file Only JPG, PNG, or PDF files are allowed.</p>
        )}
      </div>
      {fileTouched && fileError && (
        <div className="text-danger mt-1">{fileError}</div>
      )}

      {/* File Preview */}
      {values.documents[index].file && (
        <div className="preview mt-2 d-flex align-items-center">
          {(() => {
            // Inline function to handle conditional rendering with logging
            const fileType = values.documents[index].file.type;
            console.log(`Current file type for document ${index}:`, fileType);

            if (fileType.startsWith("image/")) {
              return (
                <img
                  src={values.documents[index].preview}
                  alt={`Document ${index + 1} Preview`}
                  width="100"
                  className="me-3 border rounded"
                />
              );
            } else if (fileType.includes("pdf")) {
              return <FaFilePdf size={50} color="#e74c3c" className="me-3" />;
            } else {
              return <FaFileAlt size={50} color="#95a5a6" className="me-3" />;
            }
          })()}
          <span>{values.documents[index].file.name}</span>
        </div>
      )}

      {/* Remove Button */}
      {values.documents.length > 1 && (
        <button
          type="button"
          className="btn btn-danger mt-3 d-flex align-items-center"
          onClick={() => remove(index)}
        >
          <FaTrash className="me-2" /> Remove Document
        </button>
      )}
      {/* <ToastContainer /> */}
    </div>
  );
};

// PropTypes for type checking
DocumentField.propTypes = {
  index: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
  maxDocuments: PropTypes.number,
};

DocumentField.defaultProps = {
  maxDocuments: 20,
};

export default DocumentField;
