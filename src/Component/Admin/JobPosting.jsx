import { useState, useEffect } from "react";
import axios from "axios";

const JobPosting = () => {
  const accessToken = localStorage.getItem("accessToken");
  const employeeId = localStorage.getItem("employeeId");

  const [formData, setFormData] = useState({
    designation: "",
    budget: "",
    jobDescriptionFile: null,
    jobDescriptionText: "", // New state for job description text
    department: "",
  });

  const [jobs, setJobs] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);

  // Fetch departments allocated to the logged-in employee
  const fetchDepartments = async () => {
    try {
      const response = await axios.get(
        `https://apiv2.humanmaximizer.com/api/v1/superadmin/departmentAlocated/${employeeId}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      console.log("API Response for departments:", response.data);

      const validDepartments = response.data.departmentAlocated.filter(
        (dept) => !dept.includes("[") && !dept.includes("]")
      );
      setDepartments(validDepartments);
    } catch (error) {
      setError("Failed to fetch departments.");
      console.error("Error fetching departments:", error);
    }
  };

  // Fetch all job postings on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "https://apiv2.humanmaximizer.com/api/v1/admin/jobs",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const { data } = response.data;
        setJobs(data);
      } catch (error) {
        console.error("Error fetching job postings:", error);
      }
    };

    fetchDepartments();
    fetchJobs();
  }, [accessToken, employeeId]);

  // Handle input change for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input change for job description
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      jobDescriptionFile: file,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Ensure either jobDescriptionText or jobDescriptionFile is provided
    if (!formData.jobDescriptionText && !formData.jobDescriptionFile) {
      setError(
        "Please provide a job description either as text or by uploading a file."
      );
      return;
    }

    const jobPostingData = new FormData();
    jobPostingData.append("department", formData.department);
    jobPostingData.append("designation", formData.designation);

    if (formData.jobDescriptionFile) {
      jobPostingData.append("img", formData.jobDescriptionFile);
    }

    if (formData.jobDescriptionText) {
      jobPostingData.append("jobDescription", formData.jobDescriptionText);
    }

    try {
      const response = await axios.post(
        "https://apiv2.humanmaximizer.com/api/v1/admin/jobs",
        jobPostingData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setJobs([...jobs, response.data.data]);

      // Reset form after submission
      setFormData({
        designation: "",
        department: "",
        jobDescriptionFile: null,
        jobDescriptionText: "",
      });
      setError(null);
    } catch (error) {
      console.error("Error creating job posting:", error);
      setError("Failed to create job posting.");
    }
  };

  // Handle job deletion with confirmation
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job posting?"
    );
    if (confirmed) {
      try {
        await axios.delete(`https://apiv2.humanmaximizer.com/api/v1/admin/jobs/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setJobs(jobs.filter((job) => job._id !== id));
      } catch (error) {
        console.error("Error deleting job posting:", error);
      }
    }
  };

  return (
    <div className="main">
      <div className="ems-content p-5">
        <div className="rzr-hcm-jobposting-container">
          <h2 className="rzr-hcm-jobposting-title">Post a Job Vacancy</h2>
          <form className="" onSubmit={handleSubmit}>
            <div className="rzr-hcm-jobposting-form-group">
              <label htmlFor="department">Department:</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="rzr-hcm-jobposting-input"
              >
                <option value="">Select Department</option>
                {departments.map((dept, index) => (
                  <option key={index} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div className="rzr-hcm-jobposting-form-group">
              <label htmlFor="designation">Designation:</label>
              <input
                type="text"
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                required
                className="rzr-hcm-jobposting-input"
              />
            </div>

            <div className="rzr-hcm-jobposting-form-group">
              <label htmlFor="jobDescriptionText">Job Description:</label>
              <textarea
                id="jobDescriptionText"
                name="jobDescriptionText"
                value={formData.jobDescriptionText}
                onChange={handleChange}
                className="rzr-hcm-jobposting-input"
              />
            </div>

            <div className="rzr-hcm-jobposting-form-group">
              <label htmlFor="jobDescriptionFile">Job Description (PDF):</label>
              <input
                type="file"
                id="jobDescriptionFile"
                name="jobDescriptionFile"
                accept="application/pdf"
                onChange={handleFileChange}
                className="rzr-hcm-jobposting-input"
              />
            </div>

            {error && <p className="error">{error}</p>}

            <div className="rzr-hcm-jobposting-button-container">
              <button type="submit" className="rzr-hcm-jobposting-button">
                Submit
              </button>
            </div>
          </form>

          <h2 className="rzr-hcm-jobposting-title">Latest Job Postings</h2>
          {jobs.length > 0 ? (
            <table className="rzr-hcm-jobposting-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Job Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id}>
                    <td>{job.department}</td>
                    <td>{job.designation}</td>
                    <td>
                      {job.jobDescription ? (
                        <div>{job.jobDescription}</div>
                      ) : job.img ? (
                        <a
                          href={job.img}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View PDF
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="rzr-hcm-jobposting-delete-button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="rzr-hcm-jobposting-no-jobs">
              No job postings available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobPosting;
