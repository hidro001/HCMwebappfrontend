import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import service from "../../services/Service";

const FetchLeave = () => {
  const [leaves, setLeaves] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [message, setMessage] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const leavesPerPage = 10;

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const data = await service.fetchEmployeeLeave();
        setLeaves(data);
      } catch (error) {
        setMessage(error.message);
      }
    };

    fetchLeaves();
  }, []);

  const openPopup = (leave) => {
    setSelectedLeave(leave);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setSelectedLeave(null);
    setIsPopupVisible(false);
  };

  const totalPages = Math.ceil(leaves.length / leavesPerPage);
  const startIndex = (currentPage - 1) * leavesPerPage;
  const currentLeaves = leaves.slice(startIndex, startIndex + leavesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="main">
      <section className="ems-content">
        <div className="container">

          <div className="all-employee">
            <div className="all-head">
              <h4>View Leaves</h4>
              <Link
                to={"/dashboard/apply-leave"}
                style={{
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <button
                  className="btn btn-purple "
                  style={{ backgroundColor: "#679903", color: "white" }}
                >
                  Apply For Leave
                </button>
              </Link>
            </div>
            {message && <p>{message}</p>}
            <div className="leaves mt-4">
              <div className="table-responsive">
                <table className="text-center table table-striped table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Employee Name</th>
                      <th>Leave Type</th>
                      <th>From Date</th>
                      <th>To Date</th>
                      <th>No. of days</th>
                      <th>Reason</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentLeaves.length > 0 ? (
                      currentLeaves.map((leave) => (
                        <tr key={leave._id}>
                          <td>
                            <a href="#">{leave.full_Name}</a>
                          </td>
                          <td>{leave.leave_Type}</td>
                          <td>{leave.leave_From}</td>
                          <td>{leave.leave_To}</td>
                          <td>{leave.no_Of_Days}</td>
                          <td>
                            <button
                              className="btn btn-outline-success"
                              onClick={() => openPopup(leave)}
                            >
                              View Reason
                            </button>
                          </td>
                          <td>{leave.leave_Status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7">No leaves available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <ul className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${currentPage === index + 1 ? "active" : ""
                      }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    <span className="page-link">{index + 1}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {selectedLeave && (
          <>
            <div
              id="overlay"
              className={`overlay ${isPopupVisible ? "visible" : ""}`}
              onClick={closePopup}
            />
            <div
              id="popup"
              className={`popup ${isPopupVisible ? "visible" : ""}`}
            >
              <div className="all-head">
                <h4>Employee Information</h4>
              </div>
              <p className="mt-4">
                <strong>Name:</strong> {selectedLeave.full_Name}
              </p>
              <p>
                <strong>EmpID:</strong> {selectedLeave.employee_Id}
              </p>
              <p>
                <strong>Leave Reason:</strong> {selectedLeave.reason_For_Leave}
              </p>

              {selectedLeave.leave_Status === "rejected" && (
                <p>
                  <strong>Reason for Rejection:</strong>
                  {selectedLeave.reason_For_Reject}
                </p>
              )}

              <button className="lev-btn" onClick={closePopup}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                >
                  <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
                </svg>
              </button>
            </div>
          </>
        )}
      </section>
      <style jsx="true">{`
        .overlay {
          display: none;
        }
        .overlay.visible {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 999;
        }
        .popup {
          display: none;
        }
        .popup.visible {
          display: block;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          border-radius: 5px;
          z-index: 1000;
        }
      `}</style>
    </div>
  );
};

export default FetchLeave;
