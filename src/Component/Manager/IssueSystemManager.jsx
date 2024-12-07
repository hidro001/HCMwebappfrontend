import { useState, useEffect, useRef } from "react";
import service from "../../services/Service";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const IssueSystemManager = () => {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [popupContent, setPopupContent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isReassigning, setIsReassigning] = useState(false);
  const [showResolved, setShowResolved] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [commentPopup, setCommentPopup] = useState(null);
  const [isViewingComments, setIsViewingComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState({});
  const issuesPerPage = 5;
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const data = await service.fetchAllIssuesManager();
        setIssues(data.data);
        setFilteredIssues(
          data.data.filter((issue) => issue.issueStatus !== "Resolved")
        );
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchIssues();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible({});
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const closeCommentPopup = () => {
    setCommentPopup(null);
  };

  const showComments = (issue, viewing = false) => {
    setCommentPopup(issue);
    setIsViewingComments(viewing);
  };

  const addComment = async (issueId) => {
    if (!newComment.trim()) return;

    try {
      const data = {
        comment: newComment,
        commenter: "Admin", // You can change this to dynamic user if needed
        createdAt: new Date().toISOString(),
      };

      // Call the service function to post the comment
      const response = await service.postCommentOnIssueForManager(
        issueId,
        newComment
      );

      // If the service function is successful, update the state
      setIssues(
        issues.map((issue) =>
          issue._id === issueId
            ? { ...issue, comment: [...issue.comment, data] }
            : issue
        )
      );
      setFilteredIssues(
        filteredIssues.map((issue) =>
          issue._id === issueId
            ? { ...issue, comment: [...issue.comment, data] }
            : issue
        )
      );
      setNewComment("");
      closeCommentPopup();
    } catch (error) {
      console.error(error.message);
    }
  };

  const convertToIST = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  };

  const indexOfLastIssue = currentPage * issuesPerPage;
  const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
  const currentIssues = filteredIssues.slice(
    indexOfFirstIssue,
    indexOfLastIssue
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const showPopup = (issue) => {
    setPopupContent(issue);
    setShowAttachments(false);
  };

  const closePopup = () => {
    setPopupContent(null);
    setIsReassigning(false);
  };

  const filterByPriority = (e) => {
    const priority = e.target.value;
    if (priority === "All") {
      setFilteredIssues(
        issues.filter((issue) =>
          showResolved
            ? issue.issueStatus === "Resolved"
            : issue.issueStatus !== "Resolved"
        )
      );
    } else {
      setFilteredIssues(
        issues.filter(
          (issue) =>
            issue.priority === priority &&
            (showResolved
              ? issue.issueStatus === "Resolved"
              : issue.issueStatus !== "Resolved")
        )
      );
    }
    setCurrentPage(1);
  };

  const filterByStatus = (e) => {
    const status = e.target.value;
    if (status === "All") {
      setFilteredIssues(
        issues.filter((issue) =>
          showResolved
            ? issue.issueStatus === "Resolved"
            : issue.issueStatus !== "Resolved"
        )
      );
    } else {
      setFilteredIssues(
        issues.filter(
          (issue) =>
            issue.issueStatus === status &&
            (showResolved
              ? issue.issueStatus === "Resolved"
              : issue.issueStatus !== "Resolved")
        )
      );
    }
    setCurrentPage(1);
  };

  const filterByDate = (e) => {
    const date = e.target.value;
    if (date === "") {
      setFilteredIssues(
        issues.filter((issue) =>
          showResolved
            ? issue.issueStatus === "Resolved"
            : issue.issueStatus !== "Resolved"
        )
      );
    } else {
      setFilteredIssues(
        issues.filter(
          (issue) =>
            issue.createdAt.split("T")[0] === date &&
            (showResolved
              ? issue.issueStatus === "Resolved"
              : issue.issueStatus !== "Resolved")
        )
      );
    }
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setFilteredIssues(
      issues.filter(
        (issue) =>
          (issue.issueTitle.toLowerCase().includes(query) ||
            issue.userName.toLowerCase().includes(query) || // Search by full name
            issue.createdAt.includes(query)) &&
          (showResolved
            ? issue.issueStatus === "Resolved"
            : issue.issueStatus !== "Resolved")
      )
    );
    setCurrentPage(1);
  };

  const updateIssueStatus = async () => {
    // Confirm before updating
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await service.updateIssueByIdManager(popupContent._id, {
            issueStatus: popupContent.issueStatus,
          });
          setIssues(
            issues.map((issue) =>
              issue._id === popupContent._id
                ? { ...issue, issueStatus: popupContent.issueStatus }
                : issue
            )
          );
          setFilteredIssues(
            filteredIssues
              .map((issue) =>
                issue._id === popupContent._id
                  ? { ...issue, issueStatus: popupContent.issueStatus }
                  : issue
              )
              .filter((issue) =>
                showResolved
                  ? issue.issueStatus === "Resolved"
                  : issue.issueStatus !== "Resolved"
              )
          );
          closePopup();
          // Toastify success message
          toast.success("Issue updated successfully!");
        } catch (error) {
          console.error(error.message);
          // Optionally handle errors differently
          toast.error("Error updating issue.");
        }
      }
    });
  };

  const sortedIssues = filteredIssues
    .filter((issue) =>
      showResolved
        ? issue.issueStatus === "Resolved"
        : issue.issueStatus !== "Resolved"
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  useEffect(() => {
    const fetchComments = async () => {
      if (commentPopup) {
        try {
          const fetchedComments = await service.getCommentsForIssueForManager(
            commentPopup._id
          );
          setComments(fetchedComments.data); // Assuming the comments are in `data`
          console.log("Fetched comments:", fetchedComments.data); // Debug log
        } catch (error) {
          console.error("Error fetching comments:", error.message);
        }
      }
    };

    fetchComments();
  }, [commentPopup]);

  const toggleDropdown = (id) => {
    setDropdownVisible((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };


  const [attachmentPopup, setAttachmentPopup] = useState(false);

  const toggleAttachmentPopup = () => {
    setAttachmentPopup(!attachmentPopup);
  };

  const renderAttachmentContent = () => {
    if (!popupContent.file) {
      return <p>No attachments found</p>;
    }

    const fileExtension = popupContent.file.split('.').pop().toLowerCase();

    if (fileExtension === 'pdf') {
      // PDF file
      return (
        <iframe
          src={popupContent.file}
          title="PDF Viewer"
          className="rzr-hm-attachmentViewer"
        />
      );
    } else if (['xls', 'xlsx', 'doc', 'docx', 'ppt', 'pptx'].includes(fileExtension)) {
      // Office files (Excel, Word, PowerPoint)
      const encodedURL = encodeURIComponent(popupContent.file);
      return (
        <iframe
          src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodedURL}`}
          title="Office Viewer"
          className="rzr-hm-attachmentViewer"
        />
      );
    } else {
      // Other file types (Images)
      return (
        <img
          src={popupContent.file}
          alt="Attachment"
          className="rzr-hm-attachmentImage"
        />
      );
    }
  };

  return (
    <div className="main">
      <ToastContainer />
      <section className="ems-content">
        <div className="container">
          <div className=" all-employee">
            <div className="all-head d-flex align-items-center justify-content-between">
              <h4>Manage Issues</h4>
              <div className="rzr-hcm-hr-issue d-flex align-items-center gap-3">
                <form action="" className="rzr-search-form">
                  <input
                    type="search"
                    name=""
                    id="search"
                    className="rzr-search-input form-control"
                    placeholder="Search"
                    required=""
                    onChange={handleSearch}
                  />
                </form>
                <div
                  className="rzr-add-user-btn add-user-btn"
                  onClick={() => {
                    setShowResolved(!showResolved);
                    setFilteredIssues(
                      issues.filter((issue) =>
                        showResolved
                          ? issue.issueStatus !== "Resolved"
                          : issue.issueStatus === "Resolved"
                      )
                    );
                    setCurrentPage(1);
                  }}
                >
                  {showResolved ? "Active Issues" : "Resolved Issues"}
                </div>
              </div>
            </div>

            <div className="row mt-4 mb-4">
              <div className="col-lg-4">
                <div className="rzr-filterGroup-bs">
                  <label htmlFor="priorityFilter">Priority:</label>
                  <select
                    id="priorityFilter"
                    onChange={filterByPriority}
                    className="rzr-dropdown-bs"
                  >
                    <option value="All">All</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-4">
                {!showResolved && (
                  <div className="rzr-filterGroup-bs">
                    <label htmlFor="statusFilter">Status:</label>
                    <select
                      id="statusFilter"
                      onChange={filterByStatus}
                      className="rzr-dropdown-bs"
                    >
                      <option value="All">All</option>
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                    </select>
                  </div>
                )}
              </div>
              <div className="col-lg-4">
                <div className="rzr-filterGroup-bs">
                  <label htmlFor="dateFilter">Date:</label>
                  <input
                    type="date"
                    id="dateFilter"
                    onChange={filterByDate}
                    className="rzr-dateInput-bs"
                  />
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover table-bordered table table-striped">
                <thead>
                  <tr className=" text-center">
                    <th>SNo</th>
                    <th>Emp Name</th>
                    <th>Emp ID</th>
                    <th>Issue Title</th>
                    <th>Issue Date</th>
                    <th>Assigned To</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentIssues.map((issue, index) => (
                    <tr key={issue._id}>
                      <td>{indexOfFirstIssue + index + 1}</td>
                      <td>{issue.userName}</td>
                      <td>{issue.employeeId}</td>
                      <td>{issue.issueTitle}</td>
                      <td>{issue.createdAt.split("T")[0]}</td>
                      <td>{issue.assignedTo}</td>
                      <td>{issue.priority}</td>
                      <td>{issue.issueStatus}</td>
                      <td className="razor-issue-admin-actions">
                        <span
                          className="razor-issue-admin-dots"
                          style={{ cursor: "pointer" }}
                          onClick={() => toggleDropdown(issue._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></path>
                          </svg>
                        </span>
                        {dropdownVisible[issue._id] && (
                          <div
                            className="razor-issue-admin-dropdown-menu"
                            ref={dropdownRef}
                          >
                            <p
                              className="razor-issue-admin-dropdown-item mb-0"
                              onClick={() => showPopup(issue)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="20"
                                width="22.5"
                                viewBox="0 0 576 512"
                              >
                                <path
                                  fill="#679903"
                                  d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"
                                />
                              </svg>
                              View
                            </p>
                            {!showResolved && (
                              <p
                                className="razor-issue-admin-dropdown-item mb-0"
                                onClick={() => showComments(issue)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="20"
                                  width="20"
                                  viewBox="0 0 512 512"
                                >
                                  <path
                                    fill="#679903"
                                    d="M168.2 384.9c-15-5.4-31.7-3.1-44.6 6.4c-8.2 6-22.3 14.8-39.4 22.7c5.6-14.7 9.9-31.3 11.3-49.4c1-12.9-3.3-25.7-11.8-35.5C60.4 302.8 48 272 48 240c0-79.5 83.3-160 208-160s208 80.5 208 160s-83.3 160-208 160c-31.6 0-61.3-5.5-87.8-15.1zM26.3 423.8c-1.6 2.7-3.3 5.4-5.1 8.1l-.3 .5c-1.6 2.3-3.2 4.6-4.8 6.9c-3.5 4.7-7.3 9.3-11.3 13.5c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c5.1 0 10.2-.3 15.3-.8l.7-.1c4.4-.5 8.8-1.1 13.2-1.9c.8-.1 1.6-.3 2.4-.5c17.8-3.5 34.9-9.5 50.1-16.1c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9zM144 272a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm144-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm80 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"
                                  />
                                </svg>
                                Comment
                              </p>
                            )}
                            {showResolved && (
                              <p
                                className="razor-issue-admin-dropdown-item mb-0"
                                onClick={() => showComments(issue, true)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="20"
                                  width="20"
                                  viewBox="0 0 512 512"
                                >
                                  <path
                                    fill="#679903"
                                    d="M168.2 384.9c-15-5.4-31.7-3.1-44.6 6.4c-8.2 6-22.3 14.8-39.4 22.7c5.6-14.7 9.9-31.3 11.3-49.4c1-12.9-3.3-25.7-11.8-35.5C60.4 302.8 48 272 48 240c0-79.5 83.3-160 208-160s208 80.5 208 160s-83.3 160-208 160c-31.6 0-61.3-5.5-87.8-15.1zM26.3 423.8c-1.6 2.7-3.3 5.4-5.1 8.1l-.3 .5c-1.6 2.3-3.2 4.6-4.8 6.9c-3.5 4.7-7.3 9.3-11.3 13.5c-4.6 4.6-5.9 11.4-3.4 17.4c2.5 6 8.3 9.9 14.8 9.9c5.1 0 10.2-.3 15.3-.8l.7-.1c4.4-.5 8.8-1.1 13.2-1.9c.8-.1 1.6-.3 2.4-.5c17.8-3.5 34.9-9.5 50.1-16.1c22.9-10 42.4-21.9 54.3-30.6c31.8 11.5 67 17.9 104.1 17.9c141.4 0 256-93.1 256-208S397.4 32 256 32S0 125.1 0 240c0 45.1 17.7 86.8 47.7 120.9c-1.9 24.5-11.4 46.3-21.4 62.9zM144 272a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm144-32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm80 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"
                                  />
                                </svg>
                                Comments
                              </p>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-end">
              <ul className="pagination">
                <Pagination
                  issuesPerPage={issuesPerPage}
                  totalIssues={filteredIssues.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </ul>
            </div>
          </div>
        </div>
      </section>

      {commentPopup && (
        <div style={styles.popup}>
          <div style={styles.popupContent}>
            <button style={styles.closeButton} onClick={closeCommentPopup}>
              &times;
            </button>
            <div className="all-head d-flex align-items-center justify-content-between mb-3">
              <h4>Comments for {commentPopup.issueTitle}</h4>
            </div>

            <div style={styles.chatBox}>
              {comments.map((comment, index) => (
                <div key={index} style={styles.chatMessage}>
                  <strong>{comment.userName}</strong>
                  <p>{comment.message}</p>
                  <small>{convertToIST(comment.createdAt)}</small>
                </div>
              ))}
            </div>
            {!isViewingComments && (
              <>
                <textarea
                  className="rzr-textarea"
                  style={styles.textarea}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment"
                />
                <button
                  className="rzr-button"
                  style={styles.button}
                  onClick={() => addComment(commentPopup._id)}
                >
                  Submit Comment
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {popupContent && (
        <div className="rzr-hm-issue-mngr-view">
          <div className="rzr-hm-popup">
            <div className="rzr-hm-popupContent">
              <button className="rzr-hm-closeButton" onClick={closePopup}>
                &times;
              </button>
              <h3>Issue Details</h3>
              <table className="rzr-hm-detailsTable">
                <tbody>
                  <tr>
                    <td><strong>Title:</strong></td>
                    <td>{popupContent.issueTitle}</td>
                  </tr>
                  <tr>
                    <td><strong>Description:</strong></td>
                    <td>{popupContent.issueDescription}</td>
                  </tr>
                  <tr>
                    <td colSpan="2" className="rzr-hm-userDetails">
                      <h4>User Details</h4>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Name:</strong></td>
                    <td>{popupContent.userName}</td>
                  </tr>
                  <tr>
                    <td><strong>Department:</strong></td>
                    <td>{popupContent.department}</td>
                  </tr>
                  <tr>
                    <td><strong>Designation:</strong></td>
                    <td>{popupContent.designation}</td>
                  </tr>
                  <tr>
                    <td><strong>Employee ID:</strong></td>
                    <td>{popupContent.employeeId}</td>
                  </tr>
                  <tr>
                    <td><strong>Phone Number:</strong></td>
                    <td>{popupContent.phoneNumber}</td>
                  </tr>
                  <tr>
                    <td><strong>Email:</strong></td>
                    <td>{popupContent.workingEmail}</td>
                  </tr>
                  <tr>
                    <td><strong>Assigned To:</strong></td>
                    <td>{popupContent.assignedTo}</td>
                  </tr>
                </tbody>
              </table>

              {/* Status Dropdown and View Attachment in the same row */}
              <div className="rzr-hm-actionsRow">
                <button className="rzr-hm-button" onClick={toggleAttachmentPopup}>
                  {showAttachments ? "Hide Attachments" : "View Attachments"}
                </button>

                {!showResolved && (


                  <select
                    id="statusSelect"
                    value={popupContent.issueStatus}
                    onChange={(e) =>
                      setPopupContent({
                        ...popupContent,
                        issueStatus: e.target.value,
                      })
                    }
                    className="rzr-hm-dropdown"
                  >

                    <option value="Pending">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                )}
              </div>

              {/* Attachment Modal */}
              {attachmentPopup && (
                <div className="rzr-hm-attachmentModal">
                  <div className="rzr-hm-attachmentContent">
                    <button className="rzr-hm-closeButton" onClick={toggleAttachmentPopup}>
                      &times;
                    </button>
                    <div className="rzr-hm-attachmentWrapper">
                      {renderAttachmentContent()}
                    </div>
                  </div>
                </div>
              )}

              {!showResolved && (
                <button className="rzr-hm-button mt-3" onClick={updateIssueStatus}>
                  Update Issue
                </button>
              )}
            </div>
          </div>
        </div>

      )}
    </div>
  );
};

const Pagination = ({ issuesPerPage, totalIssues, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalIssues / issuesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="rzr-pv-task-emp-pagination">
      <ul className="rzr-pv-task-emp-pagination-list">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`rzr-pv-task-emp-pagination-item ${currentPage === number ? "active" : ""
              }`}
          >
            <button
              onClick={() => paginate(number)}
              className="rzr-pv-task-emp-pagination-link"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};



export default IssueSystemManager;
