CREATE TABLE rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  guests INTEGER NOT NULL DEFAULT 1,
  attending TEXT NOT NULL CHECK (attending IN ('yes', 'no', 'maybe')),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- T3: Anonymous/public form submissions
CREATE POLICY "anon_insert" ON rsvps FOR INSERT WITH CHECK (true);
CREATE POLICY "public_read" ON rsvps FOR SELECT USING (true);