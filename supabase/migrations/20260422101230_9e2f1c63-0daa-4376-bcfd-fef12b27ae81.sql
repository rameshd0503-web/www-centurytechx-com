-- Status values for contact submissions
CREATE TYPE public.contact_submission_status AS ENUM ('new', 'in_progress', 'resolved', 'spam');

-- Contact form submissions
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 100),
  email TEXT NOT NULL CHECK (
    char_length(email) BETWEEN 3 AND 255
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  ),
  message TEXT NOT NULL CHECK (char_length(message) BETWEEN 1 AND 2000),
  status public.contact_submission_status NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX idx_contact_submissions_created_at
  ON public.contact_submissions (created_at DESC);

CREATE INDEX idx_contact_submissions_status
  ON public.contact_submissions (status);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous visitors) can submit a contact message.
CREATE POLICY "Anyone can submit a contact message"
  ON public.contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated users (future admins) can read submissions.
-- Tighten further with a roles table once an admin role is added.
CREATE POLICY "Authenticated users can view submissions"
  ON public.contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update submissions"
  ON public.contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete submissions"
  ON public.contact_submissions
  FOR DELETE
  TO authenticated
  USING (true);

-- Shared timestamp trigger function (idempotent)
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_contact_submissions_updated_at
  BEFORE UPDATE ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();