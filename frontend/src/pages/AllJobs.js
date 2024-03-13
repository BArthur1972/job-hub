import React, { useState } from "react";
import JobPostingCard from "../components/joblist/JobPostingCard";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { jobPostings } from "./data/jobs";

const AllJobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobPostings);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = jobPostings.filter(
      (job) =>
        job.companyName.toLowerCase().includes(query) ||
        job.jobTitle.toLowerCase().includes(query)
    );
    setFilteredJobs(filtered);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredJobs(jobPostings);
  };

  return (
    <Container
      fluid
      className="h-100 p-0 d-flex justify-content-center align-items-center"
    >
      <Col md={9} lg={11} className="p-4 overflow-auto">
        <div className="p-4">
          <Form.Group className="mb-4">
            <InputGroup>
              <Form.Control
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search by company or job title..."
              />
              <InputGroup.Text>
                <Button
                  variant="outline-secondary"
                  onClick={clearSearch}
                  aria-label="Clear search"
                >
                  X
                </Button>
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Row>
            {filteredJobs.map((job, index) => (
              <Col key={index} md={6} lg={4} className="mb-4">
                <JobPostingCard {...job} />
              </Col>
            ))}
            {filteredJobs.length === 0 && (
              <Col>
                <p>No jobs found matching your search criteria.</p>
              </Col>
            )}
          </Row>
        </div>
      </Col>
    </Container>
  );
};

export default AllJobs;
