-- Enable RLS on all tables
ALTER TABLE api.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE api.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE api.school_building ENABLE ROW LEVEL SECURITY;
ALTER TABLE api.success_stories ENABLE ROW LEVEL SECURITY;

-- Create policies to allow service role full access
CREATE POLICY "Allow service role full access to programs" ON api.programs
    FOR ALL USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access to events" ON api.events
    FOR ALL USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access to school_building" ON api.school_building
    FOR ALL USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access to success_stories" ON api.success_stories
    FOR ALL USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- Grant necessary permissions
GRANT ALL ON api.programs TO service_role;
GRANT ALL ON api.events TO service_role;
GRANT ALL ON api.school_building TO service_role;
GRANT ALL ON api.success_stories TO service_role;
