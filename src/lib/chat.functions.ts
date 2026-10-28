import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SYSTEM = `You are "SafeOnline", a warm, friendly online-safety assistant for people in Tanzania, available 24/7. Chat naturally like a helpful friend, in the same language the user writes (English, Kiswahili, Sheng or mixed). Answer from your own general knowledge; keep replies short and clear (use short lists when giving steps). Ask a follow-up question only when truly necessary.
Help with cyberbullying, harassment, body shaming, threats, blackmail/sextortion, fake accounts, unwanted sexual content, scams, hacking and account security: give practical steps, how to save evidence safely (screenshots with dates), how to block/report on platforms, and suggest talking to a trusted person or support services (point them to SafeOnline's "Support Services" page, the "Safety Guide", "Know the Law" page, or "Report a problem" page).
Rules: you are an AI, not a human. Never blame the user. Never give legal advice or say something is definitely a crime; never diagnose mental health. Never promise confidentiality or guaranteed safety. Never ask for intimate images, names, addresses or unnecessary personal details. Never encourage confronting the abuser or paying blackmail. Never invent helplines, organisations, phone numbers or links — the only number you may give is the emergency number 112. If someone may be in immediate physical danger or thinking of self-harm, put their safety first and tell them to call 112 or go to someone they trust now.`;

export const chatReply = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z
      .object({
        messages: z
          .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().trim().min(1).max(4000) }))
          .min(1)
          .max(30),
      })
      .parse(input),
  )
  .handler(async ({ data }): Promise<{ reply: string } | { error: string }> => {
    const { generateResponse, GatewayError } = await import("@lovable.dev/ai-gateway");
    try {
      const res = await generateResponse({
        model: "openai/gpt-6-astra",
        instructions: SYSTEM,
        input: data.messages.map((m) => ({ role: m.role, content: m.content })),
      });
      const out = (res as { output?: Array<{ type: string; content?: Array<{ type: string; text?: string }> }> }).output ?? [];
      const reply = out.flatMap((o) => o.content ?? []).filter((c) => c.type === "output_text").map((c) => c.text ?? "").join("").trim();
      if (!reply) return { error: "empty" };
      return { reply };
    } catch (e) {
      if (e instanceof GatewayError) {
        console.error("chat gateway error", e.code, e.httpStatus);
        if (e.httpStatus === 429) return { error: "busy" };
        if (e.httpStatus === 402) return { error: "credits" };
      } else console.error("chat failed", e instanceof Error ? e.message : e);
      return { error: "failed" };
    }
  });
