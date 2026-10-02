"use client";

import { useState } from "react";
import { Bricolage_Grotesque, Figtree } from "next/font/google";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});
const body = Figtree({ subsets: ["latin"], variable: "--font-body" });

type Capability = {
  id: string;
  label: string[];
  x: number;
  y: number;
  title: string;
  summary: string;
  points: string[];
  ask: string;
  reply: string;
};

// Seven cells: Sales sits in the middle, the rest surround it.
const capabilities: Capability[] = [
  {
    id: "sales",
    label: ["Sales"],
    x: 200,
    y: 190,
    title: "Turns enquiries into orders",
    summary:
      "BeeBee talks to buyers the way your best salesperson would, and it never leaves a message waiting.",
    points: [
      "Recommends products and answers objections",
      "Quotes, confirms order details and hands over to fulfilment",
      "Follows up on abandoned carts and quiet quotes",
    ],
    ask: "Do you have the black one in size 42? I need it by Friday.",
    reply:
      "Yes, 3 left in size 42. Delivery by Thursday is possible if you order before 4 pm. Want me to reserve one?",
  },
  {
    id: "content",
    label: ["Content"],
    x: 143,
    y: 91,
    title: "Keeps your content moving",
    summary:
      "Plans, writes and schedules the posts, product pages and updates your business needs every week.",
    points: [
      "Drafts a week of posts from your products and recent wins",
      "Keeps descriptions and prices consistent everywhere",
      "Queues drafts for your approval, or publishes within your rules",
    ],
    ask: "Plan next week's posts. We just restocked the leather range.",
    reply:
      "Five posts drafted: restock announcement, two styling ideas, one customer photo, one limited-offer reminder. Ready for your review.",
  },
  {
    id: "ads",
    label: ["Advertising"],
    x: 257,
    y: 91,
    title: "Runs ads and watches the spend",
    summary:
      "Builds campaigns from what is already selling and moves budget toward what brings buyers.",
    points: [
      "Writes ad copy and picks audiences from your best customers",
      "Shifts budget to ads that produce sales, not just clicks",
      "Pauses anything that goes over your cost-per-lead limit",
    ],
    ask: "Why did we spend so much on Tuesday?",
    reply:
      "Two ads got heavy traffic but no orders. I paused them and moved the budget to the restock ad, which converted 3x better.",
  },
  {
    id: "leads",
    label: ["Leads"],
    x: 314,
    y: 190,
    title: "Finds and qualifies new leads",
    summary:
      "Captures every enquiry, works out who is serious, and keeps following up until they answer or say no.",
    points: [
      "Collects enquiries from your site, chats and ad forms in one place",
      "Asks the right questions and scores each lead",
      "Sends hot leads straight to you with the full context",
    ],
    ask: "New enquiry from the ad form: wants 200 units, needs a quote.",
    reply:
      "Marked hot. I asked for delivery date and budget, and sent you a summary. Quote draft is waiting for your approval.",
  },
  {
    id: "payments",
    label: ["Payments"],
    x: 257,
    y: 289,
    title: "Collects the money",
    summary:
      "Sends payment requests in the conversation, confirms what has landed, and chases what has not.",
    points: [
      "Shares payment links inside the chat",
      "Confirms payment and sends receipts automatically",
      "Reminds late payers politely, on the schedule you set",
    ],
    ask: "I've paid, please confirm.",
    reply:
      "Payment received. Your receipt is attached and your order is now with delivery.",
  },
  {
    id: "analytics",
    label: ["Analytics"],
    x: 143,
    y: 289,
    title: "Shows what is working",
    summary:
      "A plain-language summary every morning, so you do not need to open five dashboards to know how the business is doing.",
    points: [
      "Daily snapshot of sales, leads and response times",
      "Connects each sale to the post or ad that led to it",
      "Flags drops early, with a suggested fix",
    ],
    ask: "How did last week go?",
    reply:
      "Sales up 12%. Most came from the restock posts. Replies after 8 pm took 4x longer. I can cover those hours if you want.",
  },
  {
    id: "care",
    label: ["Customer", "care"],
    x: 86,
    y: 190,
    title: "Answers customers, any hour",
    summary:
      "Handles the questions that fill your inbox, and brings in a person for the ones that need one.",
    points: [
      "Answers stock, price, delivery and policy questions instantly",
      "Handles complaints calmly, and escalates with a written summary",
      "Matches your tone, so customers hear your business, not a robot",
    ],
    ask: "My order is late and nobody is replying.",
    reply:
      "I'm sorry about the delay. Your order left the depot this morning and arrives tomorrow. I've flagged it to the team and will message you when it's out for delivery.",
  },
];

const steps = [
  {
    title: "Tell it about your business",
    text: "Add your products, prices, delivery terms, and how you like to talk to customers. BeeBee learns from what you give it, and from your past conversations if you share them.",
  },
  {
    title: "Set its limits",
    text: "Decide what it can do alone, what needs your approval, and what it must always pass to you.",
  },
  {
    title: "Let it work, then check in",
    text: "BeeBee runs through the day. Each morning you get a short summary of what it did and what needs you.",
  },
];

const controls = [
  {
    mode: "Ask me first",
    example: "Publishing a post, sending a quote, changing a price",
    tone: "bg-[var(--comb)] border-[var(--edge)]",
  },
  {
    mode: "Do it within limits",
    example: "Answering questions, sending payment links, pausing an ad over budget",
    tone: "bg-white border-[var(--edge)]",
  },
  {
    mode: "Always hand to a person",
    example: "Complaints, refunds, anything you mark as sensitive",
    tone: "bg-[var(--ink)] text-white border-[var(--ink)]",
  },
];

const faqs = [
  {
    q: "Will customers know they are talking to an agent?",
    a: "You choose. BeeBee can introduce itself as your assistant, or reply in your business's voice. Whenever a customer asks for a person, it hands over.",
  },
  {
    q: "What happens when BeeBee does not know something?",
    a: "It tells the customer it will check, passes the question to you with the conversation attached, and learns from your answer.",
  },
  {
    q: "Can I see what BeeBee has done?",
    a: "Yes. Every message, post, ad change and payment request is logged, so you can review it or undo it.",
  },
  {
    q: "Do I need to use every part of it?",
    a: "No. Start with customer care or leads, and switch on the other parts when you are ready.",
  },
];

function hexPoints(cx: number, cy: number, r: number) {
  const k = 0.866;
  return [
    [cx, cy - r],
    [cx + r * k, cy - r / 2],
    [cx + r * k, cy + r / 2],
    [cx, cy + r],
    [cx - r * k, cy + r / 2],
    [cx - r * k, cy - r / 2],
  ]
    .map((p) => p.join(","))
    .join(" ");
}

function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
      <polygon points={hexPoints(14, 14, 13)} fill="var(--honey)" />
      <rect x="8" y="10.5" width="12" height="2.6" rx="1.3" fill="var(--ink)" />
      <rect x="8" y="15.2" width="12" height="2.6" rx="1.3" fill="var(--ink)" />
    </svg>
  );
}

function CapabilityExplorer() {
  const [activeId, setActiveId] = useState("sales");
  const active = capabilities.find((c) => c.id === activeId) ?? capabilities[0];

  return (
    <div>
      <svg
        viewBox="0 0 400 380"
        className="mx-auto w-full max-w-[460px]"
        role="group"
        aria-label="What BeeBee handles. Select a cell to see details."
      >
        {capabilities.map((c) => {
          const selected = c.id === activeId;
          const twoLines = c.label.length > 1;
          return (
            <g
              key={c.id}
              role="button"
              tabIndex={0}
              aria-pressed={selected}
              aria-label={c.label.join(" ")}
              onClick={() => setActiveId(c.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveId(c.id);
                }
              }}
              className="group cursor-pointer outline-none"
            >
              <polygon
                points={hexPoints(c.x, c.y, 62)}
                strokeLinejoin="round"
                className={
                  "transition-colors duration-200 motion-reduce:transition-none " +
                  (selected
                    ? "fill-[#F4B400] stroke-[#1E1B16] [stroke-width:2.5]"
                    : "fill-[#FFF1C2] stroke-[#E5BE55] [stroke-width:1.5] group-hover:fill-[#FFE48A] group-focus-visible:stroke-[#1E1B16] group-focus-visible:[stroke-width:3]")
                }
              />
              <text
                x={c.x}
                y={twoLines ? c.y - 4 : c.y + 5}
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                fill="#1E1B16"
                style={{ fontFamily: "var(--font-body)", pointerEvents: "none" }}
              >
                {c.label.map((line, i) => (
                  <tspan key={line} x={c.x} dy={i === 0 ? 0 : 17}>
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>

      <div
        className="mt-2 rounded-2xl border border-[var(--edge)] bg-white p-6 shadow-[0_1px_0_var(--edge)]"
        aria-live="polite"
      >
        <h3
          className="text-xl font-semibold tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {active.title}
        </h3>
        <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-[var(--muted)]">
          {active.summary}
        </p>

        <div className="mt-5 flex flex-col gap-2 text-[15px] leading-snug">
          <div className="max-w-[85%] self-start rounded-2xl rounded-bl-sm bg-[var(--comb)] px-4 py-2.5">
            {active.ask}
          </div>
          <div className="max-w-[85%] self-end rounded-2xl rounded-br-sm bg-[var(--ink)] px-4 py-2.5 text-white">
            {active.reply}
          </div>
        </div>

        <ul className="mt-5 space-y-2 text-[15px]">
          {active.points.map((p) => (
            <li key={p} className="flex gap-3">
              <svg
                width="16"
                height="18"
                viewBox="0 0 28 28"
                className="mt-1 shrink-0"
                aria-hidden="true"
              >
                <polygon points={hexPoints(14, 14, 13)} fill="var(--honey)" />
              </svg>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Waitlist() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: send `email` to your backend, Resend, Mailchimp, a Google Sheet, etc.
    setDone(true);
  }

  if (done) {
    return (
      <p className="rounded-xl bg-[var(--ink)] px-5 py-4 text-white" role="status">
        You are on the list. We will email {email} when BeeBee opens up.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
      <label htmlFor="waitlist-email" className="sr-only">
        Work email
      </label>
      <input
        id="waitlist-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@yourbusiness.com"
        className="h-12 flex-1 rounded-xl border border-[var(--ink)]/30 bg-white px-4 text-base outline-none placeholder:text-[var(--muted)] focus-visible:border-[var(--ink)] focus-visible:ring-2 focus-visible:ring-[var(--ink)]"
      />
      <button
        type="submit"
        className="h-12 rounded-xl bg-[var(--ink)] px-6 font-semibold text-white transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
      >
        Join the waitlist
      </button>
    </form>
  );
}

export default function Home() {
  return (
    <div
      className={`${display.variable} ${body.variable} min-h-screen text-[var(--ink)]`}
      style={
        {
          "--ink": "#1E1B16",
          "--muted": "#5E574B",
          "--honey": "#F4B400",
          "--comb": "#FFF1C2",
          "--edge": "#EADBB0",
          "--paper": "#FFFFFF",
          fontFamily: "var(--font-body)",
          backgroundColor: "#FFFFFF",
        } as React.CSSProperties
      }
    >
      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2.5">
          <LogoMark />
          <span
            className="text-xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            BeeBee
          </span>
        </a>
        <nav className="flex items-center gap-6 text-[15px]">
          <a href="#how" className="hidden hover:underline sm:inline">
            How it works
          </a>
          <a href="#control" className="hidden hover:underline sm:inline">
            Control
          </a>
          <a href="#faq" className="hidden hover:underline sm:inline">
            FAQ
          </a>
          <a
            href="#waitlist"
            className="rounded-lg bg-[var(--honey)] px-4 py-2 font-semibold transition-colors hover:bg-[#FFC82E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
          >
            Join the waitlist
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-10 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:pt-16">
        <div className="lg:pt-6">
          <h1
            className="text-[2.6rem] font-bold leading-[1.05] tracking-tight sm:text-6xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The busy work of your business, handled.
          </h1>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-[var(--muted)]">
            BeeBee is one agent that manages your content, runs your ads,
            answers customers, closes sales, finds leads, collects payments and
            tells you what is working. You run the business. It runs the inbox.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#waitlist"
              className="rounded-xl bg-[var(--ink)] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
            >
              Join the waitlist
            </a>
            <a
              href="#how"
              className="rounded-xl border border-[var(--ink)]/30 px-6 py-3.5 font-semibold transition-colors hover:bg-[var(--comb)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ink)]"
            >
              See how it works
            </a>
          </div>
          <p className="mt-6 text-sm text-[var(--muted)]">
            Select any cell on the right to see what BeeBee does and how it
            sounds.
          </p>
        </div>

        <CapabilityExplorer />
      </section>

      {/* How it works */}
      <section id="how" className="border-y border-[var(--edge)] bg-[var(--comb)]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2
            className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Set it up once. Check in when you like.
          </h2>
          <ol className="mt-12 grid gap-10 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 28 28"
                  className="shrink-0"
                  aria-hidden="true"
                >
                  <polygon points={hexPoints(14, 14, 13)} fill="var(--honey)" />
                  <text
                    x="14"
                    y="19"
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="700"
                    fill="#1E1B16"
                  >
                    {i + 1}
                  </text>
                </svg>
                <div>
                  <h3
                    className="text-lg font-semibold"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {s.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--muted)]">
                    {s.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Control */}
      <section id="control" className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              You decide what BeeBee can do on its own.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--muted)]">
              Give it room where the risk is low and keep a hand on the rest.
              Everything it does is logged, so you can review it, and change
              the rules whenever you want.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {controls.map((c) => (
              <div key={c.mode} className={`rounded-2xl border p-5 ${c.tone}`}>
                <p
                  className="text-lg font-semibold"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {c.mode}
                </p>
                <p className="mt-1 text-[15px] opacity-80">{c.example}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-[var(--edge)]">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Questions
          </h2>
          <div className="mt-8 divide-y divide-[var(--edge)] border-y border-[var(--edge)]">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium focus-visible:outline-2 focus-visible:outline-[var(--ink)]">
                  {f.q}
                  <span
                    className="text-2xl leading-none transition-transform group-open:rotate-45 motion-reduce:transition-none"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-prose leading-relaxed text-[var(--muted)]">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="bg-[var(--honey)]">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2
            className="text-3xl font-bold tracking-tight sm:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Put BeeBee to work.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg">
            Join the waitlist and be among the first businesses to try it.
          </p>
          <div className="mx-auto mt-8 max-w-xl text-left">
            <Waitlist />
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-[var(--muted)] sm:flex-row">
        <div className="flex items-center gap-2">
          <LogoMark size={20} />
          <span>BeeBee</span>
        </div>
        <p>&copy; {new Date().getFullYear()} BeeBee. All rights reserved.</p>
      </footer>
    </div>
  );
}