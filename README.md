# Track ur Dreams

A beautiful web application that helps users track their dreams and gain AI-powered insights using Google's Gemini AI. Built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## 🌟 Features

- **Dream Tracking**: Record and organize dreams with rich metadata
- **AI Insights**: Get gentle, reflective analysis powered by Gemini AI
- **Pattern Discovery**: Identify recurring themes and emotional patterns
- **Beautiful UI**: Dreamy, ethereal design with smooth animations
- **User Authentication**: Secure sign-up with Google, Apple, or email
- **Subscription Management**: Free tier with 5 insights, premium unlimited for $5/month

## 🚀 Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI**: Google Gemini AI
- **Payments**: Stripe
- **Deployment**: Vercel (recommended)

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Google Cloud account (for Gemini AI)
- Stripe account (for payments)

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd trackurdreams
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Copy the example environment file and fill in your API keys:

```bash
cp env.example .env.local
```

Edit `.env.local` with your actual values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Google Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Next.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### 4. Database Setup

1. Create a new Supabase project
2. Run the SQL schema (see `database-schema.sql` in the docs folder)
3. Set up Row Level Security (RLS) policies
4. Configure authentication providers (Google, Apple)

### 5. AI Setup

1. Create a Google Cloud project
2. Enable the Gemini API
3. Create an API key
4. Add the key to your environment variables

### 6. Stripe Setup

1. Create a Stripe account
2. Create a product and price for the subscription
3. Set up webhook endpoints
4. Add your keys to environment variables

### 7. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   ├── profile/           # Profile pages
│   └── plans/             # Subscription pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── shared/           # Shared components
│   └── features/         # Feature-specific components
├── lib/                  # Utility libraries
│   ├── ai/              # AI integration
│   ├── auth/            # Authentication
│   ├── db/              # Database queries
│   ├── stripe/          # Payment processing
│   └── utils/           # Utility functions
├── hooks/               # Custom React hooks
├── providers/           # Context providers
└── styles/              # Global styles
```

## 🎨 Design System

The application uses a dreamy, ethereal design system with:

- **Colors**: Soft lavenders, misty blues, warm pinks, shimmering gold accents
- **Typography**: Montserrat for headings, Inter for body text
- **Animations**: Gentle floating animations and smooth transitions
- **Components**: Rounded corners, soft shadows, gradient backgrounds

## 🔐 Security Features

- Row Level Security (RLS) in Supabase
- Encrypted data storage
- Secure API routes
- User authentication and authorization
- Privacy-first design

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm start
```

## 📝 Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful commit messages

### Component Structure

- Use functional components with hooks
- Implement proper error boundaries
- Follow the dreamy design aesthetic
- Ensure accessibility standards

### API Development

- Use Next.js API routes
- Implement proper error handling
- Add request validation
- Use TypeScript for API types

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support, please open an issue in the GitHub repository or contact the development team.

## 🔮 Future Enhancements

- Voice note recording
- Dream journal prompts
- Monthly insights reports
- Mobile applications
- Wearable integration
- Advanced analytics

---

Built with ❤️ and dreams 