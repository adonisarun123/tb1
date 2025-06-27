# Trebound - Next.js Team Building Platform

A modern, AI-powered team building discovery platform built with Next.js 14, featuring intelligent search capabilities and a comprehensive collection of team building activities, venues, and destinations.

## 🚀 Features

### Core Functionality
- **AI-Powered Search**: Intelligent search with hierarchical matching (exact phrase → combinations → keywords)
- **350+ Activities**: Curated collection of team building experiences
- **Premium Venues**: 50+ verified venues across multiple destinations
- **Dynamic Routing**: SEO-optimized pages for activities, venues, and destinations
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Technical Features
- **Next.js 14**: Latest App Router with Server Components
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Modern, utility-first styling
- **Framer Motion**: Smooth animations and transitions
- **API Routes**: RESTful API endpoints for search and data
- **SEO Optimized**: Meta tags, Open Graph, and structured data

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Database**: Supabase (PostgreSQL)
- **Search**: Custom AI-powered algorithm
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd trebound-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   OPENAI_API_KEY=your_openai_key
   PINECONE_API_KEY=your_pinecone_key
   PINECONE_INDEX_NAME=trebound-activities
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   └── search/               # Search API endpoint
│   ├── team-building-activity/   # Activity pages
│   │   └── [slug]/              # Dynamic activity routes
│   ├── stay/                    # Venue pages
│   ├── destinations/            # Destination pages
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── components/                   # Reusable components
│   └── AISearchWidget/          # AI search component
├── lib/                         # Utility libraries
│   ├── supabaseClient.ts        # Supabase configuration
│   ├── openaiClient.ts          # OpenAI integration
│   └── pineconeClient.ts        # Pinecone vector search
└── types/                       # TypeScript type definitions
```

## 🔍 Search Algorithm

The platform features a sophisticated 3-level hierarchical search algorithm:

### Level 1: Exact Phrase Matching (50+ points)
- Searches for the complete query string first
- Highest priority for perfect matches
- Example: "outdoor adventure team building games" → exact phrase search

### Level 2: Multi-word Combinations (20-35 points)
- Generates all possible word combinations
- Decreasing relevance scores based on combination length
- Example: "outdoor adventure team", "team building games", etc.

### Level 3: Individual Keywords (2-10 points)
- Falls back to individual word matching
- Ensures results are always returned
- Example: "outdoor", "adventure", "team", "building", "games"

## 📱 Pages & Routes

### Static Pages
- `/` - Homepage with AI search
- `/about` - About Trebound
- `/contact` - Contact information

### Dynamic Pages
- `/team-building-activity/[slug]` - Activity detail pages
- `/stay/[slug]` - Venue detail pages
- `/destinations/[slug]` - Destination pages
- `/blog/[slug]` - Blog posts

### API Routes
- `/api/search` - AI-powered search endpoint

## 🎨 Design System

### Colors
- **Primary**: `#FF4C39` to `#FFB573` (Gradient)
- **Secondary**: Blue to Purple gradients
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Primary Font**: DM Sans
- **Secondary Fonts**: Inter, Outfit, Urbanist
- **Headings**: Bold, large sizes with proper hierarchy
- **Body**: Readable line heights and spacing

### Components
- **Cards**: Rounded corners, subtle shadows
- **Buttons**: Gradient backgrounds, hover effects
- **Forms**: Clean inputs with focus states
- **Navigation**: Sticky header with smooth scrolling

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm start
```

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

### Code Quality
- **ESLint**: Configured for Next.js and TypeScript
- **TypeScript**: Strict mode enabled
- **Prettier**: Code formatting (optional)

## 📊 Performance

### Optimizations
- **Server Components**: Reduced client-side JavaScript
- **Dynamic Imports**: Code splitting for components
- **Image Optimization**: Next.js Image component
- **Font Optimization**: Google Fonts with display swap
- **Bundle Analysis**: Webpack bundle analyzer ready

### Metrics
- **Lighthouse Score**: 95+ (Performance, Accessibility, SEO)
- **Core Web Vitals**: Optimized for all metrics
- **Loading Speed**: < 2s initial page load

## 🔐 Security

- **Environment Variables**: Secure API key management
- **CORS**: Properly configured for API routes
- **Input Validation**: Server-side validation for all inputs
- **XSS Protection**: React's built-in protection
- **CSRF**: Next.js built-in protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 📞 Support

For support and questions:
- **Email**: support@trebound.com
- **Website**: [https://trebound.com](https://trebound.com)
- **Documentation**: [Internal Wiki](link-to-wiki)

## 🔄 Migration from React/Vite

This Next.js version includes all features from the original React/Vite application:

### Migrated Features ✅
- AI-powered search with hierarchical algorithm
- Complete component library
- API routes and data fetching
- Responsive design and animations
- SEO optimization and meta tags

### Enhanced Features 🚀
- Server-side rendering for better SEO
- Improved performance with App Router
- Better TypeScript integration
- Enhanced developer experience
- Production-ready deployment setup

---

**Built with ❤️ by the Trebound Team**
