import React, { useState, useEffect } from "react";
import Job from "../components/Job";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import { jobPostings } from "./data/jobs";
import {
  useGetAllJobListingsMutation,
  useGetCompanyByIdMutation,

} from "../services/appApi";

const AllJobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [getAllJobListings] = useGetAllJobListingsMutation();
  const [getCompanyById] = useGetCompanyByIdMutation();


  const fetchCompanyName = async (companyID) => {
    try {
      const response = await getCompanyById(Number(companyID));
      if (response && response.data) {
        return response.data[0].companyName;
      }
      return "Unknown Company";
    } catch (error) {
      console.error("Error fetching company name:", error);
      return "Unknown Company";
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAllJobListings();
        if (response.data) {
          const transformedJobs = await Promise.all(
            response.data.map(async (job) => ({
              jobID: job.jobID,
              companyName: await fetchCompanyName(job.companyID),
              jobTitle: job.jobTitle,
              experienceLevels: job.experienceRequired,
              locations: job.location,
              postedDate: new Date(job.postingDate).toDateString(),
              jobType: job.employmentType,
            }))
          );
          setFilteredJobs(transformedJobs);
        }
      } catch (error) {
        console.error("Error fetching job listings:", error);
      }
    };

    fetchJobs();
  }, [getAllJobListings]);

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
                <Job {...job} />
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
