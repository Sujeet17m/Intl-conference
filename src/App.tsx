import { useState, useEffect, useRef } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const NAVY = "#1B2E55";
const NAVY_DARK = "#0F1B38";
const GOLD = "#B8952A";
const GOLD_LIGHT = "#D4AF4A";
const GOLD_PALE = "#FDF6E3";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Speakers", href: "#speakers" },
  { label: "Schedule", href: "#schedule" },
  { label: "Call for Papers", href: "#cfp" },
  { label: "Publications", href: "#publications" },
  { label: "Guidelines", href: "#guidelines" },
  { label: "Sponsorship", href: "#sponsorship" },
  { label: "Registration", href: "#registration" },
  { label: "Committee", href: "#committee" },
  { label: "Contact", href: "#contact" },
];

const TICKER_ITEMS = [
  "Paper Submission Portal: Details will be given soon",
  "Important: Manuscript should be original and not published elsewhere",
  "Conference Mode: Hybrid (Physical & Virtual)",
  "Proceedings: Submitted for IEEE / Scopus Indexing",
  "Venue: Vels Institute of Science, Technology & Advanced Studies, Chennai",
  "Early Bird Registration: Details will be given soon",
];

const INTERNATIONAL_SPEAKERS = [
  { name: "Dr. Raman Raguraman", affiliation: "AIMST University, Malaysia", country: "Malaysia", initials: "RR" },
  { name: "Dr. Ashwin Kumar TK", affiliation: "Senior Data Scientist, Amazon", country: "International", initials: "AK" },
  { name: "Mrs. Ezhil Priyadharshini", affiliation: "Details will be given soon", country: "International", initials: "EP" },
  { name: "Dr. Arun Kumar Ramamoorthy", affiliation: "University of South Wales, United Kingdom", country: "United Kingdom", initials: "AR" },
];

const INDIAN_SPEAKERS = [
  { name: "Dr. P. Thyagarajan", affiliation: "Professor, Central University of Tamil Nadu", country: "India", initials: "PT" },
  { name: "Dr. Noor Mahammad SK", affiliation: "IIITDM Kancheepuram", country: "India", initials: "NM" },
  { name: "Dr. R. Preeth", affiliation: "IIITDM Kancheepuram", country: "India", initials: "RP" },
  { name: "Mr. Mohammed Salick", affiliation: "Program Manager, Microsoft Pvt Ltd", country: "India", initials: "MS" },
];

const RESEARCH_TRACKS = [
  "Generative AI and Large Language Models",
  "Autonomous Agents and Multi-Agent Systems",
  "Reinforcement Learning and Adaptive Decision Making",
  "Reasoning under Uncertainty and Knowledge Representation",
  "Multimodal AI Frameworks and Architectures",
  "Explainable AI and Trustworthy Systems",
  "AI in Healthcare, Education, and Life Sciences",
  "Edge AI and Embedded Intelligence",
  "Natural Language Processing and Understanding",
  "Computer Vision and Perceptual Computing",
  "AI Ethics, Governance, and Responsible AI",
  "Intelligent Robotics and Cognitive Automation",
];

const IMPORTANT_DATES = [
  { event: "Paper Submission Opens", date: "Details will be given soon" },
  { event: "Full Paper Submission Deadline", date: "Details will be given soon" },
  { event: "Notification of Acceptance", date: "Details will be given soon" },
  { event: "Camera-Ready Paper Submission", date: "Details will be given soon" },
  { event: "Early Bird Registration Deadline", date: "Details will be given soon" },
  { event: "Conference Dates", date: "Details will be given soon" },
];

const SPONSORSHIP_TIERS = [
  {
    tier: "Platinum",
    amount: "Details will be given soon",
    color: "#7C92B0",
    perks: [
      "Full-page advertisement in proceedings",
      "Prime exhibition stall",
      "4 complimentary full registrations",
      "Logo on all conference materials",
      "Social media recognition",
    ],
  },
  {
    tier: "Gold",
    amount: "Details will be given soon",
    color: GOLD,
    perks: [
      "Half-page advertisement in proceedings",
      "Exhibition stall",
      "2 complimentary full registrations",
      "Logo on conference banner",
      "Website recognition",
    ],
  },
  {
    tier: "Silver",
    amount: "Details will be given soon",
    color: "#9CA3AF",
    perks: [
      "Quarter-page advertisement in proceedings",
      "1 complimentary registration",
      "Logo on conference banner",
      "Website recognition",
    ],
  },
];

const CHENNAI_PLACES = [
  { name: "Marina Beach", desc: "World's longest natural urban beach", img: "https://images.unsplash.com/photo-1724992609079-75164f1ba2dd?w=600&h=400&fit=crop&auto=format" },
  { name: "Kapaleeshwarar Temple", desc: "Ancient Dravidian architecture, Mylapore", img: "https://images.unsplash.com/photo-1724992609113-bb30249a2573?w=600&h=400&fit=crop&auto=format" },
  { name: "Fort St. George", desc: "First English fortress in India, 1644", img: "https://images.unsplash.com/photo-1724992609085-04e76ba15f6a?w=600&h=400&fit=crop&auto=format" },
  { name: "Mahabalipuram", desc: "UNESCO World Heritage Site, 60 km away", img: "https://images.unsplash.com/photo-1724992609087-c613221d260b?w=600&h=400&fit=crop&auto=format" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs tracking-[0.25em] font-display mb-3" style={{ color: GOLD }}>
      {children}
    </div>
  );
}

function SectionHeading({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <h2
      className={`font-display font-bold text-3xl lg:text-4xl mb-0 ${center ? "text-center" : ""}`}
      style={{ color: NAVY }}
    >
      {children}
      <div
        className={`mt-3 h-[3px] w-14 ${center ? "mx-auto" : ""}`}
        style={{ background: GOLD }}
      />
    </h2>
  );
}

// ─── Marquee Ticker ───────────────────────────────────────────────────────────

function Ticker() {
  return (
    <div
      className="w-full overflow-hidden flex items-center gap-0 text-xs font-display tracking-wider"
      style={{ background: NAVY_DARK, color: "#CBD5E1", height: "34px" }}
    >
      <div
        className="flex-shrink-0 px-4 h-full flex items-center text-[10px] tracking-widest font-bold"
        style={{ background: GOLD, color: "#fff", whiteSpace: "nowrap" }}
      >
        LATEST NEWS
      </div>
      <div className="overflow-hidden flex-1 relative">
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{
            animation: "ticker 40s linear infinite",
          }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3">
              <span style={{ color: GOLD }}>◆</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Vels Logo ────────────────────────────────────────────────────────────────

function VelsLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <img
        src="/images/vels-shield.jpg"
        alt="VELS University Crest"
        className={`${compact ? "h-10" : "h-12"} w-auto object-contain flex-shrink-0`}
        style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }}
      />
      <div className="leading-tight">
        <div className={`font-display font-bold text-white ${compact ? "text-[11px]" : "text-[13px]"} tracking-wider leading-none uppercase`}>
          Vels Institute of Science,
        </div>
        <div className={`font-display font-bold text-white ${compact ? "text-[11px]" : "text-[13px]"} tracking-wider leading-none uppercase mt-0.5`}>
          Technology &amp; Advanced Studies
        </div>
        <div style={{ color: GOLD }} className="font-display text-[9px] tracking-widest mt-0.5">
          (Deemed to be University) — Chennai
        </div>
      </div>
    </div>
  );
}

function VelsLogoBanner() {
  return (
    <img
      src="/images/vels-logo-banner.jpg"
      alt="VELS Institute of Science, Technology & Advanced Studies"
      className="h-full w-auto object-contain"
      style={{ maxHeight: "80px" }}
    />
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.25 }
    );
    document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "shadow-xl" : ""}`}
      style={{ background: NAVY }}
    >
      {/* Logo bar — shows the full VELS banner image on both desktop and mobile */}
      <div
        className="w-full border-b"
        style={{ borderColor: "#E5E7EB", background: "#fff" }}
      >
        <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-2 flex items-center justify-between gap-4">
          {/* Banner logo */}
          <a href="#home" className="flex-1 min-w-0">
            <img
              src="/images/vels-logo-banner.jpg"
              alt="VELS Institute of Science, Technology & Advanced Studies"
              className="w-auto object-contain"
              style={{ maxHeight: "80px", maxWidth: "100%" }}
            />
          </a>
          <div className="flex flex-col items-end gap-1 text-right flex-shrink-0">
            <div className="font-display font-semibold text-xs tracking-wider" style={{ color: NAVY }}>ICICFA &ndash; 2025</div>
            <div className="text-[10px] tracking-widest font-display" style={{ color: GOLD }}>
              HYBRID MODE : PHYSICAL &amp; VIRTUAL
            </div>
            <div className="hidden sm:flex items-center gap-2 mt-1">
              {["UGC", "NAAC 'A+'", "AICTE"].map((b) => (
                <span
                  key={b}
                  className="text-[9px] font-display tracking-widest px-2 py-0.5 border"
                  style={{ borderColor: "rgba(27,46,85,0.3)", color: NAVY }}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Nav links */}
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 flex items-center justify-between h-10">
        <nav className="hidden lg:flex items-stretch h-full gap-0">
          {NAV_LINKS.map((link) => {
            const active = activeSection === link.href.slice(1);
            const isRegister = link.label === "Registration";
            if (isRegister) return null;
            return (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center px-3 text-[10px] font-display tracking-wider h-full border-b-2 transition-all duration-150"
                style={{
                  borderBottomColor: active ? GOLD : "transparent",
                  color: active ? GOLD_LIGHT : "#CBD5E1",
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = "#CBD5E1"; }}
              >
                {link.label.toUpperCase()}
              </a>
            );
          })}
        </nav>

        {/* Register CTA */}
        <a
          href="#registration"
          className="hidden lg:flex items-center px-5 h-7 text-[10px] font-display tracking-widest transition-all duration-150"
          style={{ background: GOLD, color: "#fff" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#9A7A20")}
          onMouseLeave={(e) => (e.currentTarget.style.background = GOLD)}
        >
          REGISTER NOW
        </a>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t" style={{ borderColor: "#2D4A7A", background: NAVY_DARK }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between px-5 py-3 text-xs font-display tracking-wider border-b text-blue-100 hover:text-white transition-all"
              style={{ borderColor: "#2D4A7A" }}
            >
              {link.label.toUpperCase()}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden" style={{ minHeight: "90vh" }}>
      {/* Background image */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1784271957949-76e3c3b8f45d?w=1800&h=1000&fit=crop&auto=format')" }}
      />
      {/* Light professional overlay — powder blue at low opacity so image breathes through */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, rgba(30,58,138,0.58) 0%, rgba(56,100,180,0.45) 45%, rgba(30,58,138,0.62) 100%)" }}
      />
      {/* Warm gold accent glow — top-left corner */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 50% at 15% 20%, rgba(184,149,42,0.10) 0%, transparent 70%)" }}
      />
      {/* Bottom fade — dissolves into white below so there's no harsh cut-off */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: "18%", background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.85))" }}
      />

      {/* Top gold rule */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${GOLD}, #F0C040, ${GOLD})` }} />

      <div className="relative z-10 max-w-screen-xl mx-auto px-4 lg:px-8 flex flex-col items-center justify-center text-center py-20 min-h-[90vh]">

        {/* VELS logo image above title */}
        <div className="mb-8 p-3 rounded-sm" style={{ background: "rgba(255,255,255,0.22)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.40)", boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}>
          <img
            src="/images/vels-logo-banner.jpg"
            alt="VELS Institute of Science, Technology & Advanced Studies"
            className="w-auto object-contain"
            style={{ maxHeight: "72px", maxWidth: "480px" }}
          />
        </div>

        {/* Hybrid badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 text-[10px] font-display tracking-[0.2em] border"
          style={{ borderColor: "rgba(184,149,42,0.6)", background: "rgba(184,149,42,0.15)", color: GOLD_LIGHT }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#4ADE80" }} />
          HYBRID MODE : PHYSICAL &amp; VIRTUAL
        </div>

        {/* Conference ID */}
        <div
          className="font-display font-bold mb-4"
          style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)", letterSpacing: "0.1em", color: "#fff", textShadow: "0 2px 24px rgba(10,20,60,0.55)" }}
        >
          ICICFA<span style={{ color: GOLD }}>–2025</span>
        </div>

        {/* Full title */}
        <p
          className="mb-3 max-w-4xl leading-snug font-display"
          style={{ fontSize: "clamp(0.85rem, 1.8vw, 1.15rem)", color: "rgba(255,255,255,0.92)", textShadow: "0 1px 6px rgba(10,20,60,0.4)" }}
        >
          An International Conference on
        </p>
        <h1
          className="font-display font-bold leading-tight mb-6 max-w-4xl"
          style={{ fontSize: "clamp(1.1rem, 2.4vw, 1.75rem)", color: GOLD_LIGHT, lineHeight: 1.45, textShadow: "0 1px 10px rgba(10,20,60,0.35)" }}
        >
          Intelligent Computing Frameworks for Autonomous AI:<br />
          Generative Models, Reasoning, and Adaptive Decision Making
        </h1>

        {/* Ornament */}
        <div className="flex items-center gap-3 mb-7">
          <div className="w-20 h-px" style={{ background: `linear-gradient(to right, transparent, ${GOLD})` }} />
          <div className="w-2 h-2 rotate-45" style={{ background: GOLD }} />
          <div className="w-20 h-px" style={{ background: `linear-gradient(to left, transparent, ${GOLD})` }} />
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap justify-center gap-6 text-xs font-display tracking-wider mb-10" style={{ color: "rgba(255,255,255,0.88)" }}>
          {[
            { icon: "📅", text: "DATE: DETAILS WILL BE GIVEN SOON" },
            { icon: "📍", text: "VISTAS, VELACHERY, CHENNAI" },
            { icon: "🏛", text: "PROCEEDINGS: IEEE / SCOPUS" },
          ].map((m, i) => (
            <div key={i} className="flex items-center gap-2" style={{ textShadow: "0 1px 4px rgba(10,20,60,0.4)" }}>
              <span style={{ color: GOLD }}>{m.icon}</span>
              {m.text}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#registration"
            className="px-8 py-3 font-display tracking-widest text-xs text-white transition-all duration-200 shadow-lg"
            style={{ background: GOLD, boxShadow: `0 4px 20px rgba(184,149,42,0.4)` }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#9A7A20"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = GOLD; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            REGISTER NOW
          </a>
          <a
            href="#cfp"
            className="px-8 py-3 font-display tracking-widest text-xs border transition-all duration-200"
            style={{ borderColor: GOLD, color: GOLD_LIGHT, backdropFilter: "blur(4px)", background: "rgba(184,149,42,0.08)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(184,149,42,0.22)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(184,149,42,0.08)"; }}
          >
            SUBMIT PAPER
          </a>
          <a
            href="#"
            className="px-8 py-3 font-display tracking-widest text-xs border transition-all duration-200 flex items-center gap-2"
            style={{ borderColor: "rgba(200,220,255,0.35)", color: "rgba(200,220,255,0.85)", backdropFilter: "blur(4px)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(200,220,255,0.7)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(200,220,255,0.35)"; e.currentTarget.style.color = "rgba(200,220,255,0.85)"; }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            BROCHURE
          </a>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: 0.6 }}>
        <div className="w-px h-8" style={{ background: `linear-gradient(to bottom, ${GOLD}, transparent)` }} />
        <div className="w-1.5 h-1.5 rotate-45" style={{ background: GOLD }} />
      </div>
    </section>
  );
}

// ─── Partners Strip ───────────────────────────────────────────────────────────

function PartnersStrip() {
  const partners = [
    "IEEE Technical Sponsor",
    "Scopus Indexed Proceedings",
    "UGC Recognised",
    "NAAC 'A+' Institution",
    "AICTE Approved",
    "Anna University Affiliated",
  ];
  return (
    <div className="border-y py-5" style={{ borderColor: "#E5E7EB", background: "#fff" }}>
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4">
          {partners.map((p, i) => (
            <div key={i} className="flex items-center gap-2 text-xs font-display tracking-wider" style={{ color: NAVY }}>
              <span style={{ color: GOLD }}>◆</span>
              {p}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── About Conference ─────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Text */}
          <div>
            <SectionLabel>ABOUT THE CONFERENCE</SectionLabel>
            <SectionHeading>ICICFA 2025</SectionHeading>
            <div className="mt-8 space-y-4 text-gray-600 leading-relaxed text-sm">
              <p>
                The <strong className="text-gray-900">International Conference on Intelligent Computing
                Frameworks for Autonomous AI (ICICFA 2025)</strong> is organized by the School of
                Computing Sciences &amp; Engineering, Vels Institute of Science, Technology &amp;
                Advanced Studies (VISTAS), Chennai.
              </p>
              <p>
                This premier forum brings together eminent researchers, academicians, scientists, and
                industry practitioners worldwide to exchange cutting-edge innovations in autonomous AI,
                generative models, intelligent reasoning, and adaptive decision-making frameworks.
              </p>
              <p>
                ICICFA 2025 fosters multidisciplinary dialogue and advances responsible development of
                next-generation AI systems. The proceedings will be submitted for indexing in IEEE Xplore
                and Scopus.
              </p>
            </div>

            {/* Accreditation badges */}
            <div className="flex flex-wrap gap-3 mt-8">
              {["IEEE", "Scopus", "UGC", "NAAC 'A+'", "Web of Science"].map((b) => (
                <div
                  key={b}
                  className="px-4 py-2 border text-xs font-display tracking-widest"
                  style={{ borderColor: GOLD, color: NAVY }}
                >
                  {b}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex gap-4 mt-8">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-display tracking-widest text-white transition-all"
                style={{ background: NAVY }}
                onMouseEnter={(e) => (e.currentTarget.style.background = NAVY_DARK)}
                onMouseLeave={(e) => (e.currentTarget.style.background = NAVY)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                DOWNLOAD BROCHURE
              </a>
              <a
                href="#cfp"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-display tracking-widest border transition-all"
                style={{ borderColor: NAVY, color: NAVY }}
                onMouseEnter={(e) => { e.currentTarget.style.background = NAVY; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = NAVY; }}
              >
                CALL FOR PAPERS
              </a>
            </div>
          </div>

          {/* Stats + image */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: "8+", label: "Keynote Speakers" },
                { n: "12", label: "Research Tracks" },
                { n: "4", label: "Countries" },
                { n: "2", label: "Conference Days" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="p-6 text-center"
                  style={{ borderTop: `3px solid ${GOLD}`, background: "#F8F9FC" }}
                >
                  <div className="font-display font-bold text-3xl mb-1" style={{ color: NAVY }}>{s.n}</div>
                  <div className="text-xs tracking-wider text-gray-500 font-display">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="relative overflow-hidden rounded-none" style={{ height: "200px" }}>
              <img
                src="https://images.unsplash.com/photo-1680084521816-cc1ad0433ceb?w=800&h=400&fit=crop&auto=format"
                alt="Vels University campus"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute bottom-0 left-0 right-0 px-5 py-3"
                style={{ background: "rgba(15,27,56,0.88)" }}
              >
                <div className="font-display text-xs tracking-wider text-white">
                  VELS INSTITUTE OF SCIENCE, TECHNOLOGY &amp; ADVANCED STUDIES
                </div>
                <div className="text-[11px] mt-0.5" style={{ color: GOLD }}>
                  Velachery, Chennai – 600 117, Tamil Nadu, India
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Important Dates ──────────────────────────────────────────────────────────

function ImportantDatesSection() {
  return (
    <div className="py-14" style={{ background: "#F0F4FA" }}>
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <SectionLabel>TIMELINE</SectionLabel>
          <SectionHeading center>IMPORTANT DATES</SectionHeading>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {IMPORTANT_DATES.map((item, i) => (
            <div key={i} className="bg-white p-5 border-l-4 shadow-sm" style={{ borderLeftColor: GOLD }}>
              <div className="text-xs tracking-widest font-display mb-2" style={{ color: GOLD }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="font-semibold text-sm mb-1" style={{ color: NAVY }}>{item.event}</div>
              <div className="text-sm text-gray-400 italic">{item.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Speakers ─────────────────────────────────────────────────────────────────

function SpeakerCard({ name, affiliation, country, initials, dark = false }: {
  name: string; affiliation: string; country: string; initials: string; dark?: boolean;
}) {
  return (
    <div
      className="group border overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
      style={{ borderColor: "#E5E7EB" }}
    >
      {/* Avatar */}
      <div
        className="h-36 flex flex-col items-center justify-center relative"
        style={{ background: dark ? NAVY : "#F0F4FA" }}
      >
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center border-2"
          style={{ borderColor: GOLD, background: dark ? "#2D4A7A" : NAVY }}
        >
          <span className="font-display font-bold text-2xl text-white">{initials}</span>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 text-center py-1 text-[9px] font-display tracking-widest"
          style={{ background: GOLD, color: "#fff" }}
        >
          {country.toUpperCase()}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 bg-white">
        <h3 className="font-display font-semibold text-[13px] leading-snug mb-1" style={{ color: NAVY }}>
          {name}
        </h3>
        <p className="text-[11px] text-gray-500 leading-relaxed">{affiliation}</p>
        <div className="flex items-center gap-1 mt-3 text-[10px]" style={{ color: GOLD }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <span className="italic">Details will be given soon</span>
        </div>
      </div>
    </div>
  );
}

function SpeakersSection() {
  return (
    <section id="speakers" className="py-20 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <SectionLabel>DISTINGUISHED FACULTY</SectionLabel>
          <SectionHeading center>KEYNOTE SPEAKERS</SectionHeading>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px" style={{ background: GOLD }} />
            <h3 className="font-display text-xs tracking-[0.2em]" style={{ color: NAVY }}>
              INTERNATIONAL EXPERTS
            </h3>
            <div className="flex-1 h-px" style={{ background: "#E5E7EB" }} />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INTERNATIONAL_SPEAKERS.map((s) => <SpeakerCard key={s.name} {...s} />)}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px" style={{ background: GOLD }} />
            <h3 className="font-display text-xs tracking-[0.2em]" style={{ color: NAVY }}>
              INDIAN EXPERTS
            </h3>
            <div className="flex-1 h-px" style={{ background: "#E5E7EB" }} />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {INDIAN_SPEAKERS.map((s) => <SpeakerCard key={s.name} {...s} dark />)}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── About Vels University ────────────────────────────────────────────────────

function AboutVelsSection() {
  return (
    <section className="py-20" style={{ background: NAVY }}>
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-xs tracking-[0.25em] font-display mb-3" style={{ color: GOLD }}>
              HOST INSTITUTION
            </div>
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-white mb-0">
              ABOUT VISTAS
              <div className="mt-3 h-[3px] w-14" style={{ background: GOLD }} />
            </h2>
            <div className="mt-8 space-y-4 text-sm leading-relaxed" style={{ color: "#CBD5E1" }}>
              <p>
                Vels Institute of Science, Technology &amp; Advanced Studies (VISTAS) is a Deemed-to-be
                University established under Section 3 of the UGC Act, 1956. Located in the heart of
                Chennai, VISTAS is recognised by the University Grants Commission (UGC) of India and
                accredited with <strong className="text-white">NAAC 'A+' Grade</strong>.
              </p>
              <p>
                The institution offers a wide spectrum of undergraduate, postgraduate, and doctoral
                programmes across Engineering, Science, Management, Law, Allied Health Sciences, and
                Humanities. VISTAS has forged international partnerships with universities across
                Malaysia, the United Kingdom, the United States, and Australia.
              </p>
              <p>
                The <strong className="text-white">School of Computing Sciences &amp; Engineering</strong> at
                VISTAS is a hub of research excellence, consistently producing high-impact publications
                and fostering industry-academia collaboration in AI, Data Science, and Emerging Technologies.
              </p>
            </div>
          </div>

          {/* Highlights grid */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "🏛", label: "Established", value: "1992" },
              { icon: "🎓", label: "Status", value: "Deemed University" },
              { icon: "⭐", label: "NAAC Grade", value: "'A+'" },
              { icon: "🌐", label: "Int'l Partners", value: "20+ Countries" },
              { icon: "📚", label: "Programmes", value: "200+" },
              { icon: "👨‍🎓", label: "Alumni", value: "50,000+" },
            ].map((item) => (
              <div
                key={item.label}
                className="p-5 border"
                style={{ borderColor: "rgba(184,149,42,0.25)", background: "rgba(255,255,255,0.04)" }}
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-display font-bold text-white text-base">{item.value}</div>
                <div className="text-xs font-display tracking-wider mt-1" style={{ color: GOLD }}>
                  {item.label.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Schedule ─────────────────────────────────────────────────────────────────

function ScheduleSection() {
  const [day, setDay] = useState(0);

  const sessions = [
    [
      { time: "TBA", title: "Inauguration Ceremony & Welcome Address", type: "ceremony" },
      { time: "TBA", title: "Keynote I — International Speaker", type: "keynote" },
      { time: "TBA", title: "Session I: Generative Models & LLMs", type: "session" },
      { time: "TBA", title: "Lunch Break", type: "break" },
      { time: "TBA", title: "Session II: Autonomous Decision Systems", type: "session" },
      { time: "TBA", title: "Panel Discussion: Future of Autonomous AI", type: "panel" },
      { time: "TBA", title: "Cultural Evening & Networking Dinner", type: "networking" },
    ],
    [
      { time: "TBA", title: "Keynote II — Indian Expert", type: "keynote" },
      { time: "TBA", title: "Session III: Adaptive Reasoning Frameworks", type: "session" },
      { time: "TBA", title: "Session IV: AI Ethics & Trustworthy Systems", type: "session" },
      { time: "TBA", title: "Lunch Break", type: "break" },
      { time: "TBA", title: "Workshop / Hands-on Tutorial", type: "workshop" },
      { time: "TBA", title: "Best Paper Award Ceremony", type: "ceremony" },
      { time: "TBA", title: "Valedictory Function", type: "ceremony" },
    ],
  ];

  const typeStyle: Record<string, { bg: string; text: string }> = {
    ceremony: { bg: "#FEF3C7", text: "#92400E" },
    keynote: { bg: "#EFF6FF", text: NAVY },
    session: { bg: "#F0F9FF", text: "#0C4A6E" },
    break: { bg: "#F9FAFB", text: "#6B7280" },
    panel: { bg: "#F5F3FF", text: "#5B21B6" },
    workshop: { bg: "#ECFDF5", text: "#065F46" },
    networking: { bg: "#FFF1F2", text: "#9F1239" },
  };

  return (
    <section id="schedule" className="py-20" style={{ background: "#F0F4FA" }}>
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <SectionLabel>PROGRAMME</SectionLabel>
          <SectionHeading center>CONFERENCE SCHEDULE</SectionHeading>
          <p className="text-xs text-gray-400 mt-4 italic font-display tracking-wider">
            Detailed schedule with exact timings will be given soon
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-10">
          {["Day 1", "Day 2"].map((d, i) => (
            <button
              key={i}
              onClick={() => setDay(i)}
              className="px-10 py-3 font-display text-xs tracking-widest border transition-all duration-150"
              style={
                day === i
                  ? { background: NAVY, borderColor: NAVY, color: "#fff" }
                  : { background: "#fff", borderColor: NAVY, color: NAVY }
              }
            >
              {d.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="max-w-3xl mx-auto space-y-1">
          {sessions[day].map((item, i) => (
            <div
              key={i}
              className="flex items-stretch gap-0 bg-white border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow"
            >
              {/* Time col */}
              <div
                className="w-20 flex-shrink-0 flex flex-col items-center justify-center text-center px-2 py-4"
                style={{ background: NAVY, color: GOLD }}
              >
                <span className="font-display text-[10px] tracking-wider">{item.time}</span>
              </div>
              {/* Type strip */}
              <div className="w-1 flex-shrink-0" style={{ background: item.type === "keynote" ? GOLD : item.type === "ceremony" ? "#F59E0B" : item.type === "break" ? "#D1D5DB" : item.type === "panel" ? "#8B5CF6" : item.type === "workshop" ? "#10B981" : item.type === "networking" ? "#F43F5E" : "#3B82F6" }} />
              {/* Content */}
              <div className="flex-1 px-5 py-4 flex items-center justify-between gap-4">
                <span className="font-semibold text-sm" style={{ color: NAVY }}>{item.title}</span>
                <span
                  className="flex-shrink-0 text-[9px] font-display tracking-widest px-2 py-1"
                  style={{ background: typeStyle[item.type].bg, color: typeStyle[item.type].text }}
                >
                  {item.type.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Call for Papers ──────────────────────────────────────────────────────────

function CallForPapersSection() {
  return (
    <section id="cfp" className="py-20 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <SectionLabel>TOPICS OF INTEREST</SectionLabel>
            <SectionHeading>CALL FOR PAPERS</SectionHeading>
            <p className="text-sm text-gray-600 mt-8 mb-6 leading-relaxed">
              ICICFA 2025 invites original, unpublished research contributions in (but not limited to):
            </p>
            <div className="space-y-3">
              {RESEARCH_TRACKS.map((track, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <div
                    className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-[10px] font-display font-bold text-white mt-0.5"
                    style={{ background: NAVY }}
                  >
                    {i + 1}
                  </div>
                  <span className="text-gray-700 leading-relaxed">{track}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionLabel>SUBMISSION DETAILS</SectionLabel>
            <SectionHeading>PAPER SUBMISSION</SectionHeading>
            <div className="space-y-6 mt-8">
              {[
                { title: "Paper Length", icon: "📄", detail: "Full papers: 6–8 pages | Short papers: 4–5 pages (IEEE double-column format)" },
                { title: "Formatting", icon: "🖨", detail: "IEEE conference template (LaTeX or MS Word). Template link will be provided soon." },
                { title: "Originality", icon: "✅", detail: "Submissions must be original and not under review elsewhere. Plagiarism will be checked via iThenticate." },
                { title: "Review Process", icon: "🔍", detail: "Double-blind peer review by a minimum of three domain experts from the Technical Programme Committee." },
                { title: "Submission Portal", icon: "🌐", detail: "Microsoft CMT. Portal link will be given soon." },
                { title: "Plagiarism Policy", icon: "⚠️", detail: "Similarity index must be below 15% (excluding references). Papers exceeding the threshold will be rejected without review." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 pb-4 border-b" style={{ borderColor: "#F0F4FA" }}>
                  <div className="text-xl flex-shrink-0 mt-0.5">{item.icon}</div>
                  <div>
                    <div className="font-display font-semibold text-xs tracking-wider mb-1" style={{ color: NAVY }}>
                      {item.title.toUpperCase()}
                    </div>
                    <div className="text-sm text-gray-600">{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 mt-6 px-8 py-3 font-display tracking-widest text-xs text-white transition-all"
              style={{ background: NAVY }}
              onMouseEnter={(e) => (e.currentTarget.style.background = NAVY_DARK)}
              onMouseLeave={(e) => (e.currentTarget.style.background = NAVY)}
            >
              SUBMIT VIA CMT PORTAL
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Publications ─────────────────────────────────────────────────────────────

function PublicationsSection() {
  return (
    <section id="publications" className="py-20" style={{ background: "#F0F4FA" }}>
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <SectionLabel>PROCEEDINGS</SectionLabel>
          <SectionHeading center>PUBLICATIONS</SectionHeading>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              publisher: "IEEE Xplore",
              scope: "IEEE Indexed",
              icon: "📡",
              detail: "Accepted papers will be submitted for publication in IEEE Xplore Digital Library, pending review and approval.",
            },
            {
              publisher: "Scopus Journal",
              scope: "Scopus Indexed",
              icon: "🔬",
              detail: "Extended versions of selected papers will be invited for submission to Scopus-indexed special issue journals.",
            },
            {
              publisher: "UGC CARE Listed",
              scope: "UGC Listed",
              icon: "🏛",
              detail: "Papers not accepted for IEEE publication will be considered for UGC CARE-listed journals. Details will be given soon.",
            },
          ].map((pub, i) => (
            <div
              key={i}
              className="bg-white p-7 border-t-4 shadow-sm transition-all hover:shadow-md"
              style={{ borderTopColor: GOLD }}
            >
              <div className="text-3xl mb-4">{pub.icon}</div>
              <div className="font-display font-bold text-base mb-1" style={{ color: NAVY }}>{pub.publisher}</div>
              <div
                className="text-[10px] font-display tracking-widest mb-4 px-2 py-1 inline-block"
                style={{ background: GOLD_PALE, color: "#92400E" }}
              >
                {pub.scope}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">{pub.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Author Guidelines ────────────────────────────────────────────────────────

function GuidelinesSection() {
  return (
    <section id="guidelines" className="py-20 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <SectionLabel>FOR AUTHORS</SectionLabel>
          <SectionHeading center>AUTHOR GUIDELINES</SectionHeading>
        </div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Template downloads */}
          <div>
            <h3 className="font-display font-semibold text-sm tracking-wider mb-5" style={{ color: NAVY }}>
              PAPER TEMPLATES
            </h3>
            {["IEEE LaTeX Template", "IEEE MS Word Template", "Copyright Form"].map((t) => (
              <a
                key={t}
                href="#"
                className="flex items-center justify-between gap-3 p-4 border-b text-sm transition-all hover:bg-gray-50"
                style={{ borderColor: "#E5E7EB" }}
              >
                <div className="flex items-center gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  <span style={{ color: NAVY }}>{t}</span>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
              </a>
            ))}
          </div>

          {/* Checklist */}
          <div>
            <h3 className="font-display font-semibold text-sm tracking-wider mb-5" style={{ color: NAVY }}>
              SUBMISSION CHECKLIST
            </h3>
            <div className="space-y-3">
              {[
                "Paper is formatted using IEEE template",
                "Abstract not exceeding 250 words",
                "Keywords: minimum 4, maximum 6",
                "Plagiarism below 15% (iThenticate)",
                "All author details are complete",
                "References follow IEEE citation style",
                "Figures and tables are numbered",
                "Paper submitted in PDF format",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-gray-700">
                  <div
                    className="w-4 h-4 flex-shrink-0 flex items-center justify-center mt-0.5 border"
                    style={{ borderColor: GOLD }}
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="3">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Sponsorship ──────────────────────────────────────────────────────────────

function SponsorshipSection() {
  return (
    <section id="sponsorship" className="py-20" style={{ background: "#F0F4FA" }}>
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <SectionLabel>PARTNER WITH US</SectionLabel>
          <SectionHeading center>SPONSORSHIP</SectionHeading>
          <p className="text-sm text-gray-500 mt-4">
            Associate your brand with a premier international AI conference. For sponsorship enquiries,
            contact us at <span style={{ color: NAVY }}>icicfa2025@velsuniv.ac.in</span>
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {SPONSORSHIP_TIERS.map((tier) => (
            <div
              key={tier.tier}
              className="bg-white border-t-4 p-7 shadow-sm transition-all hover:shadow-md"
              style={{ borderTopColor: tier.color }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 flex items-center justify-center font-display font-bold text-white text-sm"
                  style={{ background: tier.color }}
                >
                  {tier.tier[0]}
                </div>
                <div>
                  <div className="font-display font-bold text-base" style={{ color: NAVY }}>
                    {tier.tier}
                  </div>
                  <div className="text-xs italic text-gray-400">{tier.amount}</div>
                </div>
              </div>
              <ul className="space-y-2">
                {tier.perks.map((perk, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                    <span style={{ color: tier.color }} className="mt-0.5 flex-shrink-0">◆</span>
                    {perk}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 text-xs font-display tracking-widest border transition-all"
                style={{ borderColor: tier.color, color: tier.color }}
                onMouseEnter={(e) => { e.currentTarget.style.background = tier.color; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = tier.color; }}
              >
                ENQUIRE NOW
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Registration ─────────────────────────────────────────────────────────────

function RegistrationSection() {
  const categories = [
    { cat: "Research Scholars / Students (Indian)", early: "Details will be given soon", regular: "Details will be given soon", foreign: "Details will be given soon" },
    { cat: "Faculty / Academicians (Indian)", early: "Details will be given soon", regular: "Details will be given soon", foreign: "Details will be given soon" },
    { cat: "Industry Professionals (Indian)", early: "Details will be given soon", regular: "Details will be given soon", foreign: "Details will be given soon" },
    { cat: "Listeners / Attendees (Indian)", early: "Details will be given soon", regular: "Details will be given soon", foreign: "Details will be given soon" },
    { cat: "Foreign Delegates (USD)", early: "Details will be given soon", regular: "Details will be given soon", foreign: "—" },
  ];

  return (
    <section id="registration" className="py-20" style={{ background: NAVY }}>
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-xs tracking-[0.25em] font-display mb-3" style={{ color: GOLD }}>PARTICIPATION</div>
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-white mb-0 text-center">
            REGISTRATION
            <div className="mt-3 h-[3px] w-14 mx-auto" style={{ background: GOLD }} />
          </h2>
          <p className="text-xs mt-4 italic font-display tracking-wider" style={{ color: "#93C5FD" }}>
            Registration fees and portal will be activated soon. All amounts are inclusive of GST.
          </p>
        </div>

        {/* Fee table */}
        <div className="overflow-x-auto max-w-5xl mx-auto mb-12">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: GOLD }}>
                {["CATEGORY", "EARLY BIRD", "REGULAR", "FOREIGN (USD)"].map((h) => (
                  <th key={h} className="px-5 py-4 text-left font-display tracking-wider text-white text-[11px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map((row, i) => (
                <tr
                  key={i}
                  className="border-b transition-colors hover:bg-white/5"
                  style={{ borderColor: "rgba(255,255,255,0.08)", background: i % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent" }}
                >
                  <td className="px-5 py-4 font-semibold text-white text-xs">{row.cat}</td>
                  <td className="px-5 py-4 text-center text-xs italic" style={{ color: "#93C5FD" }}>{row.early}</td>
                  <td className="px-5 py-4 text-center text-xs italic" style={{ color: "#93C5FD" }}>{row.regular}</td>
                  <td className="px-5 py-4 text-center text-xs italic" style={{ color: "#93C5FD" }}>{row.foreign}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payment details */}
        <div className="max-w-5xl mx-auto mb-12">
          <h3 className="font-display font-semibold text-sm tracking-widest text-white mb-5">
            BANK PAYMENT DETAILS (NEFT / RTGS / IMPS)
          </h3>
          <div className="border overflow-hidden" style={{ borderColor: "rgba(184,149,42,0.3)" }}>
            {[
              { label: "Account Name", value: "Details will be given soon" },
              { label: "Bank Name", value: "Details will be given soon" },
              { label: "Branch", value: "Details will be given soon" },
              { label: "Account Number", value: "Details will be given soon" },
              { label: "IFSC Code", value: "Details will be given soon" },
              { label: "UPI ID", value: "Details will be given soon" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center"
                style={{ borderBottom: i < 5 ? "1px solid rgba(184,149,42,0.2)" : "none" }}
              >
                <div
                  className="w-48 flex-shrink-0 px-5 py-3 text-xs font-display tracking-wider"
                  style={{ background: "rgba(184,149,42,0.12)", color: GOLD }}
                >
                  {item.label.toUpperCase()}
                </div>
                <div className="px-5 py-3 text-xs italic" style={{ color: "#CBD5E1" }}>{item.value}</div>
              </div>
            ))}
          </div>
          <p className="text-xs mt-3 italic" style={{ color: "#64748B" }}>
            Note: Send payment proof to icicfa2025@velsuniv.ac.in with your full name, paper ID, and category.
          </p>
        </div>

        {/* Info boxes */}
        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {[
            { icon: "✅", title: "What's Included", text: "Conference kit, access to all sessions, certificate of participation, conference proceedings, and lunch/refreshments on both days." },
            { icon: "💳", title: "Online Payment", text: "Online payment portal details will be given soon. NEFT/RTGS and UPI transactions are also accepted." },
            { icon: "🕐", title: "Cancellation Policy", text: "Cancellation and refund policy details will be given soon. Please contact the secretariat for queries." },
          ].map((b) => (
            <div key={b.title} className="p-6 border" style={{ borderColor: "rgba(184,149,42,0.25)" }}>
              <div className="text-2xl mb-3">{b.icon}</div>
              <h4 className="font-display font-semibold text-sm text-white mb-2">{b.title}</h4>
              <p className="text-xs leading-relaxed" style={{ color: "#93C5FD" }}>{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Organizing Committee ─────────────────────────────────────────────────────

function CommitteeSection() {
  return (
    <section id="committee" className="py-20 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <SectionLabel>LEADERSHIP</SectionLabel>
          <SectionHeading center>ORGANIZING COMMITTEE</SectionHeading>
        </div>

        {/* Advisory board */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px" style={{ background: GOLD }} />
            <h3 className="font-display text-xs tracking-[0.2em]" style={{ color: NAVY }}>ADVISORY BOARD</h3>
            <div className="flex-1 h-px" style={{ background: "#E5E7EB" }} />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {["Chief Patron", "Patron", "Co-Patron", "Advisor"].map((role) => (
              <div key={role} className="border p-5" style={{ borderTop: `3px solid ${GOLD}`, borderColor: "#E5E7EB", borderTopColor: GOLD }}>
                <div className="text-[10px] tracking-widest font-display mb-2" style={{ color: GOLD }}>{role.toUpperCase()}</div>
                <div className="font-semibold text-xs italic text-gray-500">Details will be given soon</div>
              </div>
            ))}
          </div>
        </div>

        {/* Core committee */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px" style={{ background: GOLD }} />
            <h3 className="font-display text-xs tracking-[0.2em]" style={{ color: NAVY }}>CORE COMMITTEE</h3>
            <div className="flex-1 h-px" style={{ background: "#E5E7EB" }} />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {["Conference Chair", "Conference Co-Chair", "Technical Programme Chair", "Publication Chair", "Finance Chair", "Hospitality & Logistics Chair"].map((role) => (
              <div key={role} className="border p-5" style={{ borderColor: "#E5E7EB" }}>
                <div className="text-[10px] tracking-widest font-display mb-2" style={{ color: GOLD }}>{role.toUpperCase()}</div>
                <div className="font-semibold text-xs italic text-gray-500">Details will be given soon</div>
                <div className="text-[11px] text-gray-400 mt-1">School of Computing Sciences &amp; Engineering</div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical committee note */}
        <div className="border p-6 max-w-2xl mx-auto text-center" style={{ borderColor: "#E5E7EB", background: "#F8F9FC" }}>
          <div className="font-display text-xs tracking-widest mb-2" style={{ color: NAVY }}>TECHNICAL PROGRAMME COMMITTEE</div>
          <p className="text-sm text-gray-500 italic">
            The Technical Programme Committee includes reviewers from leading institutions in India and
            abroad. Full committee list will be given soon.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── About Chennai ────────────────────────────────────────────────────────────

function AboutChennaiSection() {
  return (
    <section className="py-20" style={{ background: "#F0F4FA" }}>
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <SectionLabel>DESTINATION</SectionLabel>
          <SectionHeading center>ABOUT CHENNAI</SectionHeading>
          <p className="text-sm text-gray-500 mt-4 max-w-2xl mx-auto">
            Chennai — the "Gateway to South India" — is a vibrant metropolitan city and cultural capital
            of Tamil Nadu, with a rich history, world-class hospitality, and excellent international
            connectivity.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CHENNAI_PLACES.map((place) => (
            <div key={place.name} className="group overflow-hidden relative" style={{ height: "240px" }}>
              <img
                src={place.img}
                alt={place.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 flex flex-col justify-end p-4"
                style={{ background: "linear-gradient(to top, rgba(11,20,42,0.90) 0%, transparent 60%)" }}
              >
                <div className="font-display font-bold text-sm text-white">{place.name}</div>
                <div className="text-xs mt-0.5" style={{ color: GOLD_LIGHT }}>{place.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 border p-6 bg-white max-w-3xl mx-auto" style={{ borderColor: "#E5E7EB" }}>
          <div className="font-display text-xs tracking-widest mb-3" style={{ color: NAVY }}>GETTING HERE</div>
          <div className="grid sm:grid-cols-3 gap-5 text-sm">
            {[
              { icon: "✈️", mode: "By Air", detail: "Chennai International Airport (MAA) — 16 km from venue. Direct flights from all major cities." },
              { icon: "🚂", mode: "By Train", detail: "Chennai Central / Chennai Egmore. Well-connected to all major Indian cities via express trains." },
              { icon: "🚌", mode: "By Road", detail: "Excellent road connectivity via NH-32. CMBT bus terminus is 8 km from the venue." },
            ].map((t) => (
              <div key={t.mode} className="flex gap-3">
                <span className="text-xl flex-shrink-0">{t.icon}</span>
                <div>
                  <div className="font-semibold text-xs mb-1" style={{ color: NAVY }}>{t.mode}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{t.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <SectionLabel>GET IN TOUCH</SectionLabel>
          <SectionHeading center>CONTACT US</SectionHeading>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          <div className="lg:col-span-2 space-y-7">
            <div>
              <h3 className="font-display font-semibold text-xs tracking-widest mb-5" style={{ color: NAVY }}>
                CONFERENCE SECRETARIAT
              </h3>
              {[
                {
                  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                  label: "Address",
                  value: "Vels Institute of Science, Technology & Advanced Studies\nPallavaram–Thoraipakkam 200 Feet Radial Road\nVelachery, Chennai – 600 117, Tamil Nadu",
                },
                {
                  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                  label: "Email",
                  value: "icicfa2025@velsuniv.ac.in",
                },
                {
                  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.55a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
                  label: "Phone",
                  value: "Details will be given soon",
                },
                {
                  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
                  label: "Website",
                  value: "www.velsuniv.ac.in",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <div className="mt-0.5 flex-shrink-0" style={{ color: GOLD }}>{item.icon}</div>
                  <div>
                    <div className="text-[10px] tracking-widest font-display mb-0.5" style={{ color: GOLD }}>{item.label.toUpperCase()}</div>
                    <div className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div
              className="overflow-hidden flex items-center justify-center border"
              style={{ height: "160px", background: "#F0F4FA", borderColor: "#E5E7EB" }}
            >
              <a
                href="https://maps.google.com/?q=Vels+University+Chennai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-xs font-display tracking-wider transition-all"
                style={{ color: NAVY }}
                onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                onMouseLeave={(e) => (e.currentTarget.style.color = NAVY)}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                VIEW ON GOOGLE MAPS
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-12 border" style={{ borderColor: GOLD }}>
                <div style={{ color: GOLD }} className="mb-4">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h3 className="font-display font-bold text-xl mb-2" style={{ color: NAVY }}>Message Sent</h3>
                <p className="text-sm text-gray-500">Thank you for reaching out. The secretariat will respond within 48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: "FULL NAME", key: "name", type: "text", ph: "Your full name" },
                    { label: "EMAIL ADDRESS", key: "email", type: "email", ph: "you@example.com" },
                  ].map(({ label, key, type, ph }) => (
                    <div key={key}>
                      <label className="text-[10px] tracking-widest font-display block mb-2" style={{ color: NAVY }}>
                        {label} *
                      </label>
                      <input
                        type={type}
                        required
                        placeholder={ph}
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full border text-sm px-4 py-3 outline-none transition-all focus:border-blue-400"
                        style={{ borderColor: "#E5E7EB" }}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="text-[10px] tracking-widest font-display block mb-2" style={{ color: NAVY }}>
                    SUBJECT *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Query subject"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full border text-sm px-4 py-3 outline-none transition-all focus:border-blue-400"
                    style={{ borderColor: "#E5E7EB" }}
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-widest font-display block mb-2" style={{ color: NAVY }}>
                    MESSAGE *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Your message..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border text-sm px-4 py-3 outline-none transition-all resize-none focus:border-blue-400"
                    style={{ borderColor: "#E5E7EB" }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 font-display tracking-widest text-xs text-white transition-all"
                  style={{ background: NAVY }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = NAVY_DARK)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = NAVY)}
                >
                  SEND MESSAGE
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: NAVY_DARK }}>
      <div className="h-1" style={{ background: `linear-gradient(90deg, ${GOLD}, #F0C040, ${GOLD})` }} />
      <div className="max-w-screen-xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            {/* White-background pill to display logo clearly on dark footer */}
            <div className="inline-block px-3 py-2 rounded-sm mb-4" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
              <img src="/images/vels-shield.jpg" alt="VELS Crest" className="h-12 w-auto object-contain" />
            </div>
            <div className="font-display font-bold text-white text-xs tracking-wider mb-1">VELS INSTITUTE OF SCIENCE,</div>
            <div className="font-display font-bold text-white text-xs tracking-wider">TECHNOLOGY &amp; ADVANCED STUDIES</div>
            <p className="text-xs leading-relaxed mt-3 max-w-xs" style={{ color: "#94A3B8" }}>
              Vels Institute of Science, Technology &amp; Advanced Studies (VISTAS) is a Deemed-to-be
              University under Section 3 of the UGC Act 1956. NAAC Accredited with 'A+' Grade.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {["UGC", "NAAC 'A+'", "AICTE", "NBA"].map((b) => (
                <span key={b} className="text-[9px] font-display tracking-widest px-2 py-1 border" style={{ borderColor: "rgba(184,149,42,0.3)", color: "#94A3B8" }}>{b}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-[10px] tracking-widest text-white mb-4">QUICK LINKS</h4>
            <div className="space-y-2">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="block text-xs transition-all hover:text-white" style={{ color: "#64748B" }}>
                  › {link.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-display text-[10px] tracking-widest text-white mb-4">CONFERENCE INFO</h4>
            <div className="space-y-2 text-xs" style={{ color: "#64748B" }}>
              <div>Code: <span className="text-white font-semibold">ICICFA-2025</span></div>
              <div>Mode: <span className="text-white">Hybrid (Physical &amp; Virtual)</span></div>
              <div>Venue: <span className="text-white">VISTAS, Chennai</span></div>
              <div>Date: <em>Details will be given soon</em></div>
              <div className="pt-2">
                <div>Email:</div>
                <div className="text-white">icicfa2025@velsuniv.ac.in</div>
              </div>
              <div>
                <div>Website:</div>
                <div className="text-white">www.velsuniv.ac.in</div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="border-t pt-6 flex flex-wrap items-center justify-between gap-4 text-xs"
          style={{ borderColor: "rgba(255,255,255,0.07)", color: "#475569" }}
        >
          <span>© 2025 ICICFA — Vels Institute of Science, Technology &amp; Advanced Studies, Chennai. All Rights Reserved.</span>
          <span
            className="font-display tracking-[0.2em] text-[10px]"
            style={{ color: GOLD }}
          >
            ICICFA – 2025
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-full flex flex-col">
      <Ticker />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <PartnersStrip />
        <AboutSection />
        <ImportantDatesSection />
        <SpeakersSection />
        <AboutVelsSection />
        <ScheduleSection />
        <CallForPapersSection />
        <PublicationsSection />
        <GuidelinesSection />
        <SponsorshipSection />
        <RegistrationSection />
        <CommitteeSection />
        <AboutChennaiSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
