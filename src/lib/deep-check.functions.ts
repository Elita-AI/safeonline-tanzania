import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const CATEGORIES = ["bullying", "threats", "blackmail", "impersonation", "sexual", "hacking", "unclear"] as const;

export type DeepCheckResult = {
  category: (typeof CATEGORIES)[number];
  risk: "Lower" | "Medium" | "High";
  summary: string;
  warningSigns: string[];
  nextSteps: string[];
  immediateDanger: boolean;
};

const resultSchema = z.object({
  category: z.enum(CATEGORIES),
  risk: z.enum(["Lower", "Medium", "High"]),
  summary: z.string().max(800),
  warningSigns: z.array(z.string().max(200)).max(6),
  nextSteps: z.array(z.string().max(300)).max(6),
  immediateDanger: z.boolean(),
});

const SYSTEM = `You are SafeOnline's deeper message checker for people in Tanzania. You analyse a message, link or username that someone received online (English, Kiswahili, Sheng or mixed). Treat links and usernames as text only; never visit them.
Classify into one category: bullying (harassment, insults, body shaming, cyberbullying), threats, blackmail (incl. sextortion), impersonation (fake accounts), sexual (unwanted sexual content), hacking (scams, phishing, OTP/password requests), or unclear.
Give risk Lower/Medium/High, a short plain summary, warning signs found, and 3-5 practical next steps (e.g. do not reply or pay, save evidence safely with screenshots and dates, block and report on the platform, secure accounts, talk to a trusted person or a support service).
Rules: answer in the language requested. Never blame the person. Never give legal advice or claim something is legally a crime. Never diagnose mental health. Never promise safety or confidentiality. Never encourage confronting the sender. Never invent helplines, organisations, phone numbers or links. Never ask for images or personal details. Set immediateDanger true only if the text suggests risk of physical harm soon. Return JSON only.`;

export const deepCheck = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z.object({ text: z.string().trim().min(1).max(4000), lang: z.enum(["en", "sw"]) }).parse(input),
  )
  .handler(async ({ data }): Promise<DeepCheckResult | { error: string }> => {
    const { generateResponse, GatewayError } = await import("@lovable.dev/ai-gateway");
    try {
      const res = await generateResponse({
        model: "openai/gpt-6-astra",
        instructions: SYSTEM,
        input: [
          {
            role: "user",
            content: `Respond in ${data.lang === "sw" ? "Kiswahili" : "English"} as JSON. Message to check:\n"""\n${data.text}\n"""`,
          },
        ],
        text: {
          format: {
            type: "json_schema",
            name: "deep_check",
            strict: true,
            schema: {
              type: "object",
              additionalProperties: false,
              required: ["category", "risk", "summary", "warningSigns", "nextSteps", "immediateDanger"],
              properties: {
                category: { type: "string", enum: [...CATEGORIES] },
                risk: { type: "string", enum: ["Lower", "Medium", "High"] },
                summary: { type: "string" },
                warningSigns: { type: "array", items: { type: "string" } },
                nextSteps: { type: "array", items: { type: "string" } },
                immediateDanger: { type: "boolean" },
              },
            },
          },
        },
        store: false,
      });
      const out = (res as { output?: Array<{ type: string; content?: Array<{ type: string; text?: string }> }> }).output ?? [];
      const text = out.flatMap((o) => o.content ?? []).find((c) => c.type === "output_text")?.text;
      if (!text) return { error: "empty" };
      return resultSchema.parse(JSON.parse(text));
    } catch (e) {
      if (e instanceof GatewayError) {
        console.error("deepCheck gateway error", e.code, e.httpStatus);
        if (e.httpStatus === 429) return { error: "busy" };
        if (e.httpStatus === 402) return { error: "credits" };
      } else console.error("deepCheck failed", e instanceof Error ? e.message : e);
      return { error: "failed" };
    }
  });
