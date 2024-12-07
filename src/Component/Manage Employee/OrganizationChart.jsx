import React, { useState, useEffect } from "react";
import Tree from "./mytree";

const App = () => {
  const [nodes, setNodes] = useState([]);
  const [clinks, setClinks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(
          "https://apiv2.humanmaximizer.com/api/v1/superadmin/employees",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const result = await response.json();
        if (result.success) {
          const mappedNodes = [];
          const generatedClinks = [];

          result.data.forEach((employee) => {
            // Handle primary parent (pid) assignment
            const primaryParent = employee.assigned_to?.[0]?._id || null;

            mappedNodes.push({
              id: employee._id,
              pid: primaryParent,
              name:
                `${employee.first_Name || ""} ${
                  employee.last_Name || ""
                }`.trim() || "No Name",
              title: employee.designation || employee.department || "No Title",
              department: employee.department || "No Title",
              role: employee.user_Role || "No Title",
              emp_id: employee.employee_Id || "No Title",
              img: employee.user_Avatar || "https://via.placeholder.com/100",
            });

            // Handle additional links (clinks) for non-primary parents
            if (employee.assigned_to && employee.assigned_to.length > 1) {
              employee.assigned_to.forEach((parent) => {
                if (parent._id !== primaryParent) {
                  generatedClinks.push({
                    from: parent._id,
                    to: employee._id,
                    template: "simple",
                  });
                }
              });
            }
          });

          setNodes(mappedNodes);
          setClinks(generatedClinks);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Tree nodes={nodes} clinks={clinks} />
    </div>
  );
};

export default App;
