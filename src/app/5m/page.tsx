export default function FiveMillionPage() {
  const steps = [
    {
      title: "$100K in checking (for now)",
      detail:
        "Keep immediate liquidity. This sits in fiat until you orange-pill your bank.",
      accent: "bg-yellow-500",
    },
    {
      title: "$900K in multisig/cold storage or BTC-only savings (4–5% in sats)",
      detail:
        "Security-first. Avoid yield traps and shitcoins. If using a savings app, ensure Bitcoin-only and transparent risk.",
      accent: "bg-orange-500",
    },
    {
      title: "$2M straight into self-custodied Bitcoin",
      detail:
        "HODL like your freedom depends on it. No leverage, no trading. Cold keys, strong opsec.",
      accent: "bg-emerald-500",
    },
    {
      title:
        "$1M property purchase + $1M custom build (pay fiat, stack sats instead)",
      detail:
        "GC it yourself, appraise ~ $2.5M, then mortgage ~ $2M leaving ~$500K equity. Use the loan proceeds to buy more BTC.",
      accent: "bg-blue-500",
    },
    {
      title: "Deploy unlocked $2M into Bitcoin",
      detail:
        "If you must, use a spot ETF; real ones self-custody. This is a second tranche of BTC exposure.",
      accent: "bg-purple-500",
    },
  ];

  const outcomes = [
    "You have the dream property (mining rig in the basement).",
    "You keep some cash in the bank (it’s melting—convert ASAP).",
    "You capture an expected $300–400K year‑one BTC appreciation after mortgage—number go up.",
    "You run a node, pursue real hobbies, enjoy family, travel, and delete LinkedIn—welcome to sound money.",
  ];

  return (
    <div className="min-h-screen bg-black text-white font-satoshi">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="space-y-12">
          <div className="text-center space-y-6">
            <p className="uppercase tracking-[0.4em] text-yellow-500/90 text-sm font-light">Freedom • Bitcoin • Property</p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="text-white">The </span>
              <span className="text-yellow-500 [text-shadow:_0_1px_20px_rgba(234,179,8,0.3)]">$5M</span>
              <span className="text-white"> Plan</span>
            </h1>
            <p className="text-white/80 max-w-3xl mx-auto text-lg italic">
              I feel like $5M is still the number. If you think it’s higher, fiat inflation is eating your soul.
            </p>
          </div>

          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h2 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">Allocation Blueprint</h2>
            <ol className="space-y-6">
              {steps.map((s, i) => (
                <li key={i} className="grid grid-cols-[64px_1fr] gap-4 items-start">
                  <div className="flex items-center justify-center">
                    <div className={`w-12 h-12 ${s.accent} text-black font-bold grid place-items-center shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]`}>
                      {(i + 1).toString().padStart(2, '0')}
                    </div>
                  </div>
                  <div className="border border-yellow-500/20 bg-black/30 p-4">
                    <h3 className="text-xl font-semibold text-white mb-2">{s.title}</h3>
                    <p className="text-white/80 text-sm leading-relaxed">{s.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <h3 className="text-2xl font-bold text-yellow-500 mb-3">Why this works</h3>
              <ul className="list-disc list-inside text-white/80 space-y-2 text-sm">
                <li>BTC is the savings technology; property is the lifestyle base.</li>
                <li>Finance the house in fiat; stack sats with principal. Two flies, one swatter.</li>
                <li>Mortgaging post‑appraisal turns sweat equity into harder money exposure.</li>
                <li>Multisig and cold storage mitigate single‑point failure and custodial risk.</li>
              </ul>
            </div>
            <div className="p-8 rounded-none border-2 border-emerald-500 bg-black/40 shadow-[5px_5px_0px_0px_rgba(16,185,129,1)]">
              <h3 className="text-2xl font-bold text-emerald-300 mb-2">Year‑one math (illustrative)</h3>
              <p className="text-white/80 text-sm mb-2">
                After servicing the mortgage, a conservative BTC appreciation can net ~$300–400K. Not a promise—just what sound money tends to do across cycles.
              </p>
              <p className="text-xs text-white/60">Assumes no leverage on BTC, spot exposure only, and prudent LTV on property. Markets are volatile. Do your own research.</p>
            </div>
          </div>

          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl font-bold text-yellow-500 mb-4">Where you land</h3>
            <ul className="list-disc list-inside text-white/80 space-y-2 text-sm">
              {outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </div>

          <div className="p-8 rounded-none border-2 border-red-500 bg-black/40 shadow-[5px_5px_0px_0px_rgba(239,68,68,1)]">
            <h3 className="text-2xl font-bold text-red-300 mb-2">Notes & Caution</h3>
            <ul className="list-disc list-inside text-white/80 space-y-1 text-sm">
              <li>Self‑custody requires discipline. Practice with small amounts first.</li>
              <li>Vet builders, permits, and appraisal comps before breaking ground.</li>
              <li>Mortgage terms matter: fixed rate, realistic LTV, ample cash buffer.</li>
              <li>No shitcoins. No yield scams. Bitcoin only.</li>
            </ul>
            <p className="text-xs text-white/60 mt-3">Educational content. Not financial advice.</p>
          </div>
        </div>
      </div>
    </div>
  );
}


