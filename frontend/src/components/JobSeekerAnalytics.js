import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useGetAllApplicationsMutation } from "../services/appApi";

function JobSeekerAnalytics() {
  const user = useSelector((state) => state.user);
  const [getAllApplications] = useGetAllApplicationsMutation();
  const [applications, setApplications] = useState([]);
  const [applicationStatusCount, setapplicationStatusCount] = useState({
    Applied: 0,
    Interviewing: 0,
    Hired: 0,
    Rejected: 0,
  });
  const [employmentTypeCounts, setEmploymentTypeCounts] = useState({
    "Full-Time": 0,
    "Part-Time": 0,
    Contract: 0,
    Internship: 0,
  });

  useEffect(() => {
    const fetchApplications = async () => {
      const response = await getAllApplications(user?.seekerID);
      setApplications(response.data);
    };

    const fetchapplicationStatusCount = () => {
      const counts = {applicationStatusCount };
      applications.forEach((application) => {
        counts[application.status] = (counts[application.status] || 0) + 1;
      });
      setapplicationStatusCount(counts);
    };

    const fetchEmploymentTypeCounts = () => {
      const counts = {employmentTypeCounts };
      applications.forEach((application) => {
        counts[application.employmentType] =
          (counts[application.employmentType] || 0) + 1;
      });
      setEmploymentTypeCounts(counts);
    };

    fetchApplications();
    fetchapplicationStatusCount();
    fetchEmploymentTypeCounts();
  }, [
    getAllApplications,
    user?.seekerID,
    applications,
    applicationStatusCount,
    employmentTypeCounts,
  ]);

  const applicationStatusData = Object.entries(applicationStatusCount)
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({
      name,
      value,
    }));

  const employmentTypeData = Object.entries(employmentTypeCounts)
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({
      name,
      value,
    }));

  const renderLabel = (entry) => {
    return `${entry.name} (${entry.value})`;
  };

  // Define custom colors for each slice
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const checkForData = () => {
    return applicationStatusData.length > 0 && employmentTypeData.length > 0;
  };


  return (
    checkForData() && (
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <h3 style={{ fontSize: "1.75rem", fontWeight: "bold" }}>
            Your Insights
          </h3>
        </div>
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#e0e0e0",
            margin: "1.5rem 0",
          }}
        ></div>
        <Row>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <span
                style={{
                  marginRight: "1rem",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                What's the status of your current Applications?
              </span>
              <span
                style={{
                  marginRight: "1rem",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                (Total Nō: {applications.length})
              </span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={applicationStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  activeShape="red"
                  label={renderLabel}
                >
                  {applicationStatusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Row>
        <div
          style={{
            width: "100%",
            height: "1px",
            backgroundColor: "#e0e0e0",
            margin: "1.5rem 0",
          }}
        ></div>
        <Row>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <span
                style={{
                  marginRight: "1rem",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                Which employment types are you applying to?
              </span>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={employmentTypeData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  activeShape="red"
                  label={renderLabel}
                >
                  {employmentTypeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Row>
      </Container>
    )
  );
}

export default JobSeekerAnalytics;
