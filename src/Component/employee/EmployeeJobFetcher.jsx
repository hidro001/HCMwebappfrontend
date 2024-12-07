import { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  CircularProgress,
  Alert,
  Container,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const EmployeeJobFetcher = () => {
  const [pendingJobs, setPendingJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Fetch pending jobs
  const fetchPendingJobs = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setError("Access token is missing");
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.get(
        "https://apiv2.humanmaximizer.com/api/v1/superadmin/jobs/vacant",
        config
      );
      setPendingJobs(response.data.data);
      setFilteredJobs(response.data.data);
    } catch (err) {
      console.error("Error fetching pending jobs: ", err);
      setError("Failed to fetch pending jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingJobs();
  }, []);

  // Handle filtering
  useEffect(() => {
    let jobs = [...pendingJobs];

    if (departmentFilter !== "All") {
      jobs = jobs.filter((job) => job.department === departmentFilter);
    }

    if (statusFilter !== "All") {
      jobs = jobs.filter((job) => job.status === statusFilter);
    }

    setFilteredJobs(jobs);
  }, [departmentFilter, statusFilter, pendingJobs]);

  // Get unique departments for filter options
  const departments = [
    "All",
    ...new Set(pendingJobs.map((job) => job.department)),
  ];

  const columns = [
    { field: "department", headerName: "Department", flex: 1 },
    { field: "designation", headerName: "Designation", flex: 1 },
    { field: "budget", headerName: "Budget", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "jobDescription",
      headerName: "Job Description",
      flex: 2,
      renderCell: (params) =>
        params.value.length > 100
          ? `${params.value.substring(0, 100)}...`
          : params.value,
    },
    {
      field: "viewJD",
      headerName: "Job Details",
      flex: 1,
      renderCell: (params) =>
        params.value ? (
          <Button
            variant="contained"
            color="primary"
            href={params.value}
            target="_blank"
            rel="noopener noreferrer"
          >
            View PDF
          </Button>
        ) : (
          "N/A"
        ),
    },
  ];

  const rows = filteredJobs.map((job) => ({
    id: job._id,
    department: job.department,
    designation: job.designation,
    budget: job.budget || "N/A",
    status: job.status,
    jobDescription: job.jobDescription || "N/A",
    viewJD: job.img || null,
  }));

  return (
    <div className="main">
      <div className="ems-content p-5 hm-job-vacancies ">
        <Container maxWidth="lg">
          <Typography variant="h4" component="h1" gutterBottom>
            <b>Job Vacancies</b>
          </Typography>

          {error && (
            <Alert severity="error" style={{ marginBottom: "16px" }}>
              {error}
            </Alert>
          )}

          {loading ? (
            <Box display="flex" justifyContent="center" mt={5}>
              <CircularProgress />
            </Box>
          ) : (
            <Card>
              <CardContent>
                {/* Filters */}
                <Box
                  display="flex"
                  flexDirection={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  mb={2}
                >
                  <FormControl
                    variant="outlined"
                    style={{ minWidth: 200, marginBottom: 16 }}
                  >
                    <InputLabel>Department</InputLabel>
                    <Select
                      value={departmentFilter}
                      onChange={(e) => setDepartmentFilter(e.target.value)}
                      label="Department"
                    >
                      {departments.map((dept) => (
                        <MenuItem key={dept} value={dept}>
                          {dept}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl
                    variant="outlined"
                    style={{ minWidth: 200, marginBottom: 16 }}
                  >
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      label="Status"
                    >
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="vacant">Vacant</MenuItem>
                      <MenuItem value="filled">Filled</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {filteredJobs.length > 0 ? (
                  <div style={{ height: 500, width: "100%" }}>
                    <DataGrid
                      rows={rows}
                      columns={columns}
                      pageSizeOptions={[5, 10, 20]}
                      initialState={{
                        pagination: {
                          paginationModel: { pageSize: 5 },
                        },
                      }}
                      disableRowSelectionOnClick
                    />
                  </div>
                ) : (
                  <Typography>No job vacancies available.</Typography>
                )}
              </CardContent>
            </Card>
          )}
        </Container>
      </div>
    </div>
  );
};

export default EmployeeJobFetcher;
