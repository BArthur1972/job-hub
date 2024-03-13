import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './components/Navigation';
import { Routes, Route } from 'react-router-dom';
import UserDashboard from './pages/UserDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdditionalInfo from './pages/AdditionalInfo';
import RecruiterDashboard from './pages/RecruiterDashboard';
import AllJobs from './pages/AllJobs';
import JobApplication from './pages/JobApplications';

function App() {
	return (
		<BrowserRouter>
			<Navigation />
				<Routes>
					<Route path="/userdashboard" element={<UserDashboard />} />
					<Route path="/recruiterdashboard" element={<RecruiterDashboard />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/additional-info" element={<AdditionalInfo />} />
					<Route path='/all-jobs' element={<AllJobs />} />
					<Route path='/job-applications' element={<JobApplication />} />
				</Routes>
		</BrowserRouter>
	);
}

export default App;
