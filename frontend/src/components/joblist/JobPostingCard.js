import React, { useState } from "react";
import { MdExpandMore } from "react-icons/md";
import { Card, Badge, Button, Row, Col } from "react-bootstrap";

const generateLogoUrl = (companyName) =>
  `https://logo.clearbit.com/${companyName.toLowerCase()}.com?size=70`;

const JobPostingCard = ({
  companyName,
  jobTitle,
  fields,
  experienceLevels,
  locations,
  postedDate,
  jobType,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => setIsExpanded(!isExpanded);

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
              <strong>Field(s):</strong> {fields}
            </p>
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
                onClick={() => console.log("Applying to", companyName)}
              >
                Apply Now
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

export default JobPostingCard;
