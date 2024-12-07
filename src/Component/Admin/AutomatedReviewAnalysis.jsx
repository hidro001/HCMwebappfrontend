import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

const AutomatedReviewAnalysis = ({ reviews }) => {
  const userRole = useSelector((state) => state.auth.userRole);
  const dispatch = useDispatch();
  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    highRatedReviews: 0,
    lowRatedReviews: 0,
    departmentReviews: {},
    topPerformers: [],
    bottomPerformers: [],
    topDepartmentPerformers: {},
    bottomDepartmentPerformers: {},
  });

  useEffect(() => {
    const calculateStats = () => {
      if (!reviews || reviews.length === 0) {
        return;
      }

      const totalReviews = reviews.length;
      const averageRating =
        reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews;
      const highRatedReviews = reviews.filter(
        (review) => review.rating >= 4
      ).length;
      const lowRatedReviews = reviews.filter(
        (review) => review.rating <= 2
      ).length;

      const departmentReviews = reviews.reduce((acc, review) => {
        if (acc[review.department]) {
          acc[review.department].count += 1;
          acc[review.department].rating += review.rating;
        } else {
          acc[review.department] = { count: 1, rating: review.rating };
        }
        return acc;
      }, {});

      const sortedReviews = reviews.sort((a, b) => b.rating - a.rating);
      const topPerformers = sortedReviews.slice(0, 5);
      const bottomPerformers = sortedReviews.slice(-5);

      const topDepartmentPerformers = {};
      const bottomDepartmentPerformers = {};

      Object.keys(departmentReviews).forEach((department) => {
        const departmentReviewList = reviews.filter(
          (review) => review.department === department
        );
        topDepartmentPerformers[department] = departmentReviewList
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);
        bottomDepartmentPerformers[department] = departmentReviewList
          .sort((a, b) => a.rating - b.rating)
          .slice(0, 3);
      });

      setStats({
        totalReviews,
        averageRating: averageRating.toFixed(2),
        highRatedReviews,
        lowRatedReviews,
        departmentReviews,
        topPerformers,
        bottomPerformers,
        topDepartmentPerformers,
        bottomDepartmentPerformers,
      });
    };

    calculateStats();
  }, [reviews]);

  return (
    <div className="rzr-hcm-hr-analysis-container">
      <h2>Automated Performance Review</h2>
      <div className="rzr-hcm-hr-stats-container">
        <div className="rzr-hcm-hr-stat-box">
          <h3>Total Reviews</h3>
          <p>{stats.totalReviews}</p>
        </div>
        <div className="rzr-hcm-hr-stat-box">
          <h3>Average Rating</h3>
          <p>{stats.averageRating}</p>
        </div>
        <div className="rzr-hcm-hr-stat-box">
          <h3>High Rated Reviews (4-5)</h3>
          <p>{stats.highRatedReviews}</p>
        </div>
        <div className="rzr-hcm-hr-stat-box">
          <h3>Low Rated Reviews (1-2)</h3>
          <p>{stats.lowRatedReviews}</p>
        </div>
      </div>
      <h3 className="rzr-hcm-hr-subheading">Top 5 Performers</h3>
      <div className="rzr-hcm-hr-performers-container">
        {stats.topPerformers.map((review, index) => (
          <div key={index} className="rzr-hcm-hr-performer-card">
            <p>{review.fullName}</p>
            <span className="rzr-hcm-hr-performer-rating">{review.rating}</span>
          </div>
        ))}
      </div>
      <h3 className="rzr-hcm-hr-subheading">Bottom 5 Performers</h3>
      <div className="rzr-hcm-hr-performers-container">
        {stats.bottomPerformers.map((review, index) => (
          <div key={index} className="rzr-hcm-hr-performer-card">
            <p>{review.fullName}</p>
            <span className="rzr-hcm-hr-performer-rating">{review.rating}</span>
          </div>
        ))}
      </div>
      {userRole === "admin" && (
        <>
          <h3 className="rzr-hcm-hr-subheading">Department-wise Top 3 Performers</h3>
          {Object.keys(stats.topDepartmentPerformers).map((department, index) => (
            <div key={index} className="rzr-hcm-hr-department-section">
              <h4>{department}</h4>
              <ul className="rzr-hcm-hr-list">
                {stats.topDepartmentPerformers[department].map((review, idx) => (
                  <li key={idx}>
                    {review.fullName} ({review.rating})
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <h3 className="rzr-hcm-hr-subheading">Department-wise Bottom 3 Performers</h3>
          {Object.keys(stats.bottomDepartmentPerformers).map((department, index) => (
            <div key={index} className="rzr-hcm-hr-department-section">
              <h4>{department}</h4>
              <ul className="rzr-hcm-hr-list">
                {stats.bottomDepartmentPerformers[department].map((review, idx) => (
                  <li key={idx}>
                    {review.fullName} ({review.rating})
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}
    </div>


  );
};

export default AutomatedReviewAnalysis;
