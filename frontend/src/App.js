import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import { Routes, Route } from 'react-router-dom';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdditionalInfo from './pages/AdditionalInfo';
import RecruiterDashboard from './pages/RecruiterDashboard';
import AllJobs from './pages/AllJobs';
import JobApplication from './pages/JobApplications';
import NewJobPosting from './pages/NewJobPosting';
import JobPostings from './pages/RecuiterJobPosting';
import ApplicantListPage from './pages/RecuiterApplicatant';
import LandingPage from './pages/LandingPage';
import Account from './pages/Account';

function App() {
	return (
		<BrowserRouter>
			<Navigation />
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/jobseekerdashboard" element={<JobSeekerDashboard />} />
					<Route path="/recruiterdashboard" element={<RecruiterDashboard />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/account" element={<Account />} />
					<Route path="/additional-info" element={<AdditionalInfo />} />
					<Route path='/all-jobs' element={<AllJobs />} />
					<Route path='/job-applications' element={<JobApplication />} />
					<Route path="/new-job-posting" element={<NewJobPosting />} />
					<Route path="/job-posting" element={<JobPostings />} />
					<Route path="/job-applicatant" element={<ApplicantListPage />} />
				</Routes>
		</BrowserRouter>
	);
}

export default App;
