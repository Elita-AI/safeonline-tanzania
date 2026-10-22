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

- SafeHer content (safety categories, checklists, directory records) lives in src/lib/content.ts as bilingual `{en, sw}` objects — single place for reviewers/admins to edit and verify.
- The assistant runs in on-device demonstration mode (keyword matching to reviewed scenarios); no chat data leaves the browser or is stored — any future live AI must be server-side and disclosed before chatting.
- Problem reports persist in the `public.reports` table (anon INSERT requires `consent_given = true`; reads/updates admin-only via `has_role`). Admin dashboard lives at /_authenticated/admin and every server function re-verifies the admin role — route guards alone never protect the RPC.
- Report submission uses a shared browser-safe payload builder to omit optional identifying fields in anonymous mode, so hidden field values cannot accidentally be submitted.
