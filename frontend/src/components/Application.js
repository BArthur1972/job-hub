import React from "react";
import { FaHourglassHalf, FaBuilding, FaFileAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Card, Form, Image } from "react-bootstrap";

const statusColors = {
  Interested: "#8b8b8b", // gray-400
  Applied: "#3b82f6", // blue-500
  Interview: "#eab308", // yellow-500
  Offer: "#22c55e", // green-500
  Rejected: "#ef4444", // red-500
};

const Application = ({
  id,
  companyName,
  jobTitle,
  status,
  location,
  onUpdateStatus,
}) => {
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    onUpdateStatus(id, newStatus);
  };

  const logoURL = `https://logo.clearbit.com/${companyName
    .toLowerCase()
    .replace(/\s+/g, "")}.com?size=70`;

  return (
    <Card className="mb-4">
      <Card.Body className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <Image
            src={logoURL}
            onError={(e) => (e.currentTarget.src = "path/to/default/logo.png")}
            alt={`${companyName} Logo`}
            className="me-4 rounded"
            width={48}
            height={48}
          />
          <div>
            <Card.Title className="text-md text-gray-600 truncate">
              {jobTitle}
            </Card.Title>
            <Card.Text className="text-sm text-gray-600 d-flex align-items-center">
              <FaBuilding className="me-2" /> {companyName}
            </Card.Text>
            <Card.Text className="text-xs text-gray-600 d-flex align-items-center">
              <FaLocationDot className="me-2" /> {location}
            </Card.Text>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center mt-3 mt-md-0">
          <span
            className="text-xl me-md-4 d-flex align-items-center"
            style={{ color: statusColors[status] }}
          >
          </span>
          {/** Only show the status. THey should not be able to change it */}
          <Form.Label className="text-sm text-gray-600">Status: {status}</Form.Label>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Application;
