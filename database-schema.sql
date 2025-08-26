-- Track ur Dreams Database Schema
-- Run this in your Supabase SQL editor

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

-- Create indexes for better performance
CREATE INDEX idx_dreams_user_id ON dreams(user_id);
CREATE INDEX idx_dreams_created_at ON dreams(created_at DESC);
CREATE INDEX idx_ai_insights_dream_id ON ai_insights(dream_id);
CREATE INDEX idx_user_subscriptions_user_id ON user_subscriptions(user_id);
CREATE INDEX idx_users_email ON users(email);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE dreams ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_insights ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Products policies (read-only for all authenticated users)
CREATE POLICY "Authenticated users can view products" ON products
    FOR SELECT USING (auth.role() = 'authenticated');

-- User subscriptions policies
CREATE POLICY "Users can view own subscription" ON user_subscriptions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription" ON user_subscriptions
    FOR UPDATE USING (auth.uid() = user_id);

-- Dreams policies
CREATE POLICY "Users can view own dreams" ON dreams
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own dreams" ON dreams
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own dreams" ON dreams
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own dreams" ON dreams
    FOR DELETE USING (auth.uid() = user_id);

-- AI insights policies
CREATE POLICY "Users can view insights for own dreams" ON ai_insights
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM dreams 
            WHERE dreams.id = ai_insights.dream_id 
            AND dreams.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert insights for own dreams" ON ai_insights
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM dreams 
            WHERE dreams.id = ai_insights.dream_id 
            AND dreams.user_id = auth.uid()
        )
    );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_subscriptions_updated_at BEFORE UPDATE ON user_subscriptions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dreams_updated_at BEFORE UPDATE ON dreams
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment insight count
CREATE OR REPLACE FUNCTION increment_insight_count(user_uuid UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE user_subscriptions 
    SET insights_used_this_period = insights_used_this_period + 1
    WHERE user_id = user_uuid;
END;
$$ LANGUAGE plpgsql; 