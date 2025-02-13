import { useEffect } from "react";
import { useAnimate } from "framer-motion";
import { useFormContext } from "react-hook-form";
import FormField from "../common/FormField";
import DocumentUploader from "../common/DocumentUploader";
import FormSelect from "../common/FormSelect";
import FormTextArea from "../common/FormTextArea";

const lettersOnlyRegex = /^[A-Za-z\s]+$/;

export default function Step3PersonalDetails({
  onSubmitStep,
  submitting,
  documentFields,
  removeDocument,
  appendDocument,
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
        <h2 className="text-3xl font-bold mb-6 border-b border-gray-300 dark:border-gray-700 pb-4">
       Personal Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="PAN Number"
          name="pan_No"
          placeholder="ABCDE1234F"
          registerOptions={{
            required: "PAN is required",
            pattern: {
              value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
              message: "Format: ABCDE1234F",
            },
          }}
        />
        <FormField
          label="Aadhaar Number"
          name="adhaar_Number"
          placeholder="12-digit Aadhaar"
          registerOptions={{
            required: "Aadhaar is required",
            pattern: {
              value: /^\d{12}$/,
              message: "Aadhaar must be 12 digits",
            },
          }}
        />

        <FormField
          label="PF Details"
          name="pf_Details"
          placeholder="Enter PF details"
        />

        <FormField
          label="ESI Details"
          name="esi_Details"
          placeholder="Enter ESI details (if applicable)"
        />

        <FormField
          label="Passport Number"
          name="passport_Number"
          placeholder="Enter Passport Number"
        />

        <FormField
          label="LinkedIn Profile URL"
          name="linkedin_Profile_URL"
          placeholder="https://linkedin.com/in/yourprofile"
          type="url"
        />
        <FormField
          label="GitHub/Portfolio URL"
          name="github_Portfolio_URL"
          placeholder="https://github.com/yourprofile or portfolio URL"
          type="url"
        />
        <FormSelect
          label="Disability Status"
          name="disability_Status"
          options={[
            { value: "", label: "Select" },
            { value: "Yes", label: "Yes" },
            { value: "No", label: "No" },
            { value: "Prefer not to say", label: "Prefer not to say" },
          ]}
        />
        <FormSelect
          label="Marital Status"
          name="marital_Status"
          options={[
            { value: "", label: "Select Marital Status" },
            { value: "Single", label: "Single" },
            { value: "Married", label: "Married" },
            { value: "Divorced", label: "Divorced" },
          ]}
          registerOptions={{ required: "Marital Status is required" }}
        />

        <FormField
          label="Nationality"
          name="nationality"
          placeholder="Enter Nationality"
          registerOptions={{ required: "Nationality is required" }}
        />
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4">Bank Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          label="Bank Holder Name"
          name="bank_Holder_Name"
          placeholder="Account Holder Name"
          registerOptions={{
            required: "Bank Holder Name is required",
            pattern: {
              value: lettersOnlyRegex,
              message: "Can only contain letters and spaces",
            },
          }}
        />
        <FormField
          label="Bank Name"
          name="bank_Name"
          placeholder="e.g. State Bank"
          registerOptions={{
            required: "Bank Name is required",
            pattern: {
              value: lettersOnlyRegex,
              message: "Can only contain letters and spaces",
            },
          }}
        />
        <FormField
          label="Bank Account No."
          name="bank_Account_No"
          placeholder="1234567890"
          registerOptions={{
            required: "Account No. is required",
            pattern: {
              value: /^[0-9]{9,18}$/,
              message: "Account must be 9 to 18 digits",
            },
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <FormField
          label="Confirm Bank Account No."
          name="confirmBankAccountNo"
          placeholder="Re-enter Account No."
          registerOptions={{
            required: "Please confirm Bank Account No.",
            validate: (val, formValues) =>
              val === formValues.bank_Account_No ||
              "Account numbers do not match",
          }}
        />
        <FormField
          label="IFSC Code"
          name="ifsc_Code"
          placeholder="ABCD0123456"
          registerOptions={{
            required: "IFSC Code is required",
            pattern: {
              value: /^[A-Z0-9]{11}$/,
              message: "Must be 11 chars (letters/numbers)",
            },
          }}
        />
      </div>
      <h2 className="text-xl font-semibold mt-8 mb-4">Emergency Contact</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Emergency Contact Number"
          name="emergency_Contact_Number"
          placeholder="Enter Phone Number"
          registerOptions={{
            required: "Emergency contact number is required",
            pattern: {
              value: /^\d{10}$/,
              message: "Must be exactly 10 digits",
            },
          }}
        />

        <FormField
          label="Emergency Contact Person"
          name="emergency_Contact_Person"
          placeholder="Enter Name"
          registerOptions={{ required: "Emergency Contact Person is required" }}
        />

        <FormSelect
          label="Emergency Contact Blood Group"
          name="emergency_Contact_Blood_Group"
          options={[
            { value: "", label: "Select Blood Group" },
            { value: "A+", label: "A+" },
            { value: "A-", label: "A-" },
            { value: "B+", label: "B+" },
            { value: "B-", label: "B-" },
            { value: "AB+", label: "AB+" },
            { value: "AB-", label: "AB-" },
            { value: "O+", label: "O+" },
            { value: "O-", label: "O-" },
          ]}
          registerOptions={{ required: "Blood Group is required" }}
        />
      </div>

      <label className="block font-medium mt-6 mb-1">
        Upload Documents <span className="text-red-500">*</span>
      </label>

      {documentFields.length === 0 && (
        <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded p-4 text-center text-gray-500">
          <span>No document found</span>
        </div>
      )}

      {documentFields.map((item, index) => (
        <DocumentUploader
          key={item.id}
          index={index}
          removeDocument={removeDocument}
          totalDocs={documentFields.length}
        />
      ))}

      {documentFields.length < 20 && (
        <button
          type="button"
          onClick={() => appendDocument({ name: "", file: null })}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add More Documents
        </button>
      )}

      <div className="flex items-center space-x-3 mt-6">
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {submitting ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
