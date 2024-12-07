import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import service from "../../services/Service";

const ViewPreviousAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const announcementsPerPage = 5;

  useEffect(() => {
    const getAnnouncements = async () => {
      try {
        const data = await service.fetchAnnouncementListEmployee();
        setAnnouncements(data.data); // Assuming the API response has a data field containing the announcements
      } catch (error) {
        console.error("Error fetching announcement list:", error);
      }
    };

    getAnnouncements();
  }, []);

  // Get current announcements
  const indexOfLastAnnouncement = currentPage * announcementsPerPage;
  const indexOfFirstAnnouncement =
    indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = announcements.slice(
    indexOfFirstAnnouncement,
    indexOfLastAnnouncement
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(announcements.length / announcementsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div className="main">
      <section className="ems-content">
        <div className="container">
          <div className="all-employee">
            <div className="all-head">
              <h4>Previous Announcements</h4>
            </div>
            <div className="row mt-4">
              <div className="col-lg-12 mt-3">
                <div className="pre-announcements">
                  {currentAnnouncements.map((announcement) => (
                    <div className="pre-message-bx" key={announcement._id}>
                      <div className="top-employee d-flex">
                        <div className="">
                          <img
                            src={announcement.announcementPostImg}
                            alt="Announcement"
                            className="performer-view"
                            style={{ width: "60px", height: "60px" }}
                          />
                        </div>
                        <div className="top-emp-details mx-3">
                          <a href="#" className="top-emp-name">
                            {announcement.announcementSubject}
                          </a>
                          <div className="emp-details">
                            <span className="emp-designation">
                              {announcement.announcementDate} || Announcement
                            </span>
                            <br />
                            <span className="emp-process">
                              {announcement.announcementDescription}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="d-flex justify-content-end">
                    <ul className="pagination">
                      <li
                        className={`page-item ${
                          currentPage === 1 && "disabled"
                        }`}
                      >
                        <span
                          className="page-link"
                          onClick={() => paginate(currentPage - 1)}
                        >
                          <span aria-hidden="true">‹</span>
                          <span className="visually-hidden">Previous</span>
                        </span>
                      </li>
                      {pageNumbers.map((number) => (
                        <li
                          key={number}
                          className={`page-item ${
                            number === currentPage && "active"
                          }`}
                        >
                          <span
                            onClick={() => paginate(number)}
                            className="page-link"
                          >
                            {number}
                          </span>
                        </li>
                      ))}
                      <li
                        className={`page-item ${
                          currentPage === pageNumbers.length && "disabled"
                        }`}
                      >
                        <span
                          className="page-link"
                          onClick={() => paginate(currentPage + 1)}
                        >
                          <span aria-hidden="true">›</span>
                          <span className="visually-hidden">Next</span>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViewPreviousAnnouncements;
