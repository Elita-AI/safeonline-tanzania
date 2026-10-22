<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- SafeOnline content (safety categories, checklists, directory records) lives in src/lib/content.ts as bilingual `{en, sw}` objects — single place for reviewers/admins to edit and verify.
- The assistant and text checker run in on-device demonstration mode using shared browser-safe assessment rules in src/lib/content.ts; no submitted text leaves the browser or is stored, so never label these rules as live AI. Future live AI must be server-side and disclosed before submission.
- Use the shared EmergencyNotice with verifiedEmergencyServices for urgent referrals; require non-demo, verified, dated records with contact details so unverified numbers cannot become emergency recommendations.
- Keep screenshot ingestion unavailable until reliable intimate-image screening exists; text-only inputs prevent unsafe images entering the workflow.
- Problem reports persist in the `public.reports` table (anon INSERT requires `consent_given = true`; reads/updates admin-only via `has_role`). Admin dashboard lives at /_authenticated/admin and every server function re-verifies the admin role — route guards alone never protect the RPC.
- Report submission uses a shared browser-safe payload builder to omit optional identifying fields in anonymous mode, so hidden field values cannot accidentally be submitted.
