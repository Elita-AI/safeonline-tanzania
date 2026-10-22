import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { listReports, updateReport, type ReportRow, type ReportStatus, isReportStatus } from "@/lib/reports.functions";
import { useLang, ui, type T } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { LogOut } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Reports Dashboard — SafeOnline Team" },
      { name: "description", content: "Private reports dashboard for the SafeOnline team." },
      { property: "og:title", content: "Reports Dashboard — SafeOnline Team" },
      { property: "og:description", content: "Private reports dashboard for the SafeOnline team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Admin,
});

const statusLabels: Record<ReportStatus, T> = {
  new: { en: "New", sw: "Mpya" },
  in_progress: { en: "In progress", sw: "Inaendelea" },
  closed: { en: "Closed", sw: "Imefungwa" },
};

const statusStyles: Record<ReportStatus, string> = {
  new: "bg-secondary text-primary",
  in_progress: "bg-accent text-accent-foreground",
  closed: "bg-muted text-muted-foreground",
};

function Admin() {
  const { t, lang } = useLang();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const reportsFn = useServerFn(listReports);
  const updateFn = useServerFn(updateReport);
  const { data, error, isLoading } = useQuery({
    queryKey: ["reports"],
    queryFn: () => reportsFn(),
  });

  const save = useMutation({
    mutationFn: (input: { id: string; status: string; adminNotes: string | null }) =>
      updateFn({ data: input }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["reports"] }),
  });

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    await navigate({ to: "/auth", replace: true });
  }

  if (isLoading) {
    return <p className="mx-auto max-w-4xl px-4 py-10 text-muted-foreground">{t({ en: "Loading reports…", sw: "Inapakia ripoti…" })}</p>;
  }

  if (error || !data?.admin) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-14 text-center">
        <h1 className="font-display text-2xl text-primary">{t({ en: "Admin access only", sw: "Kwa wasimamizi pekee" })}</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          {t({ en: "This account does not have admin access. Ask an existing admin to grant the admin role.", sw: "Akaunti hii haina ruhusa ya msimamizi. Msimamizi mwingine lazima akupe ruhusa." })}
        </p>
        <Button variant="outline" className="mt-6 rounded-full" onClick={signOut}>
          <LogOut className="size-4" /> {t({ en: "Sign out", sw: "Toka" })}
        </Button>
      </div>
    );
  }

  const reports: ReportRow[] = data.reports;
  const newCount = reports.filter((r) => r.status === "new").length;
  const byCategory = new Map<string, number>();
  for (const r of reports) byCategory.set(r.category, (byCategory.get(r.category) ?? 0) + 1);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="font-display text-3xl text-primary mr-auto">{t({ en: "Reports Dashboard", sw: "Dashibodi ya Ripoti" })}</h1>
        <Button variant="outline" size="sm" className="rounded-full" onClick={signOut}>
          <LogOut className="size-4" /> {t({ en: "Sign out", sw: "Toka" })}
        </Button>
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mt-6">
        <div className="rounded-2xl border bg-card p-5">
          <p className="text-3xl font-display text-primary">{reports.length}</p>
          <p className="text-sm text-muted-foreground mt-1">{t({ en: "Total reports", sw: "Ripoti zote" })}</p>
        </div>
        <div className="rounded-2xl border bg-card p-5">
          <p className="text-3xl font-display text-primary">{newCount}</p>
          <p className="text-sm text-muted-foreground mt-1">{t({ en: "Awaiting review", sw: "Zinasubiri kukaguliwa" })}</p>
        </div>
        <div className="rounded-2xl border bg-card p-5">
          <p className="text-3xl font-display text-primary">{byCategory.size}</p>
          <p className="text-sm text-muted-foreground mt-1">{t({ en: "Different problems reported", sw: "Aina tofauti za matatizo" })}</p>
        </div>
      </div>

      {byCategory.size > 0 && (
        <div className="rounded-2xl border bg-card p-5 mt-3">
          <h2 className="font-semibold text-sm">{t({ en: "By problem type", sw: "Kwa aina ya tatizo" })}</h2>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            {[...byCategory.entries()].sort((a, b) => b[1] - a[1]).map(([cat, n]) => (
              <li key={cat} className="flex justify-between gap-4">
                <span>{cat}</span>
                <span className="font-medium text-foreground">{n}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <h2 className="font-display text-2xl text-primary mt-10">{t({ en: "All reports", sw: "Ripoti zote" })}</h2>
      {reports.length === 0 ? (
        <p className="text-muted-foreground mt-3 text-sm">{t({ en: "No reports yet. When someone sends one from the Report a Problem page, it appears here.", sw: "Hakuna ripoti bado. Mtumiaji akituma kutoka ukurasa wa Ripoti Tatizo, itaonekana hapa." })}</p>
      ) : (
        <div className="mt-4 space-y-4">
          {reports.map((r) => (
            <ReportCard key={r.id} report={r} lang={lang} t={t} onSave={(status, notes) => save.mutate({ id: r.id, status, adminNotes: notes })} saving={save.isPending && save.variables?.id === r.id} />
          ))}
        </div>
      )}
    </div>
  );
}

function ReportCard({
  report,
  lang,
  t,
  onSave,
  saving,
}: {
  report: ReportRow;
  lang: "en" | "sw";
  t: (s: T) => string;
  onSave: (status: string, notes: string | null) => void;
  saving: boolean;
}) {
  const [status, setStatus] = useState<string>(isReportStatus(report.status) ? report.status : "new");
  const [notes, setNotes] = useState(report.admin_notes ?? "");
  const created = new Date(report.created_at).toLocaleString(lang === "sw" ? "sw-KE" : "en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <article className="rounded-2xl border bg-card p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[isReportStatus(status) ? status : "new"]}`}>
          {t(statusLabels[isReportStatus(status) ? status : "new"])}
        </span>
        <p className="font-semibold text-sm">{report.category}</p>
        <p className="text-xs text-muted-foreground ml-auto">{created}</p>
      </div>
      <p className="text-sm mt-3 whitespace-pre-wrap">{report.description}</p>
      <p className="text-xs text-muted-foreground mt-2">
        {t({ en: "Region", sw: "Mkoa" })}: {report.region ?? t({ en: "not given", sw: "hakutolewa" })}
        {" · "}
        {t({ en: "Contact", sw: "Mawasiliano" })}: {report.contact ?? t({ en: "not given", sw: "hakutolewa" })}
      </p>
      <div className="mt-4 flex flex-wrap items-end gap-3">
        <label className="text-xs font-medium">
          {t({ en: "Status", sw: "Hali" })}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block rounded-xl border bg-background px-3 py-2 text-sm"
          >
            {(Object.keys(statusLabels) as ReportStatus[]).map((s) => (
              <option key={s} value={s}>
                {t(statusLabels[s])}
              </option>
            ))}
          </select>
        </label>
        <label className="text-xs font-medium flex-1 min-w-48">
          {t({ en: "Team notes (private)", sw: "Maelezo ya timu (ya faragha)" })}
          <textarea
            rows={2}
            maxLength={2000}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="mt-1 w-full rounded-xl border bg-background px-3 py-2 text-sm"
          />
        </label>
        <Button size="sm" className="rounded-full" disabled={saving} onClick={() => onSave(status, notes.trim() || null)}>
          {saving ? t({ en: "Saving…", sw: "Inahifadhi…" }) : t({ en: "Save", sw: "Hifadhi" })}
        </Button>
      </div>
    </article>
  );
}
