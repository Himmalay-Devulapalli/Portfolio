"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BentoCard from "@/components/ui/BentoCard";

type Msg = { role: "user" | "bot"; text: string };

const SUGGESTIONS = [
  "What's your AI experience?",
  "Biggest product win?",
  "How do you work with engineers?",
];

const GREETING: Msg = {
  role: "bot",
  text: "Hi — I'm Himmalay's AI assistant. Ask about his AI product work, impact, or how he operates.",
};

// TODO: swap for a real /api/chat (RAG) call. Isolated here for an easy backend plug-in.
async function askBot(question: string): Promise<string> {
  await new Promise((r) => setTimeout(r, 650));
  const q = question.toLowerCase();
  if (/\b(ai|ml|llm|rag|model)\b/.test(q))
    return "As an AI-first Tech PM he ships LLM features end to end — RAG, eval harnesses, and agentic workflows — and stays hands-on with LLM APIs, Python and evals.";
  if (/(win|impact|result|metric|revenue)/.test(q))
    return "He's influenced $40M+ in ARR, led 4 zero-to-one launches, and lifted activation by 38.4% on a core onboarding flow.";
  if (/(engineer|team|work|collaborat|process)/.test(q))
    return "He partners tightly with engineering and ML — prototyping, querying the data himself, and pressure-testing the roadmap with experiments over opinions.";
  if (/(open|hire|role|available|contact)/.test(q))
    return "Yes — he's open to opportunities. The Contact section just below is the fastest way to reach him.";
  return "Himmalay is an AI-first Tech PM with 8+ years shipping across B2B SaaS and consumer. Scroll for case studies, or ask about his AI work, impact, or approach.";
}

type Props = { className?: string; delay?: number; plain?: boolean };

export default function ChatCard({ className = "", delay = 0.08, plain = false }: Props) {
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || loading) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: q }]);
    setLoading(true);
    const answer = await askBot(q);
    setMessages((m) => [...m, { role: "bot", text: answer }]);
    setLoading(false);
  };

  return (
    <BentoCard
      interactive={false}
      delay={delay}
      plain={plain}
      className={`flex flex-col overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-navy text-white shadow-soft">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M12 2l1.6 4.8L18 8l-4.4 1.2L12 14l-1.6-4.8L6 8l4.4-1.2L12 2z" />
          </svg>
          <span className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-bg bg-emerald-500" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink">Himmalay&apos;s assistant</p>
          <p className="flex items-center gap-1.5 text-[11px] text-ink-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Ask about my work · instant answers
          </p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
        {messages.length === 1 ? (
          /* Branded empty state */
          <div className="flex h-full flex-col items-center justify-center px-3 py-6 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white shadow-soft">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 2l1.6 4.8L18 8l-4.4 1.2L12 14l-1.6-4.8L6 8l4.4-1.2L12 2z" />
              </svg>
            </span>
            <p className="mt-4 text-sm font-semibold text-ink">Hi, I&apos;m Himmalay&apos;s assistant</p>
            <p className="mt-1.5 max-w-[17rem] text-sm leading-relaxed text-ink-soft">
              Ask about his AI product work, impact, or how he operates.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              <AnimatePresence>
                {SUGGESTIONS.map((s, i) => (
                  <motion.button
                    key={s}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    onClick={() => send(s)}
                    className="rounded-full border border-border bg-white/60 px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:border-navy hover:text-navy"
                  >
                    {s}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ) : (
          messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <span
                className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "rounded-br-sm bg-navy text-white"
                    : "rounded-bl-sm border border-border bg-white/60 text-ink-soft"
                }`}
              >
                {m.text}
              </span>
            </div>
          ))
        )}

        {loading && (
          <div className="flex justify-start">
            <span className="flex gap-1 rounded-2xl rounded-bl-sm border border-border bg-white/60 px-3.5 py-3">
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  className="h-1.5 w-1.5 rounded-full bg-ink-muted"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }}
                />
              ))}
            </span>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-border px-3 py-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything…"
          aria-label="Ask the assistant a question"
          className="min-w-0 flex-1 bg-transparent px-2 text-sm text-ink placeholder:text-ink-muted focus:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          aria-label="Send message"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-white transition-colors hover:bg-navy-hover disabled:opacity-40"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </button>
      </form>
    </BentoCard>
  );
}
