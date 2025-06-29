import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StayDetail from './pages/StayDetail';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost/index';
import CorporateTeamOutingPlacesHyderabad from './pages/CorporateTeamOutingPlacesHyderabad';
import AIAdminDashboard from './pages/AIAdminDashboard';
import AITesting from './components/AITesting';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stay/:staySlug" element={<StayDetail />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:blogSlug" element={<BlogPost />} />
      <Route path="/corporate-team-outing-places-in-hyderabad" element={<CorporateTeamOutingPlacesHyderabad />} />
      <Route path="/ai-dashboard" element={<AIAdminDashboard />} />
      <Route path="/ai-testing" element={<AITesting />} />
    </Routes>
  );
};

export default AppRoutes; 