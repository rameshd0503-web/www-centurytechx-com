-- 1) Replace overly-permissive INSERT policy with input validation
DROP POLICY IF EXISTS "Anyone can submit a contact message" ON public.enquiries;

CREATE POLICY "Anyone can submit a valid contact message"
ON public.enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 200
  AND length(btrim(email)) BETWEEN 3 AND 320
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(btrim(message)) BETWEEN 1 AND 5000
  AND status = 'new'::contact_submission_status
);

-- 2) Restrict EXECUTE on SECURITY DEFINER helper.
-- RLS policies still evaluate it (they run with the table owner's privileges),
-- but anon/authenticated callers can no longer invoke it directly via PostgREST.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM authenticated;