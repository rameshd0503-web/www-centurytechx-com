CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a valid contact"
ON public.contacts
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 200
  AND length(btrim(email)) BETWEEN 3 AND 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(btrim(message)) BETWEEN 1 AND 5000
  AND (phone IS NULL OR length(btrim(phone)) BETWEEN 0 AND 50)
);

CREATE POLICY "Admins can view contacts"
ON public.contacts
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update contacts"
ON public.contacts
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete contacts"
ON public.contacts
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));