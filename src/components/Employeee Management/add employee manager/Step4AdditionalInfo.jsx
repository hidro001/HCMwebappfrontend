// import { useEffect } from "react";
// import { useAnimate } from "framer-motion";
// import { useFormContext } from "react-hook-form";
// import FormField from "../common/FormField";
// import FormSelect from "../common/FormSelect";
// import FormTextArea from "../common/FormTextArea";
// import FormMultiSelect from "../common/FormMultiSelect";

// export default function Step4AdditionalInfo({ onSubmitStep, submitting }) {
//   const [scope, animate] = useAnimate();
//   const { handleSubmit } = useFormContext();

//   useEffect(() => {
//     animate([
//       [".animatable-input", { opacity: 0, x: 20 }, { duration: 0 }],
//       [
//         ".animatable-input",
//         { opacity: 1, x: 0 },
//         { duration: 0.3, stagger: 0.05 },
//       ],
//     ]);
//   }, [animate]);

//   return (
//     <form
//       ref={scope}
//       onSubmit={handleSubmit(onSubmitStep)}
//       className=" mx-auto p-8 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 rounded-xl shadow-lg transition-colors duration-300"
//     >
//       <h2 className="text-3xl font-bold mb-6 border-b border-gray-300 dark:border-gray-700 pb-4">
//         Additional Info
//       </h2>

//       {/* Section 1: Personal & Employment Details */}
//       <section className="mb-8">
//         <h3 className="text-2xl font-semibold mb-4">
//           Personal & Employment Details
//         </h3>
//         <div className="space-y-6">
//           <FormTextArea
//             label="Gratuity Eligibility & Details"
//             name="gratuity_Details"
//             placeholder="Enter gratuity details"
//             className="animatable-input"
//           />
//           <FormTextArea
//             label="Medical Insurance / Health Benefits"
//             name="medical_Insurance"
//             placeholder="Enter details on medical/health benefits"
//             className="animatable-input"
//           />
//           <FormTextArea
//             label="Other Company-Specific Benefits"
//             name="other_Benefits"
//             placeholder="Enter other benefits (e.g., stock options, meal cards)"
//             className="animatable-input"
//           />
//           <FormSelect
//             label="Background Verification Status"
//             name="background_Verification_Status"
//             options={[
//               { value: "", label: "Select Status" },
//               { value: "Cleared", label: "Cleared" },
//               { value: "Pending", label: "Pending" },
//             ]}
//             registerOptions={{
//               required: "Background verification status is required",
//             }}
//             className="animatable-input"
//           />
//         </div>
//       </section>

//       {/* Section 2: Verification & Certifications */}
//       <section className="mb-8">
//         <h3 className="text-2xl font-semibold mb-4">
//           Verification & Certifications
//         </h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <FormSelect
//             label="Police Verification"
//             name="police_Verification"
//             options={[
//               { value: "", label: "Select Status" },
//               { value: "Cleared", label: "Cleared" },
//               { value: "Pending", label: "Pending" },
//             ]}
//             className="animatable-input"
//           />
//           <FormSelect
//             label="Work Mode"
//             name="work_Mode"
//             options={[
//               { value: "", label: "Select Work Mode" },
//               { value: "work-from-office", label: "Work From Office" },
//               { value: "work-from-home", label: "Work From Home" },
//               { value: "hybrid", label: "Hybrid" },
//             ]}
//             className="animatable-input"
//           />
//         </div>
//         <div className="space-y-6">
//           <FormTextArea
//             label="Legal or Regulatory Certifications"
//             name="legal_Certifications"
//             placeholder="Enter certifications if applicable"
//             className="animatable-input"
//           />
//           <FormField
//             label="Organization-Specific ID(s)"
//             name="org_Specific_IDs"
//             placeholder="Enter IDs (e.g., access card number)"
//             className="animatable-input"
//           />
//         </div>
//       </section>

//       {/* Section 3: Exit Details */}
//       <section className="mb-8">
//         <h3 className="text-2xl font-semibold mb-4">Exit Details</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <FormField
//             label="Date of Resignation / Separation"
//             name="date_of_Resignation"
//             type="date"
//             className="animatable-input"
//           />
//           <FormTextArea
//             label="Reason for Leaving"
//             name="reason_for_Leaving"
//             placeholder="Enter reason for leaving"
//             className="animatable-input"
//           />
//         </div>
//         <div className="space-y-6">
//           <FormField
//             label="Notice Period Served"
//             name="notice_Period_Served"
//             placeholder="Enter notice period"
//             className="animatable-input"
//           />
//           <FormTextArea
//             label="Exit Interview Feedback"
//             name="exit_Interview_Feedback"
//             placeholder="Enter exit interview feedback"
//             className="animatable-input"
//           />
//           <FormTextArea
//             label="Full & Final Settlement Details"
//             name="full_Final_Settlement"
//             placeholder="Enter settlement details"
//             className="animatable-input"
//           />
//           <FormField
//             label="Relieving / Experience Certificate Issued Date"
//             name="relieving_Certificate_Date"
//             type="date"
//             className="animatable-input"
//           />
//         </div>
//       </section>

//       {/* Action Buttons */}
//       <div className="flex justify-end space-x-4">
//         <button
//           type="button"
//           className="px-6 py-3 bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           disabled={submitting}
//           className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
//         >
//           {submitting ? "Saving..." : "Save"}
//         </button>
//       </div>
//     </form>
//   );
// }

import React, { useEffect } from "react";
import { useAnimate } from "framer-motion";
import { useFormContext, useWatch } from "react-hook-form";
import FormField from "../common/FormField";
import FormSelect from "../common/FormSelect";
import FormTextArea from "../common/FormTextArea";

export default function Step4AdditionalInfo({ onSubmitStep, submitting }) {
  const [scope, animate] = useAnimate();
  const { handleSubmit } = useFormContext();

  const healthBenefits = useWatch({ name: "health_benefits" });

  useEffect(() => {
    animate([
      [".animatable-input", { opacity: 0, x: 20 }, { duration: 0 }],
      [
        ".animatable-input",
        { opacity: 1, x: 0 },
        { duration: 0.3, stagger: 0.05 },
      ],
    ]);
  }, [animate]);

  return (
    <form
      ref={scope}
      onSubmit={handleSubmit(onSubmitStep)}
      className=" mx-auto p-8 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 rounded-xl shadow-lg transition-colors duration-300"
    >
      <h2 className="text-3xl font-bold mb-6 border-b pb-4">Additional Info</h2>
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">
          Personal & Employment Details
        </h3>
        <div className="space-y-6">
          <FormTextArea
            label="Gratuity Eligibility & Details"
            name="gratuity_Details"
            placeholder="Enter gratuity details"
            className="animatable-input"
          />
          <FormSelect
            label="Medical Insurance / Health Benefits"
            name="health_benefits" // Ensure the name matches your defaultValues
            options={[
            
              { value: "", label: "Please Select " },
              { value: "true", label: "Yes" },
              { value: "false", label: "No" },
            ]}
            registerOptions={{
              required: "Please select at least one",
            }}
          />
          {healthBenefits === "true" && (
            <div>
              <FormTextArea
                label="Medical Insurance / Health Benefits"
                name="medical_Insurance"
                placeholder="Enter medical/health benefits"
                className="animatable-input"
              />
            </div>
          )}

          <FormTextArea
            label="Other Company-Specific Benefits"
            name="other_Benefits"
            placeholder="Enter other benefits"
            className="animatable-input"
          />
          <FormSelect
            label="Background Verification Status"
            name="background_Verification_Status"
            options={[
              { value: "", label: "Select Status" },
              { value: "Cleared", label: "Cleared" },
              { value: "Pending", label: "Pending" },
            ]}
            registerOptions={{
              required: "Background verification status is required",
            }}
            className="animatable-input"
          />
        </div>
      </section>
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">
          Verification & Certifications
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FormSelect
            label="Police Verification"
            name="police_Verification"
            options={[
              { value: "", label: "Select Status" },
              { value: "Cleared", label: "Cleared" },
              { value: "Pending", label: "Pending" },
            ]}
            className="animatable-input"
          />
          <FormSelect
            label="Training Status"
            name="trainingStatus"
            options={[
              { value: "", label: "Select Status" },
              { value: "upToDate", label: "upToDate" },
              { value: "needsRefresh", label: "needsRefresh" },
              { value: "needsCertification", label: "needsCertification" },
            ]}
            className="animatable-input"
          />
          <FormSelect
            label="compliance Training Status"
            name="complianceTrainingStatus"
            options={[
              { value: "", label: "Select Status" },
              { value: "completed", label: "completed" },
              { value: "pending", label: "pending" },
              { value: "needsCertification", label: "needsCertification" },
            ]}
            className="animatable-input"
          />
      
        </div>
        <div className="space-y-6">
          <FormTextArea
            label="Legal or Regulatory Certifications"
            name="legal_Certifications"
            placeholder="Enter certifications"
            className="animatable-input"
          />
          <FormField
            label="Organization-Specific ID(s)"
            name="org_Specific_IDs"
            placeholder="Enter IDs"
            className="animatable-input"
          />
        </div>
      </section>
      <section className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Exit Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <FormField
            label="Date of Resignation / Separation"
            name="date_of_Resignation"
            type="date"
            className="animatable-input"
          />
          <FormTextArea
            label="Reason for Leaving"
            name="reason_for_Leaving"
            placeholder="Enter reason for leaving"
            className="animatable-input"
          />
        </div>
        <div className="space-y-6">
          <FormField
            label="Notice Period Served"
            name="notice_Period_Served"
            placeholder="Enter notice period"
            className="animatable-input"
          />
          <FormTextArea
            label="Exit Interview Feedback"
            name="exit_Interview_Feedback"
            placeholder="Enter feedback"
            className="animatable-input"
          />
          <FormTextArea
            label="Full & Final Settlement Details"
            name="full_Final_Settlement"
            placeholder="Enter settlement details"
            className="animatable-input"
          />
          <FormField
            label="Relieving / Experience Certificate Issued Date"
            name="relieving_Certificate_Date"
            type="date"
            className="animatable-input"
          />
        </div>
      </section>
      <div className="flex justify-end space-x-4">
        <button type="button" className="px-6 py-3 bg-gray-200 rounded">
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {submitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
