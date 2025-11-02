'use client';

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type ContentCategory =
  | "Research Breakthroughs"
  | "Market Signals"
  | "Playbook Moves";

type ContentItem = {
  id: string;
  title: string;
  hook: string;
  summary: string;
  category: ContentCategory;
  source: string;
  postedOn: string;
  image: string;
  tags: string[];
  link: string;
};

type MicroInsight = {
  id: string;
  headline: string;
  stat: string;
  action: string;
};

const content: ContentItem[] = [
  {
    id: "re2050",
    title: "Retrofitting Cities to Hit 1.5°C Targets",
    hook: "💡 Top retrofit lever that actually hits 30% emission cuts?",
    summary:
      "A meta-analysis of 42 urban retrofits found deep envelope upgrades paired with time-of-use automation are the only combo that consistently delivers the 30% emissions reductions cities promise.",
    category: "Research Breakthroughs",
    source: "Nature Climate, 2023",
    postedOn: "Dec 12 • 6 min read",
    image:
      "https://images.unsplash.com/photo-1527960669566-f882ba85a4f3?auto=format&fit=crop&w=1200&q=80",
    tags: ["Urban Systems", "Retrofit", "Automation"],
    link: "https://www.nature.com/articles/s41558-023-01780-9",
  },
  {
    id: "fusion",
    title: "Micro Fusion Pilot Ships 24/7 Heat",
    hook: "🔥 First micro fusion heat-as-a-service contract just landed.",
    summary:
      "Helion's pilot plant in Washington is now selling process heat directly to a paper mill—no grid required. Early data shows 68% lower volatility in operating costs compared with gas.",
    category: "Market Signals",
    source: "Helion Investor Update",
    postedOn: "Jan 04 • Fresh Drop",
    image:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    tags: ["Fusion", "Industrial Heat", "Energy-as-a-Service"],
    link: "https://www.helionenergy.com/blog",
  },
  {
    id: "soil-ai",
    title: "Soil Carbon MRV Gets a Reality Check",
    hook: "🌱 Satellite MRV is failing regen farmers—here's the fix.",
    summary:
      "New benchmarking from Regrow raises the accuracy ceiling when fusing multispectral satellite data with hyperlocal weather modeling, hitting ±6% variance in soil carbon tracking.",
    category: "Research Breakthroughs",
    source: "Regrow Earth Lab",
    postedOn: "Nov 28 • Data Drop",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
    tags: ["Soil Carbon", "MRV", "AgTech"],
    link: "https://www.regrow.ag/resources",
  },
  {
    id: "lithium",
    title: "Lithium Refiners Embrace Green Ammonia Heat",
    hook: "⚙️ Refiners swapping gas boilers for electrolytic ammonia burners.",
    summary:
      "Two of the top five lithium refiners are trialing green ammonia combustion for high-grade heat, paired with carbon capture on the off-gas stream to reach near-zero emissions.",
    category: "Market Signals",
    source: "Benchmark Minerals",
    postedOn: "Dec 19 • Report Snippet",
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
    tags: ["Lithium", "Green Ammonia", "Industrial"],
    link: "https://www.benchmarkminerals.com",
  },
  {
    id: "playkit",
    title: "90-Day Playbook: Net-Zero Sprints for Product Teams",
    hook: "🚀 Want product + sustainability to ship together?",
    summary:
      "This sprint kit maps lifecycle hotspots to your feature backlog. Teams at Atlassian and Miro cut Scope 3 cloud emissions per feature by 18% in one quarter.",
    category: "Playbook Moves",
    source: "Miro Climate Guild",
    postedOn: "Jan 02 • Toolkit",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    tags: ["Product Ops", "Scope 3", "Tooling"],
    link: "https://miro.com/climate",
  },
  {
    id: "biochar",
    title: "Biochar Urban Forestry Trials",
    hook: "🌳 City trees growing 23% faster with circular waste streams.",
    summary:
      "Melbourne's pilot infuses municipal green waste into biochar substrates, delivering faster canopy cover and measurable flood resilience within 18 months.",
    category: "Playbook Moves",
    source: "City of Melbourne Labs",
    postedOn: "Oct 17 • Field Note",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
    tags: ["Urban Forest", "Biochar", "Circularity"],
    link: "https://participate.melbourne.vic.gov.au",
  },
];

const microInsights: MicroInsight[] = [
  {
    id: "heat",
    headline: "Industrial heat is 74% of manufacturing emissions.",
    stat: "➡️ Electrify <400°C first.",
    action: "Swap legacy boilers for high-temp heat pumps + thermal storage.",
  },
  {
    id: "buildings",
    headline: "Buildings waste 32% of purchased energy at night.",
    stat: "➡️ Smart curfews fix it.",
    action: "Automate set-back windows; shave 12% load without CapEx.",
  },
  {
    id: "water",
    headline: "Water leaks erase 17% of utility decarbonization gains.",
    stat: "➡️ AI acoustic pilots pay back in 9 months.",
    action: "Deploy edge sensors and tie alerts into maintenance tickets.",
  },
  {
    id: "soil",
    headline: "Regenerative acreage doubled in 18 months.",
    stat: "➡️ Premiums hinge on trustworthy MRV.",
    action: "Use blended ground-truth + satellite sampling for payouts.",
  },
];

const heroHighlights = [
  "⚡️ Daily drop of research-grade climate plays.",
  "🧭 Hooks that help teams act fast without the fluff.",
  "🖼️ Visual cues built for scroll-stoppers.",
];

const categories: ContentCategory[] = [
  "Research Breakthroughs",
  "Market Signals",
  "Playbook Moves",
];

const knowledgeShots = [
  {
    title: "Scope 1 vs 2 vs 3 in 12 seconds",
    body: "Map your top 5 suppliers -> measure electricity intensity -> multiply by spend to unlock immediate Scope 3 hotspots.",
  },
  {
    title: "Circular hardware sprints",
    body: "Add a 'repair before replace' gate to PI planning. Teams that did cut hardware spend 14% and emissions 19%.",
  },
  {
    title: "Sustainability UX hook",
    body: "Lead with the waste avoided, not the feature shipped. Users remember saved carbon like they remember saved time.",
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] =
    useState<ContentCategory>("Research Breakthroughs");

  const curatedFeed = useMemo(
    () => content.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 pb-24 pt-20 sm:px-10">
        <div className="absolute inset-x-0 top-20 mx-auto h-72 max-w-xl rounded-full bg-emerald-500/20 blur-3xl" />

        <header className="relative flex flex-col gap-6">
          <span className="w-fit rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
            Sustain Signal Agent
          </span>
          <h1 className="text-balance text-4xl font-semibold leading-tight md:text-5xl">
            Your social feed for the smartest sustainability plays—fresh drops
            pulled from research labs, the market floor, and real-world builds.
          </h1>
          <p className="max-w-2xl text-balance text-lg text-slate-300">
            We compress the noise into precise hooks so you can champion
            sustainability inside product roadmaps, board decks, and build-site
            stand-ups. Swipe-worthy imagery keeps cross-functional teams
            leaning in.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-emerald-100/90">
            {heroHighlights.map((highlight) => (
              <span
                key={highlight}
                className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1"
              >
                {highlight}
              </span>
            ))}
          </div>
        </header>

        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_0_120px_-40px_rgba(16,185,129,0.5)]">
          <div className="absolute -top-48 -right-32 h-64 w-64 rounded-full bg-emerald-400/30 blur-3xl" />
          <div className="absolute -bottom-40 -left-32 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="relative flex flex-col gap-6">
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const isActive = category === activeCategory;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
                      isActive
                        ? "border-emerald-400/80 bg-emerald-400/20 text-emerald-50 shadow-[0_8px_30px_-12px_rgba(16,185,129,0.65)]"
                        : "border-white/10 bg-white/5 text-slate-200 hover:border-emerald-300/40 hover:text-emerald-50"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {curatedFeed.map((item) => (
                <article
                  key={item.id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 shadow-[0_20px_50px_-35px_rgba(15,118,110,0.7)] transition hover:translate-y-[-4px] hover:border-emerald-400/40"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/0" />
                    <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-200">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-emerald-200/80">
                      <span>{item.postedOn}</span>
                      <span className="h-2 w-2 rounded-full bg-emerald-300/70" />
                      <span>{item.source}</span>
                    </div>
                    <h2 className="text-2xl font-semibold text-white">
                      {item.hook}
                    </h2>
                    <p className="text-sm leading-relaxed text-slate-300">
                      {item.summary}
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs text-emerald-100/80">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto">
                      <Link
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-200 transition hover:text-emerald-100"
                      >
                        Dive deeper
                        <span aria-hidden className="text-lg">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-semibold text-white">
              Micro insights to drop in your next stand-up
            </h3>
            <p className="text-sm text-slate-300">
              Hook decision-makers with quick stats, then point to an actionable
              move. These are sourced weekly from peer-reviewed research and the
              most credible market datasets.
            </p>
            <div className="space-y-4">
              {microInsights.map((insight) => (
                <div
                  key={insight.id}
                  className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 shadow-[0_20px_40px_-35px_rgba(34,211,238,0.5)]"
                >
                  <p className="text-sm font-semibold text-sky-200">
                    {insight.headline}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {insight.stat}
                  </p>
                  <p className="mt-2 text-sm text-slate-300">{insight.action}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex h-full flex-col gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-slate-900 p-6">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-100/80">
                Sustainability Story Hooks
              </h4>
              <p className="mt-2 text-xl font-semibold text-white">
                Three narrative starters to make climate action feel urgent and
                winnable.
              </p>
            </div>
            <div className="space-y-5">
              {knowledgeShots.map((shot) => (
                <div
                  key={shot.title}
                  className="rounded-2xl border border-white/10 bg-black/30 p-5"
                >
                  <p className="text-sm font-semibold text-emerald-100">
                    {shot.title}
                  </p>
                  <p className="mt-2 text-sm text-slate-200">{shot.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-auto rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-slate-200">
              <p className="font-semibold text-emerald-100">
                Coming next sprint:
              </p>
              <ul className="mt-3 space-y-2">
                <li>• AI prompt kit for sustainability reporting.</li>
                <li>• Visual pack for Scope 1 heat electrification.</li>
                <li>• Playbook for regenerative supplier onboarding.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.25),_transparent_60%)]" />
          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-100/80">
                Attention Loop
              </p>
              <h3 className="mt-3 text-3xl font-semibold text-white">
                Drop these concepts into your social calendar this week.
              </h3>
              <p className="mt-3 text-sm text-slate-300">
                Designed for LinkedIn, internal social channels, and weekly
                stakeholder roundups. Each prompt includes a hook, the aha
                insight, and the action to move the conversation forward.
              </p>
            </div>

            <div className="grid gap-4 text-sm text-slate-200 md:w-96">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <p className="font-semibold text-emerald-100">
                  Hook: “We cut purchase order emissions 18% with one dashboard
                  tweak.”
                </p>
                <p className="mt-2">
                  Insight: auto-sorting vendors by kg CO₂e/$ surfaced the real
                  hotspots fast.
                </p>
                <p className="mt-2 text-emerald-100/80">
                  Action: release the dashboard screenshot with a short Loom to
                  rally ops + finance.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <p className="font-semibold text-emerald-100">
                  Hook: “The fastest green win sits in your server closet.”
                </p>
                <p className="mt-2">
                  Insight: workload scheduling at clean-energy hours saved 11%
                  emissions for a gaming studio.
                </p>
                <p className="mt-2 text-emerald-100/80">
                  Action: share the before/after grid-intensity graph to drive
                  ops commitment.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/40 p-5">
                <p className="font-semibold text-emerald-100">
                  Hook: “Construction waste became our brand’s biggest ad.”
                </p>
                <p className="mt-2">
                  Insight: streaming modular re-use saves 18 tons per site and
                  delivers the best social engagement of the quarter.
                </p>
                <p className="mt-2 text-emerald-100/80">
                  Action: post side-by-side imagery with waste diverted badge
                  overlaid.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 pt-8 text-xs text-slate-400">
          Built for sustainability operators obsessed with momentum. Updated
          daily by an agent that refuses to let climate progress feel optional.
        </footer>
      </div>
    </div>
  );
}
