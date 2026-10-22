import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type ReportRow = {
  id: string;
  category: string;
  description: string;
  region: string | null;
  contact: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
};

const REPORT_STATUSES = ["new", "in_progress", "closed"] as const;
export type ReportStatus = (typeof REPORT_STATUSES)[number];

export function isReportStatus(value: string): value is ReportStatus {
  return (REPORT_STATUSES as readonly string[]).includes(value);
}

// Every function below re-verifies the admin role server-side — the route
// guard only protects the page UI, never the underlying RPC.
export const listReports = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) return { admin: false as const, reports: [] as ReportRow[] };
    const { data, error } = await context.supabase
      .from("reports")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { admin: true as const, reports: (data ?? []) as ReportRow[] };
  });

export const updateReport = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string; status: string; adminNotes: string | null }) => {
    if (!input || typeof input.id !== "string" || !isReportStatus(input.status)) {
      throw new Error("Invalid report update");
    }
    if (input.adminNotes !== null && input.adminNotes.length > 2000) {
      throw new Error("Notes are too long");
    }
    return input;
  })
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");
    const { error } = await context.supabase
      .from("reports")
      .update({
        status: data.status,
        admin_notes: data.adminNotes,
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
