// import { useEffect } from "react";
// import { useAnimate } from "framer-motion";
// import { useFormContext, useFieldArray } from "react-hook-form";
// import FormField from "../common/FormField";
// import FormMultiSelect from "../common/FormMultiSelect";
// // import { lettersOnlyRegex } from "../../utils/regex"; // or define inline
// const lettersOnlyRegex = /^[A-Za-z\s]+$/;
// export default function Step2QualificationsExperience({
//   onSubmitStep,
//   submitting,
//   qualificationFields,
//   removeQualification,
//   appendQualification,
//   experienceFields,
//   removeExperience,
//   appendExperience,
// }) {
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
//         Qualifications & Experience
//       </h2>

//       <h2 className="text-xl font-semibold mb-4">Qualifications</h2>
//       {qualificationFields.map((item, index) => (
//         <div
//           key={item.id}
//           className="border rounded-md p-4 mb-6 dark:border-gray-700"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
//             <FormField
//               label="Qualification Name"
//               name={`qualifications.${index}.qualificationName`}
//               placeholder="Enter Qualification Name"
//             />
//             <FormField
//               label="University/Board"
//               name={`qualifications.${index}.universityBoard`}
//               placeholder="Enter University/Board"
//             />
//             <FormField
//               label="Certifications & Licenses"
//               name={`certifications.${index}.certifications`}
//               placeholder="e.g., PMP, CCNA, Six Sigma"
//             />
//             <FormField
//               label="Specialization"
//               name={`specialization.${index}.specialization`}
//               placeholder="e.g., Computer Science, Accounting"
//             />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <FormField
//               label="Total Marks"
//               name={`qualifications.${index}.totalMarks`}
//               placeholder="Total Marks"
//               type="number"
//               registerOptions={{
//                 min: { value: 0, message: "Cannot be negative" },
//               }}
//             />
//             <FormField
//               label="Passing Year"
//               name={`qualifications.${index}.passingYear`}
//               placeholder="YYYY"
//               type="number"
//               registerOptions={{
//                 min: { value: 0, message: "Cannot be negative" },
//               }}
//             />
//             <FormField
//               label="Percentage/CGPA"
//               name={`qualifications.${index}.percentageCgpa`}
//               placeholder="e.g. 80% or 8.0"
//               registerOptions={{
//                 pattern: {
//                   value: /^(\d+(\.\d+)?%?)?$/,
//                   message:
//                     "Enter a valid percentage or decimal (e.g. 80, 80%, 8.0)",
//                 },
//               }}
//             />
//           </div>
//           <div className="flex items-center space-x-3 mt-4">
//             {qualificationFields.length > 1 && (
//               <button
//                 type="button"
//                 className="px-4 py-2 bg-red-500 text-white rounded"
//                 onClick={() => removeQualification(index)}
//               >
//                 Remove
//               </button>
//             )}
//             {index === qualificationFields.length - 1 &&
//               qualificationFields.length < 20 && (
//                 <button
//                   type="button"
//                   onClick={() =>
//                     appendQualification({
//                       qualificationName: "",
//                       universityBoard: "",
//                       totalMarks: "",
//                       passingYear: "",
//                       percentageCgpa: "",
//                     })
//                   }
//                   className="px-4 py-2 bg-blue-600 text-white rounded"
//                 >
//                   Add More
//                 </button>
//               )}
//           </div>
//         </div>
//       ))}

//       <div className=" border rounded-md p-4 mb-6 dark:border-gray-700">
//         <h2 className="text-xl font-semibold mb-4">Additional info</h2>
//         <FormMultiSelect
//           label="Languages Known"
//           name="languages_Known"
//           options={[
//             { value: "English", label: "English" },
//             { value: "Spanish", label: "Spanish" },
//             { value: "French", label: "French" },
//             { value: "German", label: "German" },
//             { value: "Chinese", label: "Chinese" },
//             { value: "Hindi", label: "Hindi" },
//             { value: "Arabic", label: "Arabic" },
//             { value: "Portuguese", label: "Portuguese" },
//             { value: "Bengali", label: "Bengali" },
//             { value: "Russian", label: "Russian" },
//             { value: "Japanese", label: "Japanese" },
//             { value: "Punjabi", label: "Punjabi" },
//             { value: "Italian", label: "Italian" },
//             { value: "Korean", label: "Korean" },
//             { value: "Turkish", label: "Turkish" },
//             { value: "Dutch", label: "Dutch" },
//             { value: "Swedish", label: "Swedish" },
//             { value: "Greek", label: "Greek" },
//             { value: "Hebrew", label: "Hebrew" },
//             { value: "Thai", label: "Thai" },
//             { value: "Polish", label: "Polish" },
//             { value: "Vietnamese", label: "Vietnamese" },
//             { value: "Persian", label: "Persian" },
//             { value: "Romanian", label: "Romanian" },
//             { value: "Czech", label: "Czech" },
//             { value: "Hungarian", label: "Hungarian" },
//             { value: "Finnish", label: "Finnish" },
//             { value: "Danish", label: "Danish" },
//             { value: "Norwegian", label: "Norwegian" },
//             { value: "Malay", label: "Malay" },
//             { value: "Indonesian", label: "Indonesian" },
//             { value: "Ukrainian", label: "Ukrainian" },
//             { value: "Tagalog", label: "Tagalog" },
//             { value: "Tamil", label: "Tamil" },
//             { value: "Telugu", label: "Telugu" },
//             { value: "Marathi", label: "Marathi" },
//             { value: "Urdu", label: "Urdu" },
//             { value: "Gujarati", label: "Gujarati" },
//             { value: "Burmese", label: "Burmese" },
//             { value: "Swahili", label: "Swahili" },
//             { value: "Afrikaans", label: "Afrikaans" },
//           ]}
//           requiredMessage="Please select at least one language"
//         />
//       </div>

//       <h2 className="text-xl font-semibold mb-4">Experience</h2>
//       {experienceFields.map((item, index) => (
//         <div
//           key={item.id}
//           className="border rounded-md p-4 mb-6 dark:border-gray-700"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
//             <FormField
//               label="Company Name"
//               name={`experiences.${index}.companyName`}
//               placeholder="Enter Company Name"
//             />
//             <FormField
//               label="Designation"
//               name={`experiences.${index}.designation`}
//               placeholder="Enter Designation"
//               registerOptions={{
//                 pattern: {
//                   value: lettersOnlyRegex,
//                   message: "Can only contain letters and spaces",
//                 },
//               }}
//             />
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <FormField
//               label="Total Years of Experience"
//               name={`experiences.${index}.totalExperience`}
//               placeholder="e.g. 3"
//               type="number"
//               registerOptions={{
//                 min: { value: 0, message: "Cannot be negative" },
//               }}
//             />
//             <FormField
//               label="Grade / Band / Level"
//               name={`grade_Band_Level.${index}.grade_Band_Level`}
//               placeholder="Enter Grade/Band/Level"
//             />
//             <FormField
//               label=" Positions in the Company"
//               name={`previous_Positions.${index}.previous_Positions`}
//               placeholder="Enter details (promotions, transfers, etc.)"
//             />

//             <FormField
//               label="Start Date"
//               name={`experiences.${index}.startDate`}
//               type="date"
//             />
//             <FormField
//               label="End Date"
//               name={`experiences.${index}.endDate`}
//               type="date"
//             />
//           </div>
//           <div className="flex items-center space-x-3 mt-4">
//             {experienceFields.length > 1 && (
//               <button
//                 type="button"
//                 className="px-4 py-2 bg-red-500 text-white rounded"
//                 onClick={() => removeExperience(index)}
//               >
//                 Remove
//               </button>
//             )}
//             {index === experienceFields.length - 1 &&
//               experienceFields.length < 20 && (
//                 <button
//                   type="button"
//                   onClick={() =>
//                     appendExperience({
//                       companyName: "",
//                       designation: "",
//                       totalExperience: "",
//                       startDate: "",
//                       endDate: "",
//                     })
//                   }
//                   className="px-4 py-2 bg-blue-600 text-white rounded"
//                 >
//                   Add More
//                 </button>
//               )}
//           </div>
//         </div>
//       ))}

//       <div className="flex items-center space-x-3 mt-6">
//         <button
//           type="button"
//           className="px-4 py-2 bg-gray-300 text-black rounded dark:bg-gray-700 dark:text-white"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           disabled={submitting}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           {submitting ? "Submitting..." : "Next"}
//         </button>
//       </div>
//     </form>
//   );
// }

import React, { useEffect } from "react";
import { useAnimate } from "framer-motion";
import { useFormContext } from "react-hook-form";
import FormField from "../common/FormField";
import FormMultiSelect from "../common/FormMultiSelect";

const lettersOnlyRegex = /^[A-Za-z\s]+$/;

export default function Step2QualificationsExperience({
  onSubmitStep,
  submitting,
  qualificationFields,
  removeQualification,
  appendQualification,
  experienceFields,
  removeExperience,
  appendExperience,
}) {
  const [scope, animate] = useAnimate();
  const { handleSubmit } = useFormContext();

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
      <h2 className="text-3xl font-bold mb-6 border-b pb-4">
        Qualifications & Experience
      </h2>
      <h2 className="text-xl font-semibold mb-4">Qualifications</h2>
      {qualificationFields.map((item, index) => (
        <div key={item.id} className="border rounded-md p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <FormField
              label="Qualification Name"
              name={`qualifications.${index}.qualificationName`}
              placeholder="Enter Qualification Name"
            />
            <FormField
              label="University/Board"
              name={`qualifications.${index}.universityBoard`}
              placeholder="Enter University/Board"
            />
            <FormField
              label="Certifications & Licenses"
              name={`qualifications.${index}.certifications`}
              placeholder="e.g., PMP, CCNA"
            />
            <FormField
              label="Specialization"
              name={`qualifications.${index}.specialization`}
              placeholder="e.g., Computer Science"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              label="Total Marks"
              name={`qualifications.${index}.totalMarks`}
              placeholder="Total Marks"
              type="number"
              registerOptions={{
                min: { value: 0, message: "Cannot be negative" },
              }}
            />
            <FormField
              label="Passing Year"
              name={`qualifications.${index}.passingYear`}
              placeholder="YYYY"
              type="number"
              registerOptions={{
                min: { value: 0, message: "Cannot be negative" },
              }}
            />
            <FormField
              label="Percentage/CGPA"
              name={`qualifications.${index}.percentageCgpa`}
              placeholder="e.g., 80 or 8.0"
              registerOptions={{
                pattern: {
                  value: /^(\d+(\.\d+)?%?)?$/,
                  message: "Enter a valid value",
                },
              }}
            />
          </div>
          <div className="flex items-center space-x-3 mt-4">
            {qualificationFields.length > 1 && (
              <button
                type="button"
                onClick={() => removeQualification(index)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            )}
            {index === qualificationFields.length - 1 &&
              qualificationFields.length < 20 && (
                <button
                  type="button"
                  onClick={() =>
                    appendQualification({
                      qualificationName: "",
                      universityBoard: "",
                      certifications: "",
                      specialization: "",

                      totalMarks: "",
                      passingYear: "",
                      percentageCgpa: "",
                    })
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Add More
                </button>
              )}
          </div>
        </div>
      ))}
      <div className="border rounded-md p-4 mb-6">
        <h2 className="text-xl font-semibold mb-4">Additional info</h2>
        <div className="flex justify-between w-full">
          <div className="w-1/2 pr-4">
            {/* <FormMultiSelect
              label="Languages Known"
              name="languages_Known"
              options={[
                { value: "English", label: "English" },
                { value: "Spanish", label: "Spanish" },
                // … add more languages as needed
              ]}
              requiredMessage="Please select at least one language"
            /> */}

            <FormMultiSelect
              label="Languages Known"
              name="languages_Known"
              options={[
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
              ]}
              requiredMessage="Please select at least one language"
            />
          </div>

          <FormField
            label="Total Years of Experience"
            name={"total_Experience"}
            placeholder="e.g., 3"
            type="number"
            registerOptions={{
              min: { value: 0, message: "Cannot be negative" },
            }}
          />
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-4">Experience</h2>
      {experienceFields.map((item, index) => (
        <div key={item.id} className="border rounded-md p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <FormField
              label="Company Name"
              name={`experiences.${index}.companyName`}
              placeholder="Enter Company Name"
            />
            <FormField
              label="Designation"
              name={`experiences.${index}.designation`}
              placeholder="Enter Designation"
              registerOptions={{
                pattern: {
                  value: lettersOnlyRegex,
                  message: "Only letters and spaces allowed",
                },
              }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              label="Grade / Band / Level"
              name={`experiences.${index}.grade_Band_Level`}
              placeholder="Enter Grade/Band/Level"
            />
            <FormField
              label="Positions in the Company"
              name={`experiences.${index}.previous_Positions`}
              placeholder="Enter details"
            />
            <FormField
              label="Start Date"
              name={`experiences.${index}.startDate`}
              type="date"
            />
            <FormField
              label="End Date"
              name={`experiences.${index}.endDate`}
              type="date"
            />
          </div>
          <div className="flex items-center space-x-3 mt-4">
            {experienceFields.length > 1 && (
              <button
                type="button"
                onClick={() => removeExperience(index)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            )}
            {index === experienceFields.length - 1 &&
              experienceFields.length < 20 && (
                <button
                  type="button"
                  onClick={() =>
                    appendExperience({
                      companyName: "",
                      designation: "",
                      grade_Band_Level: "",
                      previous_Positions: "",
                      startDate: "",
                      endDate: "",
                    })
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Add More
                </button>
              )}
          </div>
        </div>
      ))}
      <div className="flex items-center space-x-3 mt-6">
        <button type="button" className="px-4 py-2 bg-gray-300 rounded">
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {submitting ? "Submitting..." : "Next"}
        </button>
      </div>
    </form>
  );
}
