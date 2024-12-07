// src/components/AllEmployeeRatings.js

import React, { useState, useEffect } from "react";
import axios from "./axiosConfig"; // Adjust the path as needed
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Row,
  Col,
  Table,
  Spinner,
  Card,
  Form,
  Button,
  Pagination,
} from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const AllEmployeeRatings = () => {
  const [ratings, setRatings] = useState([]);
  const [overallAverage, setOverallAverage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    employeeId: "",
    department: "",
    ratedBy: "",
    minAverage: "",
    maxAverage: "",
  });
  const [pagination, setPagination] = useState({
    totalRatings: 0,
    totalPages: 0,
    currentPage: 1,
  });

  const [searchParams, setSearchParams] = useState({
    employeeId: "",
    department: "",
    ratedBy: "",
    minAverage: "",
    maxAverage: "",
  });

  const fetchAllEmployeeRatings = async (page = 1) => {
    setLoading(true);
    try {
      // Build query string based on searchParams
      let query = `?page=${page}&limit=20`;

      if (searchParams.employeeId) {
        query += `&employeeId=${searchParams.employeeId}`;
      }

      if (searchParams.department) {
        query += `&department=${encodeURIComponent(searchParams.department)}`;
      }

      if (searchParams.ratedBy) {
        query += `&ratedBy=${searchParams.ratedBy}`;
      }

      if (searchParams.minAverage) {
        query += `&minAverage=${searchParams.minAverage}`;
      }

      if (searchParams.maxAverage) {
        query += `&maxAverage=${searchParams.maxAverage}`;
      }

      const response = await axios.get(`/kpi/ratings/all${query}`);
      setRatings(response.data.data);
      setOverallAverage(response.data.overallAverage);
      setPagination(response.data.pagination);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching all employee ratings:", error);
      toast.error("Failed to fetch employee ratings.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEmployeeRatings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams(filters);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    fetchAllEmployeeRatings(1);
  };

  const handleReset = () => {
    setFilters({
      employeeId: "",
      department: "",
      ratedBy: "",
      minAverage: "",
      maxAverage: "",
    });
    setSearchParams({
      employeeId: "",
      department: "",
      ratedBy: "",
      minAverage: "",
      maxAverage: "",
    });
    fetchAllEmployeeRatings(1);
  };

  const handlePageChange = (pageNumber) => {
    setPagination((prev) => ({ ...prev, currentPage: pageNumber }));
    fetchAllEmployeeRatings(pageNumber);
  };

  const renderPagination = () => {
    const { totalPages, currentPage } = pagination;
    let items = [];

    if (totalPages <= 1) return null;

    // Limit the number of pagination items
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > 5) {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 2 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    return (
      <Pagination className="justify-content-center my-4">
        {currentPage > 1 && (
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
        )}
        {items}
        {currentPage < totalPages && (
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
        )}
      </Pagination>
    );
  };

  return (
    <div className="p-3 pt-1">
    <Container className="my-4 hm-team-member-reviews">
      <ToastContainer position="top-right" autoClose={5000} />
      <Row>
        <Col>
          <h2 className="mt-4">Detailed Ratings</h2>
          {ratings.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Emp ID</th>
                  <th> Name</th>
                  <th> Designation</th>
                  <th>Rated By</th>
                  <th>Rater ID</th>
                  <th>Rater Designation</th>
                  <th>Average Rating</th>
                  <th>Comments</th>
                  <th>Submitted On</th>
                  <th>For Year/Month</th>
                  <th>Detail Rating</th>
                </tr>
              </thead>
              <tbody>
                {ratings.map((rating, index) => (
                  <tr key={rating._id}>
                    <td>{index + 1 + (pagination.currentPage - 1) * 20}</td>
                    <td>{rating.ratedTo?.employee_Id || "N/A"}</td>
                    <td>
                      {rating.ratedTo
                        ? `${rating.ratedTo.first_Name} ${rating.ratedTo.last_Name}`
                        : "N/A"}
                    </td>
                    <td>{rating.ratedTo?.designation || "N/A"}</td>
                    <td>
                      {rating.ratedBy
                        ? `${rating.ratedBy.first_Name} ${rating.ratedBy.last_Name}`
                        : "N/A"}
                    </td>
                    <td>{rating.ratedBy?.employee_Id || "N/A"}</td>
                    <td>{rating.ratedBy?.designation || "N/A"}</td>
                    <td>{rating.averageRating} / 5</td>
                    <td>{rating.comments || "N/A"}</td>
                    <td>{new Date(rating.createdAt).toLocaleString()}</td>
                    <td>
                      {rating.year}/{rating.month}
                    </td>
                    <td className="text-center">
                      {rating.ratedTo ? (
                        <Link
                          to={`/dashboard/employee/ratings/${rating.ratedTo._id}`}
                          className="btn btn-info btn-sm"
                        >
                          <FaEye /> View
                        </Link>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No detailed ratings available.</p>
          )}
        </Col>
      </Row>
      {renderPagination()}
    </Container>
    </div>
  );
};

export default AllEmployeeRatings;
