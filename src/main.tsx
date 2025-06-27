import { StrictMode, useEffect, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { generateSitemap } from './utils/sitemapGenerator'
import './index.css'
import App from './App'
import { CombinedProvider } from './contexts/TeamOutingAdsContext'

// Simple placeholder components for pages that have complex dependencies
const SimplePage = ({ title, description }: { title: string; description: string }) => (
  <div className="min-h-screen bg-white">
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            {description}
          </p>
          <div className="mt-8">
            <a href="/" className="bg-gradient-to-r from-[#FF4C39] to-[#FFB573] text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-colors">
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Import all the proper page components
const ActivitiesPage = lazy(() => import('./pages/Activities'));
const AboutPage = lazy(() => import('./pages/About'));
const ContactPage = lazy(() => import('./pages/Contact'));
const StaysPage = lazy(() => import('./pages/Stays'));
const BlogPage = lazy(() => import('./pages/Blog'));
const JobsPage = lazy(() => import('./pages/Jobs'));

// Lazy load all other pages
const AmdocsPage = lazy(() => import('./pages/Amdocs'));
const BangaloreResortsPage = lazy(() => import('./pages/BangaloreResorts'));
const CampusToCorporatePage = lazy(() => import('./pages/CampusToCorporate'));
const CorporateGiftingPage = lazy(() => import('./pages/CorporateGifting'));
const CorporateTeamBuildingActivitiesPage = lazy(() => import('./pages/CorporateTeamBuildingActivities'));
const CorporateTeamBuildingGamesPage = lazy(() => import('./pages/CorporateTeamBuildingGames'));
const CorporateTeamOffsitePage = lazy(() => import('./pages/CorporateTeamOffsite'));
const CorporateTeamOutboundTrainingPage = lazy(() => import('./pages/CorporateTeamOutboundTraining'));
const CorporateTeamOutingBangalorePage = lazy(() => import('./pages/CorporateTeamOutingBangalore'));
const CorporateTeamOutingMumbaiPage = lazy(() => import('./pages/CorporateTeamOutingMumbai'));
const CorporateTeamOutingPlacesPage = lazy(() => import('./pages/CorporateTeamOutingPlaces'));
const CorporateTeamOutingPlacesBangalorePage = lazy(() => import('./pages/CorporateTeamOutingPlacesBangalore'));
const CorporateTeamOutingPlacesHyderabadPage = lazy(() => import('./pages/CorporateTeamOutingPlacesHyderabad'));
const CorporateTeamOutingsPage = lazy(() => import('./pages/CorporateTeamOutings'));
const CorporateTeambuildingPage = lazy(() => import('./pages/CorporateTeambuilding'));
const CustomizedTrainingPage = lazy(() => import('./pages/CustomizedTraining'));
const DestinationDetailPage = lazy(() => import('./pages/DestinationDetail'));
const DestinationsPage = lazy(() => import('./pages/Destinations'));
const FunIndoorTeamBuildingActivitiesPage = lazy(() => import('./pages/FunIndoorTeamBuildingActivities'));
const FunVirtualTeamBuildingGamesPage = lazy(() => import('./pages/FunVirtualTeamBuildingGames'));
const GlobalPartnerRegistrationPage = lazy(() => import('./pages/GlobalPartnerRegistration'));
const HighEngagementTeamBuildingPage = lazy(() => import('./pages/HighEngagementTeamBuilding'));
const HighEngagingActivitiesPage = lazy(() => import('./pages/HighEngagingActivities'));
const IcebreakerGamesPage = lazy(() => import('./pages/IcebreakerGames'));
const OneDayOutingBangalorePage = lazy(() => import('./pages/OneDayOutingBangalore'));
const OneDayOutingResortsHyderabadPage = lazy(() => import('./pages/OneDayOutingResortsHyderabad'));
const OnlineTeamBuildingActivitiesPage = lazy(() => import('./pages/OnlineTeamBuildingActivities'));
const OutboundGuidelinesPage = lazy(() => import('./pages/OutboundGuidelines'));
const OutboundTeamBuildingPage = lazy(() => import('./pages/OutboundTeamBuilding'));
const OutdoorTeamBuildingPage = lazy(() => import('./pages/OutdoorTeamBuilding'));
const OvernightTeamOutingNearBangalorePage = lazy(() => import('./pages/OvernightTeamOutingNearBangalore'));
const PlanYourTeamOffsiteTodayPage = lazy(() => import('./pages/PlanYourTeamOffsiteToday'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicy'));
const ResortsAroundBangalorePage = lazy(() => import('./pages/ResortsAroundBangalore'));
const ReturnToOfficePage = lazy(() => import('./pages/ReturnToOffice'));
const StayDetailPage = lazy(() => import('./pages/StayDetail'));
const TeamBuildingPage = lazy(() => import('./pages/TeamBuilding'));
const TeamBuildingActivitiesBangalorePage = lazy(() => import('./pages/TeamBuildingActivitiesBangalore'));
const TeamBuildingActivitiesMumbaiPage = lazy(() => import('./pages/TeamBuildingActivitiesMumbai'));
const TeamBuildingActivitiesSmallGroupsPage = lazy(() => import('./pages/TeamBuildingActivitiesSmallGroups'));
const TeamBuildingGamesPage = lazy(() => import('./pages/TeamBuildingGames'));
const TeamCollaborationGamesPage = lazy(() => import('./pages/TeamCollaborationGames'));
const TeamEngagementActivitiesPage = lazy(() => import('./pages/TeamEngagementActivities'));
const TeamOutingDetailPage = lazy(() => import('./pages/TeamOutingDetail'));
const TeamOutingPlacesBangalorePage = lazy(() => import('./pages/TeamOutingPlacesBangalore'));
const TeamOutingPlacesHyderabadPage = lazy(() => import('./pages/TeamOutingPlacesHyderabad'));
const TeamOutingRegionsPage = lazy(() => import('./pages/TeamOutingRegions'));
const TeamOutingsPage = lazy(() => import('./pages/TeamOutings'));
const TermsAndConditionsPage = lazy(() => import('./pages/TermsAndConditions'));
const ThankYouPage = lazy(() => import('./pages/ThankYou'));
const TopTeamBuildingActivitiesPage = lazy(() => import('./pages/TopTeamBuildingActivities'));
const TopTeamBuildingActivitiesLargeGroupsPage = lazy(() => import('./pages/TopTeamBuildingActivitiesLargeGroups'));
const VirtualEscapeRoomTeambuildingActivityTreboundPage = lazy(() => import('./pages/VirtualEscapeRoomTeambuildingActivityTrebound'));
const VirtualGuidelinesPage = lazy(() => import('./pages/VirtualGuidelines'));
const VirtualTeamBuildingPage = lazy(() => import('./pages/VirtualTeamBuilding'));
const VirtualTeamBuildingHolidayPage = lazy(() => import('./pages/VirtualTeamBuildingHoliday'));
const VirtualTeamBuildingIcebreakerGamesPage = lazy(() => import('./pages/VirtualTeamBuildingIcebreakerGames'));
const WhyChooseTreboundPage = lazy(() => import('./pages/WhyChooseTrebound'));
const ActivityDetailPage = lazy(() => import('./pages/ActivityDetail'));
const BlogPostPage = lazy(() => import('./pages/BlogPost'));

const emotionCache = createCache({ key: 'css' });

// Loading component for better UX during route transitions
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#FF4C39] border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

const SitemapComponent = () => {
  useEffect(() => {
    const fetchSitemap = async () => {
      try {
        const sitemap = await generateSitemap();
        const blob = new Blob([sitemap], { type: 'application/xml' });
        const url = window.URL.createObjectURL(blob);
        window.location.href = url;
      } catch (error) {
        console.error('Error generating sitemap:', error);
      }
    };
    fetchSitemap();
  }, []);
  return null;
};

const Root = () => (
  <StrictMode>
    <CacheProvider value={emotionCache}>
      <HelmetProvider>
        <CombinedProvider>
          <Router>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Main Pages */}
                <Route path="/" element={<App />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/activities" element={<ActivitiesPage />} />
                <Route path="/team-building-activity" element={<ActivitiesPage />} />
                <Route path="/stays" element={<StaysPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/jobs" element={<JobsPage />} />
                
                {/* Activity and Detail Pages */}
                <Route path="/activity/:slug" element={<ActivityDetailPage />} />
                <Route path="/team-building-activity/:slug" element={<ActivityDetailPage />} />
                <Route path="/stay/:slug" element={<StayDetailPage />} />
                <Route path="/stays/:slug" element={<StayDetailPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/team-building/:slug" element={<TeamBuildingPage />} />
                <Route path="/customized-training/:slug" element={<CustomizedTrainingPage />} />
                <Route path="/corporate-teambuilding/:slug" element={<CorporateTeambuildingPage />} />
                
                {/* Corporate Pages */}
                <Route path="/amdocs" element={<AmdocsPage />} />
                <Route path="/corporate-gifting" element={<CorporateGiftingPage />} />
                <Route path="/corporate-team-building-activities" element={<CorporateTeamBuildingActivitiesPage />} />
                <Route path="/corporate-team-building-games" element={<CorporateTeamBuildingGamesPage />} />
                <Route path="/corporate-team-offsite" element={<CorporateTeamOffsitePage />} />
                <Route path="/corporate-team-outbound-training" element={<CorporateTeamOutboundTrainingPage />} />
                <Route path="/corporate-team-outing-bangalore" element={<CorporateTeamOutingBangalorePage />} />
                <Route path="/corporate-team-outing-mumbai" element={<CorporateTeamOutingMumbaiPage />} />
                <Route path="/corporate-team-outing-places" element={<CorporateTeamOutingPlacesPage />} />
                <Route path="/corporate-team-outing-places-bangalore" element={<CorporateTeamOutingPlacesBangalorePage />} />
                <Route path="/corporate-team-outing-places-hyderabad" element={<CorporateTeamOutingPlacesHyderabadPage />} />
                <Route path="/corporate-team-outings" element={<CorporateTeamOutingsPage />} />
                <Route path="/corporate-teambuilding" element={<CorporateTeambuildingPage />} />
                
                {/* Team Building Pages */}
                <Route path="/team-building" element={<TeamBuildingPage />} />
                <Route path="/team-building-activities-bangalore" element={<TeamBuildingActivitiesBangalorePage />} />
                <Route path="/team-building-activities-mumbai" element={<TeamBuildingActivitiesMumbaiPage />} />
                <Route path="/team-building-activities-small-groups" element={<TeamBuildingActivitiesSmallGroupsPage />} />
                <Route path="/team-building-games" element={<TeamBuildingGamesPage />} />
                <Route path="/team-collaboration-games" element={<TeamCollaborationGamesPage />} />
                <Route path="/team-engagement-activities" element={<TeamEngagementActivitiesPage />} />
                <Route path="/top-team-building-activities" element={<TopTeamBuildingActivitiesPage />} />
                <Route path="/top-team-building-activities-large-groups" element={<TopTeamBuildingActivitiesLargeGroupsPage />} />
                
                {/* Virtual Team Building */}
                <Route path="/virtual-team-building" element={<VirtualTeamBuildingPage />} />
                <Route path="/virtual-team-building-holiday" element={<VirtualTeamBuildingHolidayPage />} />
                <Route path="/virtual-team-building-icebreaker-games" element={<VirtualTeamBuildingIcebreakerGamesPage />} />
                <Route path="/virtual-escape-room-teambuilding-activity-trebound" element={<VirtualEscapeRoomTeambuildingActivityTreboundPage />} />
                <Route path="/fun-virtual-team-building-games" element={<FunVirtualTeamBuildingGamesPage />} />
                <Route path="/online-team-building-activities" element={<OnlineTeamBuildingActivitiesPage />} />
                <Route path="/virtual-guidelines" element={<VirtualGuidelinesPage />} />
                
                {/* Indoor/Outdoor Activities */}
                <Route path="/fun-indoor-team-building-activities" element={<FunIndoorTeamBuildingActivitiesPage />} />
                <Route path="/outdoor-team-building" element={<OutdoorTeamBuildingPage />} />
                <Route path="/outbound-team-building" element={<OutboundTeamBuildingPage />} />
                <Route path="/outbound-guidelines" element={<OutboundGuidelinesPage />} />
                <Route path="/icebreaker-games" element={<IcebreakerGamesPage />} />
                
                {/* Location-specific Pages */}
                <Route path="/bangalore-resorts" element={<BangaloreResortsPage />} />
                <Route path="/resorts-around-bangalore" element={<ResortsAroundBangalorePage />} />
                <Route path="/one-day-outing-bangalore" element={<OneDayOutingBangalorePage />} />
                <Route path="/one-day-outing-resorts-hyderabad" element={<OneDayOutingResortsHyderabadPage />} />
                <Route path="/overnight-team-outing-near-bangalore" element={<OvernightTeamOutingNearBangalorePage />} />
                <Route path="/team-outing-places-bangalore" element={<TeamOutingPlacesBangalorePage />} />
                <Route path="/team-outing-places-hyderabad" element={<TeamOutingPlacesHyderabadPage />} />
                <Route path="/team-outing-regions" element={<TeamOutingRegionsPage />} />
                <Route path="/team-outings" element={<TeamOutingsPage />} />
                <Route path="/destinations" element={<DestinationsPage />} />
                <Route path="/destination/:slug" element={<DestinationDetailPage />} />
                
                {/* Engagement & Training */}
                <Route path="/high-engagement-team-building" element={<HighEngagementTeamBuildingPage />} />
                <Route path="/high-engaging-activities" element={<HighEngagingActivitiesPage />} />
                <Route path="/customized-training" element={<CustomizedTrainingPage />} />
                <Route path="/campus-to-corporate" element={<CampusToCorporatePage />} />
                <Route path="/return-to-office" element={<ReturnToOfficePage />} />
                <Route path="/plan-your-team-offsite-today" element={<PlanYourTeamOffsiteTodayPage />} />
                
                {/* Other Pages */}
                <Route path="/global-partner-registration" element={<GlobalPartnerRegistrationPage />} />
                <Route path="/why-choose-trebound" element={<WhyChooseTreboundPage />} />
                <Route path="/team-outing-detail/:slug" element={<TeamOutingDetailPage />} />
                <Route path="/thank-you" element={<ThankYouPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
                
                {/* Utility Routes */}
                <Route path="/sitemap.xml" element={<SitemapComponent />} />
                
                {/* Catch-all route for any unmatched paths */}
                <Route path="*" element={<SimplePage title="Page Not Found" description="The page you're looking for doesn't exist. Let's get you back on track." />} />
              </Routes>
            </Suspense>
          </Router>
        </CombinedProvider>
      </HelmetProvider>
    </CacheProvider>
  </StrictMode>
);

createRoot(document.getElementById('root')!).render(<Root />);
