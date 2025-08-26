# Track ur Dreams

A beautiful web application that helps users track their dreams and gain AI-powered insights using Google's Gemini AI. Built with Next.js, Supabase, and Tailwind CSS.

## Features

- 🌙 **Dream Tracking**: Record and organize your dreams with metadata
- 🤖 **AI Insights**: Get personalized dream analysis using Gemini AI
- 🔐 **Secure Authentication**: Sign up with Google, Apple, or email/password
- 💳 **Subscription Management**: Free tier (5 insights) + Premium ($5/month unlimited)
- 📱 **Responsive Design**: Beautiful, dreamy UI that works on all devices
- 🔒 **Privacy First**: Your dreams are private and secure

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **AI**: Google Gemini AI (gemini-2.5-flash-lite model)
- **Payments**: Stripe
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Google Gemini API key
- Stripe account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd trackurdreams
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your environment variables in `.env.local`:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Google Gemini AI Configuration
   GEMINI_API_KEY=your_gemini_api_key

   # Stripe Configuration (optional for development)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

4. **Set up Supabase Database**
   - Create a new Supabase project
   - Run the SQL from `database-schema.sql` in your Supabase SQL editor
   - Configure authentication providers (Google, Apple) in Supabase dashboard

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Setup

Run the following SQL in your Supabase SQL editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    auth_provider TEXT NOT NULL,
    provider_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Products table
CREATE TABLE products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price_usd DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
    max_ai_insights INTEGER NOT NULL,
    stripe_product_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- User subscriptions table
CREATE TABLE user_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    product_id TEXT REFERENCES products(id) NOT NULL,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    status TEXT NOT NULL,
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    insights_used_this_period INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Dreams table
CREATE TABLE dreams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    dream_date DATE NOT NULL,
    title TEXT,
    dream_text TEXT NOT NULL,
    mood TEXT,
    tags TEXT[],
    sleep_quality INTEGER CHECK (sleep_quality BETWEEN 1 AND 5),
    has_ai_insight BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- AI insights table
CREATE TABLE ai_insights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dream_id UUID REFERENCES dreams(id) ON DELETE CASCADE UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    insight_text TEXT NOT NULL,
    themes TEXT[],
    emotions TEXT[],
    connections TEXT[],
    summary TEXT,
    gemini_api_request_payload JSONB,
    gemini_api_response_raw JSONB,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Insert default products
INSERT INTO products (id, name, description, price_usd, max_ai_insights, stripe_product_id) VALUES
('free', 'Free Tier', 'Basic dream tracking with limited AI insights', 0.00, 5, NULL),
('premium_monthly', 'Unlimited Insights Premium', 'Unlimited AI insights and advanced features', 5.00, -1, NULL);

-- Create indexes and enable RLS (see database-schema.sql for full setup)
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── auth/              # Authentication callbacks
│   ├── dashboard/         # User dashboard
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── features/          # Feature-specific components
│   ├── shared/            # Shared components
│   └── ui/                # UI components (shadcn/ui)
├── lib/                   # Utility libraries
│   ├── ai/                # AI integration
│   ├── auth/              # Authentication helpers
│   ├── db/                # Database utilities
│   ├── stripe/            # Payment integration
│   └── utils/             # General utilities
└── styles/                # Global styles
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you have any questions or need help, please open an issue on GitHub. 