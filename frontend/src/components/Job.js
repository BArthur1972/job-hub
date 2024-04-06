import React, { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { Card, Badge, Button, Row, Col } from "react-bootstrap";
import {
  useGetAllJobListingsMutation,
  useGetCompanyByIdMutation,
  useCreateApplicationMutation,
} from "../services/appApi";

import { useSelector } from "react-redux";

const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format the date as 'YYYY-MM-DD HH:MM:SS'

const Job = ({
  jobID,
  companyName,
  jobTitle,
  experienceLevels,
  locations,
  postedDate,
  jobType,
}) => {
  const generateLogoUrl = (companyName) => {
    return `https://logo.clearbit.com/${companyName}.com`;
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  const { user } = useSelector((state) => state.user);

  const [createApplication] = useCreateApplicationMutation();

  const handleApply = async () => {
    const application = {
      seekerID: user.seekerID,
      jobID: jobID,
      status: "Applied",
      dateApplied: currentDate,
    };

    await createApplication(application).then((response) => {
      if (response && response.data) {
        console.log("Application submitted successfully");
        console.log(response.data);
        alert("Application submitted successfully");
      } else if (response.error) {
        console.log("Error submitting application");
        console.log(response.error);
        alert(response.error.data.error);
      }
    });
  };

  return (
    <Card className="job-posting-card mb-4 bg-gray-200">
      <Card.Body>
        <Row className="align-items-center">
          <Col xs="auto">
            <img
              src={generateLogoUrl(companyName)}
              alt={`${companyName} Logo`}
              className="company-logo rounded"
            />
          </Col>
          <Col>
            <Card.Title>{companyName}</Card.Title>
            <Card.Text>{jobTitle}</Card.Text>
          </Col>

          <Col xs="auto" className="d-flex align-items-center">
            <Badge pill bg={jobType === "Intern" ? "primary" : "success"}>
              {jobType}
            </Badge>
            <Button
              variant="link"
              onClick={toggleExpanded}
              aria-expanded={isExpanded}
            >
              <MdExpandMore
                className={`toggle-icon ms-2 ${isExpanded ? "rotated" : ""}`}
              />
            </Button>
          </Col>
        </Row>

        {isExpanded && (
          <section className="expanded-info mt-3">
            <p>
              <strong>Experience Level(s):</strong> {experienceLevels}
            </p>
            <p>
              <strong>Location(s):</strong> {locations}
            </p>
            <p>
              <strong>Posted:</strong> {postedDate}
            </p>
            <div className="action-buttons mt-3">
              <Button
                variant="outline-primary"
                className="me-2"
                onClick={() => handleApply()}
              >
                Apply
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => console.log("Saved", companyName, "for later")}
              >
                Save for Later
              </Button>
            </div>
          </section>
        )}
      </Card.Body>
    </Card>
  );
};

export default Job;
