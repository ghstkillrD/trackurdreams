-- Insert or update the free tier product
INSERT INTO products (id, name, description, price_usd, max_ai_insights)
VALUES (
    'free',
    'Free Tier',
    'Basic dream tracking with limited AI insights',
    0.00,
    5
)
ON CONFLICT (id) DO UPDATE
SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    price_usd = EXCLUDED.price_usd,
    max_ai_insights = EXCLUDED.max_ai_insights;

-- Insert or update the premium tier product
INSERT INTO products (id, name, description, price_usd, max_ai_insights, stripe_product_id)
VALUES (
    'premium',
    'Unlimited Insights Premium',
    'Unlimited dream tracking and AI insights',
    5.00,
    -1, -- -1 indicates unlimited
    'prod_SwLetbHJ9fqRjc'
)
ON CONFLICT (id) DO UPDATE
SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    price_usd = EXCLUDED.price_usd,
    max_ai_insights = EXCLUDED.max_ai_insights,
    stripe_product_id = EXCLUDED.stripe_product_id;
