import  { useEffect } from "react";
import { useAnimate } from "framer-motion";
import { useFormContext, useFieldArray } from "react-hook-form";
import FormField from "../common/FormField";
// import { lettersOnlyRegex } from "../../utils/regex"; // or define inline
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
    <form ref={scope} onSubmit={handleSubmit(onSubmitStep)}>
      <h2 className="text-xl font-semibold mb-4">Qualifications</h2>
      {qualificationFields.map((item, index) => (
        <div
          key={item.id}
          className="border rounded-md p-4 mb-6 dark:border-gray-700"
        >
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
              placeholder="e.g. 80% or 8.0"
              registerOptions={{
                pattern: {
                  value: /^(\d+(\.\d+)?%?)?$/,
                  message:
                    "Enter a valid percentage or decimal (e.g. 80, 80%, 8.0)",
                },
              }}
            />
          </div>
          <div className="flex items-center space-x-3 mt-4">
            {qualificationFields.length > 1 && (
              <button
                type="button"
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => removeQualification(index)}
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

      <h2 className="text-xl font-semibold mb-4">Experience</h2>
      {experienceFields.map((item, index) => (
        <div
          key={item.id}
          className="border rounded-md p-4 mb-6 dark:border-gray-700"
        >
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
                  message: "Can only contain letters and spaces",
                },
              }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              label="Total Years of Experience"
              name={`experiences.${index}.totalExperience`}
              placeholder="e.g. 3"
              type="number"
              registerOptions={{
                min: { value: 0, message: "Cannot be negative" },
              }}
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
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => removeExperience(index)}
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
                      totalExperience: "",
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
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 text-black rounded dark:bg-gray-700 dark:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {submitting ? "Submitting..." : "Next"}
        </button>
      </div>
    </form>
  );
}
