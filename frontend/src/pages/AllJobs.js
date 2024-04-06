import React, { useState, useEffect } from "react";
import Job from "../components/Job";
import { Container, Row, Col, Form, Button, InputGroup, Spinner, Alert } from "react-bootstrap";
import { useGetAllJobListingsMutation, useGetCompanyByIdMutation } from "../services/appApi";

const AllJobs = () => {
	const [jobList, setJobList] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
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
	}, [getAllJobListing, getCompanyById, fetchCompanyName]);

	const handleSearch = (event) => {
		const query = event.target.value.toLowerCase();
		setSearchQuery(query);
		const filtered = jobList.filter((job) =>
			job.companyName.toLowerCase().includes(query) || job.jobTitle.toLowerCase().includes(query)
		);
		setFilteredJobs(filtered);
	};

	const clearSearch = () => {
		setSearchQuery("");
		setFilteredJobs(jobList);
	};

	return (
		<Container fluid className="h-100 p-0 d-flex justify-content-center align-items-center">
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
								<Button variant="outline-secondary" onClick={clearSearch} aria-label="Clear search">
									X
								</Button>
							</InputGroup.Text>
						</InputGroup>
					</Form.Group>

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