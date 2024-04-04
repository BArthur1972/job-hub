import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdditionalInfo from './pages/AdditionalInfo';
import RecruiterDashboard from './pages/RecruiterDashboard';
import AllJobs from './pages/AllJobs';
import JobApplication from './pages/JobApplications';
import NewJobPosting from './pages/NewJobPosting';
import JobPostings from './pages/RecuiterJobPosting';
import ApplicantListPage from './pages/ApplicantListPage';
import LandingPage from './pages/LandingPage';
import Account from './pages/Account';

function App() {
	const { user, userRole } = useSelector((state) => state.user);

	return (
		<BrowserRouter>
			<Navigation />
			<Routes>
				<Route path="/" element={<LandingPage />} />
				{/* Conditionally render the login and signup pages depending on the presence of a user */}
				{!user && (
					<>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
					</>
				)}

				{/* Conditionally render the dashboard depending on the user role */}
				{userRole === 'jobseeker' && (
					<>
						<Route path="/additional-info" element={<AdditionalInfo />} />
						<Route path="/jobseekerdashboard" element={<JobSeekerDashboard />} />
						<Route path='/all-jobs' element={<AllJobs />} />
						<Route path='/job-applications' element={<JobApplication />} />
					</>

				)}
				{userRole === 'recruiter' && (
					<>
						<Route path="/recruiterdashboard" element={<RecruiterDashboard />} />
						<Route path="/new-job-posting" element={<NewJobPosting />} />
						<Route path="/job-posting" element={<JobPostings />} />
						<Route path="/job-applicant" element={<ApplicantListPage />} />
					</>
				)}
				<Route path="/account" element={<Account />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
