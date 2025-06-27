import { Helmet } from 'react-helmet-async';
import Navbar from './components/Navbar';
import GradientHero from './components/GradientHero';
import FeaturedActivities from './components/FeaturedActivities';
import FeaturedStays from './components/FeaturedStays';
import FeaturedBlog from './components/FeaturedBlog';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Helmet>
        <title>Trebound | Premium Team Building & Corporate Events Solutions</title>
        <meta 
          name="description" 
          content="Trebound is your trusted partner for exceptional team building experiences and corporate events. We create transformative experiences that strengthen teams and drive success."
        />
        <meta name="keywords" content="team building, corporate events, team activities, virtual team building, corporate training" />
        <meta property="og:title" content="Trebound | Premium Team Building Solutions" />
        <meta property="og:description" content="350+ unique team building experiences for any budget & team size" />
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navbar />
        <GradientHero />
        <FeaturedActivities />
        <FeaturedStays />
        <FeaturedBlog />
        {/* Contact Form Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContactForm />
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
}

export default App;
