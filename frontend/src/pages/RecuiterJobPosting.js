import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Container, Row, Col, Form } from "react-bootstrap";
import { initialJobPostings } from "./data/recuiterJobPosting";
import JobPostCard from "../components/jobstatus/JobPostCard";


const JobPostings = () => {
  const [applications, setApplications] = useState(initialJobPostings);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");


  const [jobId, setJobId] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState([]);
  const [employmentType, setEmploymentType] = useState("");
  const [postingDate, setPostingDate] = useState("");
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [jobDescription, setJobDescription] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [skills, setSkills] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [experience, setExperience] = useState("");
  const [recruiterId, setRecruiterId] = useState("");





  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const filteredApplications = applications.filter((application) => {
    const matchSearchTerm =
      application.companyName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      application.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus
      ? application.status === filterStatus
      : true;
    return matchSearchTerm && matchStatus;
  });

  return (
    <Container fluid className="h-100 p-0 d-flex justify-content-center align-items-center">
      <Col md={9} lg={10} className="p-4 overflow-auto">
        <h3 className="text-4xl text-black font-bold mb-2">
          Your Job Postings
        </h3>
        <h5 className="text-black font-semibold mb-4">
          {filteredApplications.length} Total Job Postings
        </h5>
        <Form className="mb-4 d-flex justify-content-between">
          <Form.Group className="flex-grow-1 me-4">
            <Form.Control
              type="text"
              placeholder="Search by title or status..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form.Group>
          <Form.Group className="w-auto">
            <Form.Select value={filterStatus} onChange={handleFilterChange}>
              <option value="">All Statuses</option>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option> 
            </Form.Select>
          </Form.Group>
        </Form>
        {filteredApplications.length > 0 ? (
          filteredApplications.map((app, index) => (
            <JobPostCard
              key={index}
              {...app}
              onUpdateStatus={(id, newStatus) => {
                const updatedApplications = applications.map((application) => {
                  if (application.id === id) {
                    return { ...application, status: newStatus };
                  }
                  return application;
                });
                setApplications(updatedApplications);
              }}
            />
          ))
        ) : (
          <div className="d-flex flex-column align-items-center justify-content-center text-center p-4">
            <FaSearch size={32} className="mb-3" />
            <p>No applications found matching your search criteria.</p>
          </div>
        )}
      </Col>
    </Container>
  );
};

export default JobPostings;
