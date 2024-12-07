import { useState } from "react";
import Swal from "sweetalert2";
import support from "../../services/Service";

const Help = () => {
  const [formData, setFormData] = useState({
    name: "",
    empId: "",
    role: "",
    issue: "",
  });

  const [supportData, setSupportData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to submit this issue?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        submitIssue();
      }
    });
  };

  const submitIssue = async () => {
    const supportData = {
      userName: formData.name,
      empId: formData.empId,
      userRole: formData.role,
      issue: formData.issue,
      issuePostDate: new Date().toISOString().split("T")[0],
    };

    try {
      const response = await support.submitSupportIssue(supportData);
      console.log("Support data fetched successfully:", response);
      setSupportData(response);

      Swal.fire("Submitted!", "Your issue has been submitted.", "success");

      // Clear the form
      setFormData({
        name: "",
        empId: "",
        role: "",
        issue: "",
      });
    } catch (error) {
      console.error("Error fetching support data:", error);
      Swal.fire("Error!", "There was an error submitting your issue.", "error");
    }
  };

  return (
    <div className="main">
      <section className="ems-content">
        <div className="container">
          {/* <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="dashboard.html">Dashboard</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Payroll
            </li>
          </ol> */}
          <div className="all-employee">
            <div className="all-head mb-5">
              <h4>Ask for Help</h4>
            </div>
            <div className="leave-form">
              <form className="p-3" onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="row">
                    <div className="col-lg-4 p-2">
                      <label htmlFor="name">Your Name*</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                        title="name"
                        className="form-control"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-lg-4 p-2">
                      <label htmlFor="empId">Emp ID</label>
                      <input
                        type="text"
                        id="empId"
                        name="empId"
                        placeholder="Enter your Emp ID"
                        title="Emp ID"
                        className="form-control"
                        value={formData.empId}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-lg-4 p-2">
                      <label htmlFor="role">Role*</label>
                      <select
                        name="role"
                        required
                        className="form-control"
                        value={formData.role}
                        onChange={handleChange}
                      >
                        <option value="">--Role--</option>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                        <option value="employee">Employee</option>
                      </select>
                    </div>
                    <div className="col-lg-12 mb-3 p-2">
                      <label htmlFor="issue">Your Issue*</label>
                      <textarea
                        name="issue"
                        className="form-control"
                        id="issue"
                        placeholder="Write Your Issue"
                        rows={4}
                        required
                        value={formData.issue}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <button type="submit" className="send-btn">
                  Send
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#fff"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                  >
                    <path d="m21.426 11.095-17-8A.999.999 0 0 0 3.03 4.242L4.969 12 3.03 19.758a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.481 18.197l.839-3.357L12 12 6.32 9.16l-.839-3.357L18.651 12l-13.17 6.197z"></path>
                  </svg>
                </button>
              </form>
            </div>
            {supportData.length > 0 && (
              <div className="support-data mt-5">
                <h4>Support Data</h4>
                <ul>
                  {supportData.map((item) => (
                    <li key={item._id}>
                      <p>
                        <strong>Name:</strong> {item.userName}
                      </p>
                      <p>
                        <strong>Emp ID:</strong> {item.empId}
                      </p>
                      <p>
                        <strong>Role:</strong> {item.userRole}
                      </p>
                      <p>
                        <strong>Issue:</strong> {item.issue}
                      </p>
                      <p>
                        <strong>Issue Post Date:</strong> {item.issuePostDate}
                      </p>
                      <p>
                        <strong>Created At:</strong> {item.createdAt}
                      </p>
                      <p>
                        <strong>Updated At:</strong> {item.updatedAt}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help;
