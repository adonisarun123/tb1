import { Routes, Route } from 'react-router-dom';
import App from '../App';
import TeamOutings from '../pages/TeamOutings';
import TeamOutingDetail from '../pages/TeamOutingDetail';
import Stays from '../pages/Stays';
import ActivityDetail from '../pages/ActivityDetail';
import Activities from '../pages/Activities';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/team-outings" element={<TeamOutings />} />
      <Route path="/team-outings/:slug" element={<TeamOutingDetail />} />
      <Route path="/stays" element={<Stays />} />
      <Route path="/team-building-activity" element={<Activities />} />
      <Route path="/team-building-activity/:slug" element={<ActivityDetail />} />
    </Routes>
  );
};

export default AppRoutes; 