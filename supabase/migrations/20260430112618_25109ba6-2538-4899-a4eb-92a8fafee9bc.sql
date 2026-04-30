DROP POLICY IF EXISTS "Anyone can submit a valid contact" ON public.contacts;

CREATE POLICY "Anyone can submit a valid contact"
ON public.contacts
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 200
  AND length(btrim(email)) BETWEEN 3 AND 320
  AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND length(btrim(message)) BETWEEN 1 AND 5000
  AND (phone IS NULL OR length(btrim(phone)) <= 50)
);