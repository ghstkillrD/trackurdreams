-- Add Migration: Create Initial Free Subscription
ALTER TABLE user_subscriptions ALTER COLUMN current_period_start DROP NOT NULL;
ALTER TABLE user_subscriptions ALTER COLUMN current_period_end DROP NOT NULL;

-- Function to create initial free subscription
CREATE OR REPLACE FUNCTION create_initial_subscription()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_subscriptions (
    user_id,
    product_id,
    status,
    insights_used_this_period,
    cancel_at_period_end
  ) VALUES (
    NEW.id,
    'free',
    'free',
    0,
    false
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create initial subscription when user is created
DROP TRIGGER IF EXISTS create_user_subscription ON users;
CREATE TRIGGER create_user_subscription
  AFTER INSERT ON users
  FOR EACH ROW
  EXECUTE FUNCTION create_initial_subscription();

-- Create initial subscriptions for existing users
INSERT INTO user_subscriptions (
  user_id,
  product_id,
  status,
  insights_used_this_period,
  cancel_at_period_end
)
SELECT 
  id,
  'free',
  'free',
  0,
  false
FROM users u
WHERE NOT EXISTS (
  SELECT 1 FROM user_subscriptions us WHERE us.user_id = u.id
);
