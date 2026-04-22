import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type AdminAuthState =
  | { status: "loading" }
  | { status: "signed_out" }
  | { status: "signed_in_no_role"; session: Session }
  | { status: "admin"; session: Session };

/**
 * Tracks Supabase session and whether the current user holds the `admin` role.
 * IMPORTANT: subscribes to onAuthStateChange BEFORE calling getSession().
 */
export function useAdminAuth(): AdminAuthState & { signOut: () => Promise<void> } {
  const [state, setState] = useState<AdminAuthState>({ status: "loading" });

  useEffect(() => {
    let active = true;

    const checkRole = async (session: Session | null) => {
      if (!session) {
        if (active) setState({ status: "signed_out" });
        return;
      }
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (!active) return;
      if (error || !data) {
        setState({ status: "signed_in_no_role", session });
      } else {
        setState({ status: "admin", session });
      }
    };

    // 1. Subscribe FIRST so we never miss an auth event
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      // Defer Supabase calls to avoid deadlock inside the callback
      window.setTimeout(() => checkRole(session), 0);
    });

    // 2. Then fetch existing session
    supabase.auth.getSession().then(({ data }) => {
      void checkRole(data.session);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { ...state, signOut };
}
