import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Job from "../components/Job";
import { useSelector } from "react-redux";
import { useGetAllJobListingsMutation, useGetCompanyByIdMutation } from "../services/appApi";

function JobSeekerDashboard() {
  const { user } = useSelector((state) => state.user);
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [getAllJobListing] = useGetAllJobListingsMutation();
  const [getCompanyById] = useGetCompanyByIdMutation();

  const fetchCompanyName = async (companyID) => {
    try {
      const response = await getCompanyById(Number(companyID));
      if (response && response.data && response.data.length > 0) {
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
      setLoading(true);
      setError(null);
      try {
        const response = await getAllJobListing();
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
          setJobList(transformedJobs);
        }
      } catch (error) {
        console.error("Error fetching job listings:", error);
        setError("Error fetching job listings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [getAllJobListing, getCompanyById]);

  return (
    <Container fluid className="d-flex justify-content-center align-items-center">
      <Col md={9} lg={12} className="p-4 overflow-auto">
        <Container fluid>
          <Row className="mb-5">
            <Col className="text-center text-md-left">
              <h1 className="text-4xl text-black font-bold mb-2">
                Welcome Back {user.firstName}!
              </h1>
              <p className="text-black font-medium">
                Find exciting new opportunities tailored to your preferences.
              </p>
              <div className="d-flex flex-column flex-md-row align-items-center justify-content-center mt-5 gap-3 p-3">
                <div className="ms-md-5">
                  <Link to="/all-jobs" className="btn btn-primary rounded-pill">
                    View More Jobs
                  </Link>
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xs={12}>
              <h4 className="text-2xl text-black font-bold mb-3">Your Top Matches</h4>
              {loading && (
                <div className="text-center">
                  <Spinner animation="border" variant="primary" />
                </div>
              )}
              {error && <p className="text-danger">{error}</p>}
              <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                {jobList.map((job, index) => (
                  <Col key={index}>
                    <div>
                      <Job {...job} />
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </Col>
    </Container>
  );
}

export default JobSeekerDashboard;
