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
- Message submissions run the AI deep check directly (server-side, text only, disclosed, nothing persisted) in src/lib/deep-check.functions.ts; shared on-device rules in src/lib/content.ts remain for immediate-danger detection, not the displayed assessment. Other AI paths: and the "Let's chat 24/7" assistant (src/lib/chat.functions.ts), which falls back to on-device scenario replies if AI fails; on-device danger detection always shows EmergencyNotice.
- Use the shared EmergencyNotice with verifiedEmergencyServices for urgent referrals; require non-demo, verified, dated records with contact details so unverified numbers cannot become emergency recommendations.
- Screenshots are only read on-device (browser OCR, dynamically imported) into editable text; never upload, store or send images to any service, since reliable intimate-image screening does not exist.
- Problem reports persist in the `public.reports` table (anon INSERT requires `consent_given = true`; reads/updates admin-only via `has_role`). Admin dashboard lives at /_authenticated/admin and every server function re-verifies the admin role — route guards alone never protect the RPC.
- Report submission uses a shared browser-safe payload builder to omit optional identifying fields in anonymous mode, so hidden field values cannot accidentally be submitted.
