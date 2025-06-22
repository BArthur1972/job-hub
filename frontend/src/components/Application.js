import React from "react";
import { FaBuilding, FaCalendarTimes } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Card, Form } from "react-bootstrap";
import WithdrawApplicationModal from "./WithdrawApplicationModal";
import { IoSkullOutline } from "react-icons/io5";

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
  dateApplied,
  onUpdateStatus,
}) => {
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    onUpdateStatus(id, newStatus);
  };

  function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  return (
    <Card className="mb-4">
      <Card.Body className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <IoSkullOutline size={50} className="rounded-circle" style={{paddingRight: "10px"}} />
          <div>
            <Card.Title className="text-md text-gray-600 truncate">
              {jobTitle}
            </Card.Title>
            <Card.Text className="text-sm text-gray-600 d-flex align-items-center">
              <FaBuilding className="me-2 text-primary" /> {companyName}
            </Card.Text>
            <Card.Text className="text-xs text-gray-600 d-flex align-items-center">
              <FaLocationDot className="me-2" /> {location}
            </Card.Text>
            <Card.Text className="text-xs text-gray-600">
              <FaCalendarTimes className="me-2" /> Applied on {formatDate(dateApplied)}
            </Card.Text>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center mt-3 mt-md-0">
          <span
            className="text-xl me-md-4 d-flex align-items-center"
            style={{ color: statusColors[status] }}
          >
          </span>
          <Form.Label className="text-sm text-gray-600">Status: {status}</Form.Label>
          <WithdrawApplicationModal jobID={id} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default Application;
