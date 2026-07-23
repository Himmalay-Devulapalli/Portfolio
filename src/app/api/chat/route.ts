import { NextResponse } from "next/server";
import OpenAI from "openai";
import { buildKnowledge } from "@/lib/assistant/knowledge";
import { profile } from "@/lib/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

const systemPrompt = (knowledge: string) =>
  `You are ${profile.name}'s friendly AI assistant, embedded on his portfolio website. Answer visitors' questions about ${profile.name} — his background, work, projects, case studies, newsletter, skills, how he works, and job preferences — in a warm, concise, conversational way. Speak about him in the third person ("he", "Himmalay"). Keep replies to about 2–4 sentences unless the visitor clearly wants more depth.

Rules:
- Use ONLY the knowledge base below. If a detail isn't there, say you don't have it and point them to the Contact section or his LinkedIn — never invent facts, numbers, employers, or dates.
- If asked about availability or hiring, note he's open to Product Manager roles and share his contact email.
- Be recruiter-friendly and specific; cite real numbers and project names from the knowledge base when relevant.

=== KNOWLEDGE BASE ===
${knowledge}
=== END KNOWLEDGE BASE ===`;

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return NextResponse.json({ error: "no_key" }, { status: 503 });

  let messages: ChatMessage[];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const history = messages
    .filter((m) => (m?.role === "user" || m?.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-10);

  if (history.length === 0) return NextResponse.json({ error: "empty" }, { status: 400 });

  try {
    const client = new OpenAI({ apiKey: key });
    const completion = await client.chat.completions.create({
      model: MODEL,
      temperature: 0.4,
      max_tokens: 400,
      stream: true,
      messages: [{ role: "system", content: systemPrompt(buildKnowledge()) }, ...history],
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const delta = chunk.choices[0]?.delta?.content;
            if (delta) controller.enqueue(encoder.encode(delta));
          }
        } catch (err) {
          console.error("[/api/chat] stream error:", err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err) {
    console.error("[/api/chat] provider error:", err);
    return NextResponse.json({ error: "provider_error" }, { status: 502 });
  }
}
