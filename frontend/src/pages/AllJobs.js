import React, { useState, useEffect } from "react";
import Job from "../components/Job";
import { Container, Row, Col, Form, Button, Spinner, Alert } from "react-bootstrap";
import { useGetAllJobListingsMutation, useGetCompanyByIdMutation } from "../services/appApi";

const AllJobs = () => {
	const [jobList, setJobList] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterStatus, setFilterStatus] = useState("Company");
	const [filteredJobs, setFilteredJobs] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [getAllJobListing] = useGetAllJobListingsMutation();
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
					setFilteredJobs(transformedJobs);
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

	const handleSearchChange = (event) => {
		setSearchTerm(event.target.value);
		const lowerCaseSearchTerm = event.target.value.toLowerCase();
		let filtered;
		switch (filterStatus) {
			case "Company":
				filtered = jobList.filter((job) =>
					job.companyName.toLowerCase().includes(lowerCaseSearchTerm)
				);
				break;
			case "Job Title":
				filtered = jobList.filter((job) =>
					job.jobTitle.toLowerCase().includes(lowerCaseSearchTerm)
				);
				break;
			case "Location":
				filtered = jobList.filter((job) =>
					job.locations.toLowerCase().includes(lowerCaseSearchTerm)
				);
				break;
			default:
				filtered = jobList;
		}
		setFilteredJobs(filtered);
	};

	const handleFilterChange = (event) => {
		setFilterStatus(event.target.value);
		// Reset search term and filter based on the new selection
		setSearchTerm("");
		setFilteredJobs(jobList);
	};

	return (
		<Container fluid className="h-100 p-0 d-flex justify-content-center align-items-center">
			<Col md={9} lg={11} className="p-4 overflow-auto">
				<div className="p-4">
					<Form className="mb-4 d-flex justify-content-between">
						<Form.Group className="flex-grow-1 me-4">
							<Form.Control
								type="text"
								placeholder="Search..."
								value={searchTerm}
								onChange={handleSearchChange}
							/>
						</Form.Group>
						<Form.Group className="w-auto">
							<Form.Select value={filterStatus} onChange={handleFilterChange}>
								<option value="Company">Company</option>
								<option value="Job Title">Job Title</option>
								<option value="Location">Location</option>
							</Form.Select>
						</Form.Group>
					</Form>

					{error && (
						<Alert variant="danger" className="mb-4">
							{error}
						</Alert>
					)}

					{loading ? (
						<div className="text-center">
							<Spinner animation="border" role="status">
								<span className="visually-hidden">Loading...</span>
							</Spinner>
						</div>
					) : (
						<Row>
							{filteredJobs.map((job, index) => (
								<Col key={index} md={6} lg={4} className="mb-4">
									<Job {...job} />
								</Col>
							))}
							{filteredJobs.length === 0 && (
								<Col>
									<p className="text-center">No jobs found matching your search criteria.</p>
								</Col>
							)}
						</Row>
					)}
				</div>
			</Col>
		</Container>
	);
};

export default AllJobs;
