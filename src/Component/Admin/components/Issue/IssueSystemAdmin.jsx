import { useState, useEffect, useRef } from "react";
import service from "./api"; // Ensure this service handles issues-related APIs

import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const IssueSystemAdmin = () => {
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [popupContent, setPopupContent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isReassigning, setIsReassigning] = useState(false);
  const [showResolved, setShowResolved] = useState(false);
  const [assignedTo, setAssignedTo] = useState("");
  const [showAttachments, setShowAttachments] = useState(false);
  const [commentPopup, setCommentPopup] = useState(null);
  const [isViewingComments, setIsViewingComments] = useState(false);

  const [dropdownVisible, setDropdownVisible] = useState({});
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const dropdownRef = useRef(null);
  const [error, setError] = useState("");
  const [departments, setDepartments] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedTeam, setSelectedTeam] = useState("All");
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [newPriority, setNewPriority] = useState(
    popupContent?.priority || "Low"
  );
  const [newIssueStatus, setNewIssueStatus] = useState(
    popupContent?.issueStatus || "New"
  );

  const issuesPerPage = 5;

  // Fetch Issues on component mount and when showResolved changes
  useEffect(() => {
    fetchDepartmentIssues();
  }, [showResolved]);

  const fetchDepartmentIssues = async () => {
    try {
      setLoading(true);
      const response = await service.fetchDepartmentIssues();

      if (response.success) {
        setIssues(response.data);
        setFilteredIssues(
          response.data.filter((issue) =>
            showResolved
              ? issue.issueStatus === "Resolved"
              : issue.issueStatus !== "Resolved"
          )
        );
      } else {
        setError(response.message || "Failed to fetch issues");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred while fetching issues"
      );
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch based on employeeId
  useEffect(() => {
    const employeeId = localStorage.getItem("employeeId");

    if (employeeId) {
      fetchDepartmentIssues(employeeId);
    } else {
      setError("Employee ID not found");
      setLoading(false);
    }
  }, []);

  // Handle closing the comments popup
  const closeCommentPopup = () => {
    setCommentPopup(null);
    setComments([]);
    setNewComment("");
    setIsViewingComments(false);
  };

  // Show comments popup
  const showComments = (issue, viewing = false) => {
    setCommentPopup(issue);
    setIsViewingComments(viewing);
  };

  // Pagination calculations
  const indexOfLastIssue = currentPage * issuesPerPage;
  const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
  const currentIssues = filteredIssues.slice(
    indexOfFirstIssue,
    indexOfLastIssue
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const showPopup = (issue) => {
    setPopupContent(issue);
    setAssignedTo(issue.assignedTo);
    setShowAttachments(false);
  };

  console.log(popupContent);

  // Convert date to IST
  const convertToIST = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  };

  const closePopup = () => {
    console.log("Close popup button clicked");
    setPopupContent(null);
    setIsReassigning(false);
  };

  // Handle clicks outside dropdown to close it
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

  // Filter functions
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

  const filterByDepartment = (e) => {
    const department = e.target.value;
    setSelectedDepartment(department);
    setSelectedTeam("All"); // Reset team filter when department changes

    // Fetch issues with the new department selected
    if (department === "All") {
      setFilteredIssues(
        issues.filter((issue) =>
          showResolved
            ? issue.issueStatus === "Resolved"
            : issue.issueStatus !== "Resolved"
        )
      );
    } else {
      // Optionally, you can fetch teams based on the selected department
      // fetchTeamsByDepartment(department);
      setFilteredIssues(
        issues.filter(
          (issue) =>
            issue.department === department &&
            (showResolved
              ? issue.issueStatus === "Resolved"
              : issue.issueStatus !== "Resolved")
        )
      );
    }
    setCurrentPage(1);
  };

  const filterByTeam = (e) => {
    const team = e.target.value;
    setSelectedTeam(team);

    // Fetch issues with the selected department and team
    if (team === "All") {
      setFilteredIssues(
        issues.filter(
          (issue) =>
            issue.department === selectedDepartment &&
            (showResolved
              ? issue.issueStatus === "Resolved"
              : issue.issueStatus !== "Resolved")
        )
      );
    } else {
      setFilteredIssues(
        issues.filter(
          (issue) =>
            issue.department === selectedDepartment &&
            issue.team === team &&
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

  // Update Issue Status
  const updateIssue = async () => {
    if (!popupContent) return;

    Swal.fire({
      title: "Are you sure you want to update this issue?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Prepare the payload for the API
          const updatedData = {
            issueStatus: newIssueStatus,
            priority: newPriority,
            assignedTo: assignedTo || popupContent.assignedTo,
          };

          // Call the service to update the issue
          const response = await service.updateIssueStatus(
            popupContent._id,
            updatedData
          );

          // Update the local state with the updated issue details
          if (response.success) {
            setIssues(
              issues.map((issue) =>
                issue._id === popupContent._id
                  ? { ...issue, ...updatedData }
                  : issue
              )
            );

            setFilteredIssues(
              filteredIssues.map((issue) =>
                issue._id === popupContent._id
                  ? { ...issue, ...updatedData }
                  : issue
              )
            );

            closePopup();
            toast.success("Issue updated successfully!");
          } else {
            throw new Error(response.message || "Failed to update the issue");
          }
        } catch (error) {
          console.error("Error updating issue:", error.message);
          toast.error(
            error.response?.data?.message || "Error updating the issue."
          );
        }
      }
    });
  };

  // Fetch Comments when commentPopup changes
  useEffect(() => {
    const fetchComments = async () => {
      if (commentPopup) {
        try {
          const fetchedComments = await service.getCommentsForIssue(
            commentPopup._id
          );

          // Adjust based on your API response structure
          if (fetchedComments) {
            setComments(fetchedComments);
          } else {
            console.error("Unexpected comments structure:");
            // setComments([]);
            toast.error("Failed to parse comments data.");
          }
        } catch (error) {
          console.error("Error fetching comments:", error.message);
          toast.error("Failed to fetch comments.");
        }
      }
    };

    fetchComments();
  }, [commentPopup]);

  // console.log(comments);

  // Add a new comment
  const addComment = async (issueId) => {
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty!");
      return;
    }

    try {
      // Call the service function to post the comment
      const response = await service.postCommentOnIssue(issueId, newComment);

      if (response.success) {
        // Assuming response.data contains the new comment
        const newCommentData = {
          commenter: response.data.commenter, // e.g., "Admin"
          comment: response.data.comment, // The comment text
          createdAt: response.data.createdAt, // Timestamp
        };

        // Update the comments state with the new comment
        setComments([...comments, newCommentData]);

        // Optionally, update the issues state if comments are part of the issue object
        setIssues(
          issues.map((issue) =>
            issue._id === issueId
              ? { ...issue, comment: [...issue.comment, newCommentData] }
              : issue
          )
        );
        setFilteredIssues(
          filteredIssues.map((issue) =>
            issue._id === issueId
              ? { ...issue, comment: [...issue.comment, newCommentData] }
              : issue
          )
        );

        setNewComment("");
        toast.success("Comment added successfully!");
      } else {
        throw new Error(response.message || "Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error.message);
      toast.error(error.response?.data?.message);
    }
  };

  // Delete an issue
  const deleteIssue = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await service.deleteIssue(id);
          setIssues(issues.filter((issue) => issue._id !== id));
          setFilteredIssues(filteredIssues.filter((issue) => issue._id !== id));
          closePopup();
          toast.success("Issue deleted successfully!");
        } catch (error) {
          console.error(error.message);
          toast.error("Error deleting the issue.");
        }
      }
    });
  };

  // Sorting Issues (Optional)
  const sortedIssues = filteredIssues
    .filter((issue) =>
      showResolved
        ? issue.issueStatus === "Resolved"
        : issue.issueStatus !== "Resolved"
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  // Toggle dropdown visibility
  const toggleDropdown = (id) => {
    setDropdownVisible((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="main">
      <ToastContainer />
      <section className="ems-content">
        <div className="container p-5">
          <div className="razor-issue-admin">
            <div className="razor-issue-admin-all-employee">
              <div className="razor-issue-admin-all-head">
                <div className="all-head">
                  <h4>Issues</h4>
                </div>

                <div className="razor-issue-admin-search-filter">
                  <form action="" className="razor-issue-admin-search-form">
                    <input
                      type="text"
                      placeholder="Search"
                      className="razor-issue-admin-search-input"
                      onChange={handleSearch}
                      onClick={(e) => e.preventDefault()}
                    />
                  </form>
                  <button
                    className="razor-issue-admin-toggle-button"
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
                  </button>
                </div>
              </div>

              <div className="razor-issue-admin-filters">
                <div className="razor-issue-admin-filter-group">
                  <label
                    htmlFor="priorityFilter"
                    className="razor-issue-admin-label"
                  >
                    Priority:
                  </label>
                  <select
                    id="priorityFilter"
                    onChange={filterByPriority}
                    className="razor-issue-admin-dropdown"
                  >
                    <option value="All">All</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                {!showResolved && (
                  <div className="razor-issue-admin-filter-group">
                    <label
                      htmlFor="statusFilter"
                      className="razor-issue-admin-label"
                    >
                      Status:
                    </label>
                    <select
                      id="statusFilter"
                      onChange={filterByStatus}
                      className="razor-issue-admin-dropdown"
                    >
                      <option value="All">All</option>
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                    </select>
                  </div>
                )}

                <div className="razor-issue-admin-filter-group">
                  <label
                    htmlFor="dateFilter"
                    className="razor-issue-admin-label"
                  >
                    Date:
                  </label>
                  <input
                    type="date"
                    id="dateFilter"
                    onChange={filterByDate}
                    className="razor-issue-admin-date-input"
                  />
                </div>

                <div className="razor-issue-admin-filter-group">
                  <label
                    htmlFor="departmentFilter"
                    className="razor-issue-admin-label"
                  >
                    Department:
                  </label>
                  <select
                    id="departmentFilter"
                    onChange={filterByDepartment}
                    className="razor-issue-admin-dropdown"
                    value={selectedDepartment}
                  >
                    <option value="All">All</option>
                    {departments.map((department, index) => (
                      <option key={index} value={department}>
                        {department}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedDepartment !== "All" && (
                  <div className="razor-issue-admin-filter-group">
                    <label
                      htmlFor="teamFilter"
                      className="razor-issue-admin-label"
                    >
                      Team:
                    </label>
                    <select
                      id="teamFilter"
                      onChange={filterByTeam}
                      className="razor-issue-admin-dropdown"
                      value={selectedTeam}
                    >
                      <option value="All">All</option>
                      {filteredTeams.map((team, index) => (
                        <option key={index} value={team}>
                          {team}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="razor-issue-admin-table-responsive">
                {loading ? (
                  <p>Loading issues...</p>
                ) : error ? (
                  <p className="error">{error}</p>
                ) : (
                  <table className="razor-issue-admin-table">
                    <thead>
                      <tr>
                        <th>Serial No</th>
                        <th>Full Name</th>
                        <th>Employee ID</th>
                        <th>Employee Designation</th>
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
                          {/* <td>{`${issue.createdBy.first_Name} ${issue.createdBy.last_Name}`}</td> */}
                          <td>
                            {issue.createdBy
                              ? `${issue.createdBy.first_Name || ""} ${
                                  issue.createdBy.last_Name || ""
                                }`
                              : "Unknown User"}
                          </td>
                          <td>
                            {issue.createdBy
                              ? issue.createdBy.employee_Id
                              : "Unknown Employee ID"}
                          </td>
                          <td>
                            {issue.createdBy
                              ? issue.createdBy.designation
                              : "No Designation"}
                          </td>

                          <td>{issue.issueTitle}</td>
                          <td>
                            {new Date(issue.createdAt).toLocaleDateString()}
                          </td>
                          {/* <td>{issue.assignedTo}</td> */}
                          <td>
                            {issue.assignedTo
                              ? issue.assignedTo
                              : "No Department"}
                          </td>
                          <td>{issue.priority}</td>
                          <td>{issue.issueStatus}</td>
                          <td className="razor-issue-admin-actions">
                            <span
                              className="razor-issue-admin-dots"
                              onClick={() => toggleDropdown(issue._id)}
                            >
                              {/* SVG Icon for Dropdown */}
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
                                {/* Update Status */}
                                <p
                                  className="razor-issue-admin-dropdown-item"
                                  onClick={() => showPopup(issue)}
                                >
                                  {/* SVG Icon for Update */}
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
                                  Update Status
                                </p>

                                {/* View Comments */}
                                <p
                                  className="razor-issue-admin-dropdown-item"
                                  onClick={() => showComments(issue)}
                                >
                                  {/* SVG Icon for Comment */}
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
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Pagination */}
              <div className="razor-issue-admin-pagination-container">
                <ul className="razor-issue-admin-pagination">
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
        </div>
      </section>

      {/* Comments Popup */}
      {commentPopup && (
        <div className="rzr-hm-issue-comment">
          <div className="popupContent">
            <button className="closeButton" onClick={closeCommentPopup}>
              &times;
            </button>
            <div className="all-head d-flex align-items-center justify-content-between mb-3">
              <h4>Comments for {commentPopup.issueTitle}</h4>
            </div>
            <div className="chatBox">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={comment._id || index}>
                    {/* Comment Body */}
                    <div className="chatMessage">
                      <strong>
                        {typeof comment.commenter === "object"
                          ? `${comment.commenter.firstName || "Anonymous"} ${
                              comment.commenter.lastName || ""
                            }`
                          : comment.commenter || "Anonymous"}
                      </strong>
                      <p>{comment.comment || "No comment text provided."}</p>
                      <small>{convertToIST(comment.createdAt)}</small>
                    </div>
                  </div>
                ))
              ) : (
                <p>No comments available.</p>
              )}
            </div>

            {!isViewingComments && (
              <>
                <textarea
                  className="rzr-textarea"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment"
                />
                <button
                  className="rzr-button"
                  onClick={() => addComment(commentPopup._id)}
                >
                  Submit Comment
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Issue Details Popup */}
      {popupContent && (
        <div className="rzr-hm-issue-popup">
          <div className="admin-popupContent">
            <button className="admin-closeButton" onClick={closePopup}>
              &times;
            </button>
            <div className="all-head d-flex align-items-center justify-content-between mb-3">
              <h4>Issue Details</h4>
            </div>
            <table className="admin-detailsTable">
              <tbody>
                <tr>
                  <td>
                    <strong>Title:</strong>
                  </td>
                  <td>{popupContent.issueTitle}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Description:</strong>
                  </td>
                  <td>{popupContent.issueDescription}</td>
                </tr>
                <tr>
                  <td>
                    <strong>User Details:</strong>
                  </td>
                  <td>
                    <ul className="admin-detailsList">
                      <li>
                        <strong>Name:</strong>{" "}
                        {`${popupContent.createdBy.first_Name} ${popupContent.createdBy.last_Name}`}
                      </li>
                      <li>
                        <strong>Department:</strong>{" "}
                        {popupContent.createdBy.department}
                      </li>
                      <li>
                        <strong>Designation:</strong>{" "}
                        {popupContent.createdBy.designation}
                      </li>
                      <li>
                        <strong>Employee ID:</strong>{" "}
                        {popupContent.createdBy.employee_Id}
                      </li>
                      <li>
                        <strong>Phone Number:</strong>{" "}
                        {popupContent.createdBy.mobile_No}
                      </li>
                      <li>
                        <strong>Emaill:</strong>{" "}
                        {popupContent.createdBy.working_Email_Id}
                      </li>
                      <li>
                        <strong>Assigned To:</strong> {popupContent.assignedTo}
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Priority:</strong>
                  </td>
                  <td>
                    <select
                      value={newPriority}
                      onChange={(e) => setNewPriority(e.target.value)}
                      className="admin-input"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Status:</strong>
                  </td>
                  <td>
                    <select
                      value={newIssueStatus}
                      onChange={(e) => setNewIssueStatus(e.target.value)}
                      className="admin-input"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Resolved">Resolved</option>
                      <option value="In Progress">In Progress</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="admin-buttons">
              <button
                className="admin-button admin-viewAttachmentsButton"
                onClick={() => setShowAttachments(!showAttachments)}
              >
                {showAttachments ? "Hide Attachments" : "View Attachments"}
              </button>
            </div>
            {showAttachments && (
              <div className="admin-attachments">
                {popupContent.file ? (
                  <a
                    href={popupContent.file}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={popupContent.file}
                      alt="Attachment"
                      className="admin-attachmentImage"
                    />
                  </a>
                ) : (
                  <p>No attachments found</p>
                )}
              </div>
            )}
            {/* {showAttachments && (
              <div className="admin-attachments">
                {map.popupContent.additionalFiles(url) ? (
                  <a
                    href={popupContent.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={popupContent.url}
                      alt="Attachment"
                      className="admin-attachmentImage"
                    />
                  </a>
                ) : (
                  <p>No attachments found</p>
                )}
              </div>
            )} */}
            {showAttachments && popupContent && (
              <div className="admin-attachments">
                {popupContent.additionalFiles &&
                popupContent.additionalFiles.length > 0 ? (
                  popupContent.additionalFiles.map((file) => (
                    <a
                      key={file._id.$oid} // Use the unique ID as the key
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={file.url}
                        alt="Attachment"
                        className="admin-attachmentImage"
                      />
                    </a>
                  ))
                ) : (
                  <p>No attachments found</p>
                )}
              </div>
            )}

            {!showResolved && (
              <div className="admin-actionButtons">
                <button
                  className="admin-button"
                  onClick={() =>
                    isReassigning
                      ? (setAssignedTo(assignedTo), setIsReassigning(false))
                      : setIsReassigning(true)
                  }
                >
                  {isReassigning ? "Save Assignee" : "Reassign"}
                </button>
                <button className="admin-button" onClick={updateIssue}>
                  Update Issue
                </button>
                <button
                  className="admin-button admin-deleteButton"
                  onClick={() => deleteIssue(popupContent._id)}
                >
                  Delete Issue
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Pagination Component
const Pagination = ({ issuesPerPage, totalIssues, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalIssues / issuesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="rzr-hm-pagination">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`${currentPage === number ? "active" : ""}`}
              disabled={currentPage === number}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// Styles (Unchanged)
const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    backgroundColor: "#fff",
    padding: "20px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    listStyle: "none",
    padding: 0,
  },
  pageItem: {
    margin: "0 5px",
  },
  pageLink: {
    border: "1px solid #007bff",
    padding: "10px 15px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  button: {
    margin: "5px",
    padding: "5px 10px",
    cursor: "pointer",
  },
  filters: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  filterGroup: {
    display: "flex",
    alignItems: "center",
  },
  dropdown: {
    marginLeft: "10px",
    padding: "5px 10px",
  },
  searchInput: {
    margin: "5px",
    padding: "5px",
    width: "200px",
  },
  dateInput: {
    marginLeft: "10px",
    padding: "5px",
  },
  popup: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popupContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
    position: "relative",
    maxWidth: "600px",
    width: "100%",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
  },
  attachments: {
    marginTop: "10px",
  },
  attachmentImage: {
    maxWidth: "100%",
    maxHeight: "200px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    boxSizing: "border-box",
    marginTop: "10px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    boxSizing: "border-box",
  },

  // Existing styles
  chatBox: {
    maxHeight: "300px",
    overflowY: "scroll",
    marginBottom: "10px",
    border: "1px solid #ccc",
    padding: "10px",
  },
  chatMessage: {
    marginBottom: "10px",
    padding: "10px",
    backgroundColor: "#f1f1f1",
    borderRadius: "5px",
  },
};

export default IssueSystemAdmin;
