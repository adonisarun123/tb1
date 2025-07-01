-- Create form_submissions table for tracking all form submissions with reference IDs
CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_id VARCHAR(50) UNIQUE NOT NULL,
  form_type VARCHAR(100) NOT NULL,
  form_data JSONB NOT NULL,
  source_url TEXT NOT NULL,
  user_agent TEXT,
  ip_address VARCHAR(45),
  utm_source VARCHAR(255),
  utm_medium VARCHAR(255),
  utm_campaign VARCHAR(255),
  referrer TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'submitted' CHECK (status IN ('submitted', 'processing', 'completed', 'failed')),
  user_email VARCHAR(255),
  user_name VARCHAR(255),
  user_company VARCHAR(255),
  user_phone VARCHAR(50),
  session_id VARCHAR(100),
  device_info JSONB,
  location_data JSONB,
  form_completion_time INTEGER, -- in seconds
  form_steps_completed INTEGER,
  total_form_steps INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_form_submissions_reference_id ON form_submissions(reference_id);
CREATE INDEX IF NOT EXISTS idx_form_submissions_form_type ON form_submissions(form_type);
CREATE INDEX IF NOT EXISTS idx_form_submissions_status ON form_submissions(status);
CREATE INDEX IF NOT EXISTS idx_form_submissions_timestamp ON form_submissions(timestamp);
CREATE INDEX IF NOT EXISTS idx_form_submissions_user_email ON form_submissions(user_email);
CREATE INDEX IF NOT EXISTS idx_form_submissions_source_url ON form_submissions(source_url);
CREATE INDEX IF NOT EXISTS idx_form_submissions_utm_source ON form_submissions(utm_source);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_form_submissions_updated_at 
    BEFORE UPDATE ON form_submissions 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Allow insert for all authenticated users
CREATE POLICY "Allow insert for authenticated users" ON form_submissions
    FOR INSERT WITH CHECK (true);

-- Allow select for service role (for analytics and admin access)
CREATE POLICY "Allow select for service role" ON form_submissions
    FOR SELECT USING (auth.role() = 'service_role');

-- Allow update for service role (for status updates)
CREATE POLICY "Allow update for service role" ON form_submissions
    FOR UPDATE USING (auth.role() = 'service_role');

-- Grant necessary permissions
GRANT ALL ON form_submissions TO service_role;
GRANT INSERT ON form_submissions TO anon;
GRANT SELECT ON form_submissions TO anon;

-- Create view for analytics (without sensitive data)
CREATE OR REPLACE VIEW form_analytics AS
SELECT 
    reference_id,
    form_type,
    source_url,
    utm_source,
    utm_medium,
    utm_campaign,
    timestamp,
    status,
    user_company,
    form_completion_time,
    form_steps_completed,
    total_form_steps,
    (device_info->>'is_mobile')::boolean as is_mobile,
    device_info->>'platform' as platform,
    location_data->>'country' as country,
    location_data->>'city' as city
FROM form_submissions;

-- Grant access to analytics view
GRANT SELECT ON form_analytics TO anon;
GRANT SELECT ON form_analytics TO service_role;

COMMENT ON TABLE form_submissions IS 'Comprehensive tracking table for all form submissions with reference IDs, analytics data, and user information';
COMMENT ON COLUMN form_submissions.reference_id IS 'Unique reference ID generated for each form submission';
COMMENT ON COLUMN form_submissions.form_type IS 'Type of form submitted (expert-consultation, contact-form, etc.)';
COMMENT ON COLUMN form_submissions.form_data IS 'Complete form data submitted by user in JSON format';
COMMENT ON COLUMN form_submissions.source_url IS 'URL from which the form was submitted';
COMMENT ON COLUMN form_submissions.device_info IS 'Browser and device information in JSON format';
COMMENT ON COLUMN form_submissions.location_data IS 'User location data (if available) in JSON format';
COMMENT ON COLUMN form_submissions.form_completion_time IS 'Time taken to complete the form in seconds';
COMMENT ON COLUMN form_submissions.status IS 'Current status of the form submission';

-- Example query to get form submission statistics
/*
SELECT 
    form_type,
    COUNT(*) as total_submissions,
    COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_submissions,
    AVG(form_completion_time) as avg_completion_time,
    COUNT(CASE WHEN (device_info->>'is_mobile')::boolean = true THEN 1 END) as mobile_submissions
FROM form_submissions
WHERE timestamp >= NOW() - INTERVAL '30 days'
GROUP BY form_type
ORDER BY total_submissions DESC;
*/ 