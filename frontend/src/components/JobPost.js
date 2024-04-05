import React from "react";
import { FaHourglassHalf, FaBuilding } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Card, Form, Image } from "react-bootstrap";
import { HiOutlineUsers } from "react-icons/hi2";
import { TbEyeSearch } from "react-icons/tb";
import { FaRegEyeSlash } from "react-icons/fa6";
import styles from './styles/JobPost.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const statusColors = {
  Open: "#22c55e", // green-500
  CLosed: "#ef4444", // red-500
};

const JobPost = ({
  id,
  companyName,
  jobTitle,
  status,
  location,
  applicants,
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
            <Card.Text className="text-xm text-gray-600 d-flex align-items-center">
              <FaLocationDot className="me-2" /> {location}
            </Card.Text>
            <Card.Text className="text-xs text-gray-600 d-flex align-items-center">
              <HiOutlineUsers className="me-2 fw-bold" /> Applicants:{" "}
              {applicants}
            </Card.Text>
          </div>
        </div>


  

<div className={styles.container}>
  <div className="m-3">
    <button className={`${styles.primary}`}>
      <i className="bi bi-pencil-square"></i>
      Edit
    </button>
    <button className={`${styles.danger}`}>
      <i className="bi bi-trash"></i>
      Delete
    </button>
  </div>

  <div className={styles.statusContainer}>
    <Form.Select
      value={status}
      onChange={handleStatusChange}
      className={styles.statusSelect}
    >
      <option value="Open">Open</option>
      <option value="Closed">Closed</option>
    </Form.Select>

   
  </div>

  <span className={styles.statusIcon} style={{ color: statusColors[status] }}>
      {status === "Open" ? <TbEyeSearch /> : <FaRegEyeSlash />}
    </span>

</div>
       


      </Card.Body>
    </Card>
  );
};

export default JobPost;
