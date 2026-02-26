"use client";
import React, { useState, useEffect, useRef } from "react";

/* ════════════════════════════════════════════════
   THEME  — dark charcoal + ice blue
════════════════════════════════════════════════ */
const C = {
  bg: "#161b22",
  bgDeep: "#0d1117",
  bgCard: "#1c2330",
  bgHover: "#222c3a",
  border: "rgba(56,139,253,0.12)",
  borderHov: "rgba(56,139,253,0.35)",
  blue: "#58a6ff",
  blueDeep: "#1f6feb",
  blueGlow: "rgba(88,166,255,0.18)",
  text: "#e6edf3",
  textMid: "#8b949e",
  textDim: "#484f58",
  white: "#ffffff",
};

/* ════════════════════════════════════════════════
   DATA
════════════════════════════════════════════════ */
const ROLES = [
  "Shopify Developer",
  "React Specialist",
  "Aspiring Full Stack Engineer",
];

const SKILLS = [
  { name: "HTML", pct: 90, cat: "Frontend" },
  { name: "CSS & Animation", pct: 85, cat: "Frontend" },
  { name: "Javascript", pct: 75, cat: "Backend" },
  { name: "React / Next.js", pct: 60, cat: "Frontend" },
  { name: "TypeScript", pct: 60, cat: "Frontend" },
  { name: "Node.js", pct: 60, cat: "Backend" },
  { name: "Prisma", pct: 50, cat: "Database" },
  { name: "MongoDB", pct: 50, cat: "Database" },
];

const PROJECTS = [
  {
    no: "01",
    name: "Unilever Professional India",
    tag: "Shopify · E-commerce",
    desc: "Enterprise Shopify store built for Unilever Professional India with a custom pincode-based delivery validation system to control product availability and logistics at checkout.",
    stack: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
    stat: "Custom Pincode Delivery System",
  },
  {
    no: "02",
    name: "Biogia",
    tag: "Shopify · Custom Theme",
    desc: "Shopify store built completely from scratch using Liquid templating along with HTML, CSS, and JavaScript. Fully custom theme development with tailored UI and performance optimization.",
    stack: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
    stat: "Custom Theme from Scratch",
  },
  {
    no: "03",
    name: "Hypershop (US)",
    tag: "Shopify · Electronics E-commerce",
    desc: "US-based electronics e-commerce store developed from scratch on Shopify. Implemented Checkout UI Extensions to enhance user experience and optimize the checkout flow.",
    stack: ["Shopify", "Liquid", "JavaScript", "Checkout UI Extensions"],
    stat: "Enhanced Checkout Experience",
  },
  {
    no: "04",
    name: "Konkrd",
    tag: "React · Insurance Platform",
    desc: "AI-powered insurance comparison platform built from scratch using React and MUI. Implemented dynamic forms, Redux state management, and intelligent recommendation logic based on user data captured via AI-driven chat interactions.",
    stack: ["React", "MUI", "Redux", "JavaScript"],
    stat: "AI-based Insurance Recommendation",
  },
];

const EXPERIENCE = [
  {
    role: "Senior Software Engineer",
    co: "TechCorp Inc.",
    period: "Jan 2022 — Present",
    loc: "San Francisco",
    desc: "Leading a team of six engineers on a distributed data platform serving 50M+ users. Cut infrastructure costs by 35% and pushed uptime to 99.98%. Also introduced proper PR reviews — still the most controversial decision I've made there.",
    tags: ["React", "Node.js", "AWS", "Kafka"],
  },
  {
    role: "Full Stack Developer",
    co: "Nexus Labs",
    period: "Mar 2020 — Dec 2021",
    loc: "Remote",
    desc: "Shipped four SaaS products from zero to revenue. Owned the frontend architecture, touched the backend constantly, and once restored a deleted staging database in twelve minutes — a personal record.",
    tags: ["Vue.js", "Python", "PostgreSQL", "Docker"],
  },
  {
    role: "Junior Developer",
    co: "Pixel Studio",
    period: "Jun 2018 — Feb 2020",
    loc: "Austin, TX",
    desc: "Built responsive apps for 20+ clients. Learned that 'make it pop' means something different to every single client, and that IE11 support is genuinely not worth the psychological damage.",
    tags: ["JavaScript", "React", "CSS", "PHP"],
  },
];

const EDUCATION = [
  {
    deg: "B.S. Computer Science",
    school: "UC Berkeley",
    period: "2014 – 2018",
    note: "Magna Cum Laude · GPA 3.8 · Thesis on adaptive load balancing in microservice architectures.",
    courses: ["Distributed Systems", "Algorithms", "OS Design", "HCI"],
  },
  {
    deg: "AWS Solutions Architect",
    school: "Amazon Web Services",
    period: "2021",
    note: "Professional Certification · Top 5th percentile globally. Three weeks of practice exams — not recommended for mental health.",
    courses: ["EC2 / S3 / RDS", "Lambda", "CloudFormation", "VPC"],
  },
];

const NAV = ["About", "Skills", "Projects", "Experience", "Education", "Contact"];

/* ════════════════════════════════════════════════
   HOOKS
════════════════════════════════════════════════ */
function useInView(threshold = 0.1): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setV(true); },
      { threshold }
    );
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [threshold]);
  return [ref, v];
}

function useTypewriter(words: string[], speed = 75, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[wi];
    const t = setTimeout(() => {
      if (!deleting) {
        setDisplay(word.slice(0, ci + 1));
        if (ci + 1 === word.length) setTimeout(() => setDeleting(true), pause);
        else setCi(c => c + 1);
      } else {
        setDisplay(word.slice(0, ci - 1));
        if (ci - 1 === 0) { setDeleting(false); setWi(w => (w + 1) % words.length); setCi(0); }
        else setCi(c => c - 1);
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [ci, deleting, wi, words, speed, pause]);
  return display;
}

/* ════════════════════════════════════════════════
   PARTICLES CANVAS
════════════════════════════════════════════════ */
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, raf = 0;
    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      r: number; alpha: number; life: number; maxLife: number;
    }> = [];

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const make = () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.4,
      alpha: Math.random() * 0.5 + 0.15,
      life: 0,
      maxLife: Math.random() * 400 + 200,
    });

    for (let i = 0; i < 90; i++) particles.push(make());

    const loop = () => {
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        if (p.life > p.maxLife || p.x < 0 || p.x > W || p.y < 0 || p.y > H) {
          particles[i] = make();
          continue;
        }

        const fade = Math.sin((p.life / p.maxLife) * Math.PI);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(88,166,255,${p.alpha * fade})`;
        ctx.fill();

        // draw lines to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(88,166,255,${0.07 * (1 - dist / 110) * fade})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}

/* ════════════════════════════════════════════════
   REVEAL WRAPPER
════════════════════════════════════════════════ */
function Reveal({
  children, delay = 0, from = "bottom",
}: {
  children: React.ReactNode; delay?: number; from?: "bottom" | "left" | "right";
}) {
  const [ref, visible] = useInView(0.1);
  const origins = { bottom: "translateY(36px)", left: "translateX(-36px)", right: "translateX(36px)" };
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : origins[from],
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════════
   SECTION LABEL
════════════════════════════════════════════════ */
function SectionLabel({ n, title }: { n: string; title: string }) {
  return (
    <Reveal>
      <div style={{ marginBottom: "3.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginBottom: "1rem" }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.85rem",
            color: C.blue,
            letterSpacing: "0.1em",
            opacity: 0.7,
          }}>
            {n}
          </span>
          <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, ${C.border}, transparent)` }} />
        </div>
        <h2 style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
          letterSpacing: "-0.04em",
          color: C.text,
          lineHeight: 1,
        }}>
          {title}
        </h2>
      </div>
    </Reveal>
  );
}

/* ════════════════════════════════════════════════
   SKILL BAR
════════════════════════════════════════════════ */
function SkillBar({ name, pct, cat, delay }: { name: string; pct: number; cat: string; delay: number }) {
  const [ref, visible] = useInView(0.2);
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "1.1rem 1.2rem",
        borderRadius: "10px",
        background: hov ? C.bgHover : "transparent",
        border: `1px solid ${hov ? C.borderHov : "transparent"}`,
        transition: "all 0.25s ease",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.6rem" }}>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: "1.05rem",
          color: hov ? C.text : "#c9d1d9",
          transition: "color 0.2s",
        }}>
          {name}
        </span>
        <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.72rem",
            color: C.textDim,
            letterSpacing: "0.06em",
          }}>
            {cat}
          </span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: "0.9rem",
            color: hov ? C.blue : C.textMid,
            transition: "color 0.2s",
          }}>
            {pct}%
          </span>
        </div>
      </div>
      <div style={{
        height: "5px",
        background: "rgba(255,255,255,0.06)",
        borderRadius: "99px",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          borderRadius: "99px",
          background: hov
            ? `linear-gradient(90deg, ${C.blueDeep}, ${C.blue})`
            : `linear-gradient(90deg, ${C.blueDeep}99, ${C.blue}88)`,
          width: visible ? `${pct}%` : "0%",
          transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
          boxShadow: hov ? `0 0 12px ${C.blueGlow}` : "none",
        }} />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   PROJECT CARD
════════════════════════════════════════════════ */
function ProjectCard({ p, i }: { p: typeof PROJECTS[0]; i: number }) {
  const [ref, visible] = useInView(0.08);
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? (hov ? "translateY(-5px)" : "none") : "translateY(30px)",
        transition: `opacity 0.65s ease ${i * 0.1}s, transform 0.3s cubic-bezier(0.16,1,0.3,1)`,
        background: hov ? C.bgHover : C.bgCard,
        border: `1px solid ${hov ? C.borderHov : C.border}`,
        borderRadius: "14px",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        cursor: "default",
        boxShadow: hov ? `0 12px 40px rgba(0,0,0,0.35), 0 0 0 1px ${C.borderHov}` : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* top blue line */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: "2px",
        background: `linear-gradient(90deg, ${C.blueDeep}, ${C.blue})`,
        opacity: hov ? 1 : 0.3,
        transition: "opacity 0.3s",
      }} />

      {/* header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "1.3rem",
          fontWeight: 700,
          color: hov ? C.blue : C.textDim,
          transition: "color 0.25s",
          lineHeight: 1,
        }}>
          {p.no}
        </span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.72rem",
          color: C.textDim,
          background: "rgba(88,166,255,0.08)",
          border: `1px solid ${C.border}`,
          padding: "0.2rem 0.65rem",
          borderRadius: "99px",
          letterSpacing: "0.05em",
        }}>
          {p.tag}
        </span>
      </div>

      {/* title */}
      <h3 style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800,
        fontSize: "1.55rem",
        letterSpacing: "-0.03em",
        color: C.text,
        lineHeight: 1.1,
      }}>
        {p.name}
      </h3>

      {/* desc */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "1rem",
        lineHeight: 1.75,
        color: C.textMid,
        flex: 1,
      }}>
        {p.desc}
      </p>

      {/* footer */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {p.stack.map(s => (
            <span key={s} style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.72rem",
              color: hov ? C.blue : C.textDim,
              background: hov ? "rgba(88,166,255,0.1)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${hov ? C.border : "rgba(255,255,255,0.06)"}`,
              padding: "0.2rem 0.6rem",
              borderRadius: "5px",
              transition: "all 0.2s",
            }}>
              {s}
            </span>
          ))}
        </div>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.75rem",
          color: hov ? C.blue : C.textDim,
          fontWeight: 600,
          transition: "color 0.2s",
          whiteSpace: "nowrap",
        }}>
          {p.stat}
        </span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   MAIN
════════════════════════════════════════════════ */
export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("About");
  const [scrolled, setScrolled] = useState(false);
  const [heroIn, setHeroIn] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openExp, setOpenExp] = useState<number>(0);
  const typed = useTypewriter(ROLES, 75, 2200);

  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveNav(e.target.id); }),
      { threshold: 0.25 }
    );
    NAV.forEach(n => { const el = document.getElementById(n); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const copyEmail = () => {
    navigator.clipboard.writeText("alex@carter.dev");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const years = new Date().getFullYear() - 2023;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800;900&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${C.bgDeep}; color: ${C.text}; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${C.blueDeep}; border-radius: 2px; }
        ::-webkit-scrollbar-track { background: ${C.bgDeep}; }
        ::selection { background: rgba(88,166,255,0.25); color: #fff; }

        @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes floatY    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes pulseRing { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(1.8);opacity:0} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
        @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
        @keyframes drawLine  { from{transform:scaleX(0)} to{transform:scaleX(1)} }

        .nav-btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          color: ${C.textMid};
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.3rem 0;
          transition: color 0.2s;
          position: relative;
          text-transform: uppercase;
        }
        .nav-btn:hover { color: ${C.text}; }
        .nav-btn.active { color: ${C.blue}; }
        .nav-btn.active::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0; right: 0;
          height: 2px;
          background: ${C.blue};
          border-radius: 1px;
          animation: drawLine 0.3s ease both;
          transform-origin: left;
          box-shadow: 0 0 8px ${C.blue};
        }

        .exp-card {
          background: ${C.bgCard};
          border: 1px solid ${C.border};
          border-radius: 12px;
          overflow: hidden;
          transition: border-color 0.25s;
        }
        .exp-card:hover { border-color: ${C.borderHov}; }

        .exp-header {
          padding: 1.6rem 2rem;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          user-select: none;
          transition: background 0.2s;
        }
        .exp-header:hover { background: rgba(88,166,255,0.04); }

        .edu-card {
          background: ${C.bgCard};
          border: 1px solid ${C.border};
          border-radius: 12px;
          padding: 2rem;
          transition: all 0.25s;
          height: 100%;
        }
        .edu-card:hover {
          border-color: ${C.borderHov};
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.3);
        }

        .chip {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          color: ${C.textDim};
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          padding: 0.22rem 0.65rem;
          border-radius: 5px;
          letter-spacing: 0.04em;
          transition: all 0.2s;
        }

        .cta-primary {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1rem;
          background: linear-gradient(135deg, ${C.blueDeep}, ${C.blue});
          color: #fff;
          border: none;
          padding: 0.9rem 2.2rem;
          border-radius: 8px;
          cursor: pointer;
          letter-spacing: -0.01em;
          transition: all 0.25s;
        }
        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(31,111,235,0.45);
        }

        .cta-ghost {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.8rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: transparent;
          color: ${C.textMid};
          border: 1px solid rgba(255,255,255,0.1);
          padding: 0.9rem 1.8rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.25s;
        }
        .cta-ghost:hover {
          color: ${C.text};
          border-color: rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.04);
        }

        .form-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 8px;
          padding: 0.9rem 1.1rem;
          color: ${C.text};
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-input:focus {
          border-color: rgba(88,166,255,0.45);
          box-shadow: 0 0 0 3px rgba(88,166,255,0.1);
        }
        .form-input::placeholder { color: ${C.textDim}; }

        @media (max-width: 860px) {
          .hero-cols   { flex-direction: column !important; }
          .skills-grid { grid-template-columns: 1fr !important; }
          .proj-grid   { grid-template-columns: 1fr !important; }
          .edu-grid    { grid-template-columns: 1fr !important; }
          .contact-grid{ grid-template-columns: 1fr !important; }
          .desk-only   { display: none !important; }
          .hero-name   { font-size: 4rem !important; }
        }
      `}</style>

      {/* ── BACKGROUND ── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        {/* radial glow blobs */}
        <div style={{ position: "absolute", top: "8%", right: "12%", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(31,111,235,0.09) 0%, transparent 65%)", animation: "floatY 10s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "12%", left: "-4%", width: 440, height: 440, borderRadius: "50%", background: "radial-gradient(circle, rgba(88,166,255,0.07) 0%, transparent 65%)", animation: "floatY 12s ease-in-out infinite 3s" }} />
        {/* subtle grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(88,166,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(88,166,255,0.025) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
      </div>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: 66,
        background: scrolled ? "rgba(13,17,23,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
        transition: "all 0.35s ease",
        display: "flex", alignItems: "center",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2.5rem", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* logo */}
          <div onClick={() => go("About")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "1.4rem", color: C.text, letterSpacing: "-0.04em" }}>BR</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: C.blue, opacity: 0.6 }}>.dev</span>
          </div>
          {/* links */}
          <div className="desk-only" style={{ display: "flex", gap: "2rem" }}>
            {NAV.map(n => (
              <button key={n} className={`nav-btn ${activeNav === n ? "active" : ""}`} onClick={() => go(n)}>{n}</button>
            ))}
          </div>
          {/* cta */}
          <button className="cta-primary" style={{ padding: "0.55rem 1.4rem", fontSize: "0.85rem" }} onClick={() => go("Contact")}>
            Hire Me →
          </button>
        </div>
      </nav>

      <main style={{ position: "relative", zIndex: 1 }}>

        {/* ════════════════════════════════
            HERO
        ════════════════════════════════ */}
        <section id="About" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "7rem 2.5rem 5rem", position: "relative", overflow: "hidden" }}>
          <Particles />

          <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
            {/* status pill */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "0.6rem",
              background: "rgba(88,166,255,0.08)", border: `1px solid ${C.border}`,
              borderRadius: "99px", padding: "0.4rem 1rem",
              marginBottom: "2.2rem",
              opacity: heroIn ? 1 : 0, transform: heroIn ? "none" : "translateY(12px)",
              transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
            }}>
              <span style={{ position: "relative", display: "inline-flex" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#3fb950", display: "block", boxShadow: "0 0 8px #3fb950" }} />
                <span style={{ position: "absolute", inset: -2, borderRadius: "50%", border: "2px solid #3fb950", animation: "pulseRing 1.8s ease-out infinite" }} />
              </span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: C.blue, letterSpacing: "0.06em" }}>
                Available for hire
              </span>
            </div>

            <div className="hero-cols" style={{ display: "flex", gap: "4rem", alignItems: "center" }}>
              {/* LEFT */}
              <div style={{ flex: 1 }}>
                {/* name */}
                <h1
                  className="hero-name"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 900,
                    fontSize: "clamp(4.5rem, 10vw, 7.5rem)",
                    letterSpacing: "-0.05em",
                    lineHeight: 0.93,
                    marginBottom: "1.5rem",
                    opacity: heroIn ? 1 : 0,
                    transform: heroIn ? "none" : "translateY(32px)",
                    transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s",
                  }}
                >
                  <span style={{ color: C.text, display: "block" }}>Bijin</span>
                  <span style={{
                    background: `linear-gradient(135deg, ${C.blue} 0%, #79c0ff 50%, ${C.blue} 100%)`,
                    backgroundSize: "200%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "block",
                    animation: heroIn ? "none" : undefined,
                  }}>
                    Raju
                  </span>
                </h1>

                {/* typewriter */}
                <div style={{
                  marginBottom: "1.8rem",
                  opacity: heroIn ? 1 : 0,
                  transform: heroIn ? "none" : "translateY(18px)",
                  transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  minHeight: "2.2rem",
                }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem", color: C.blue, opacity: 0.6 }}>~/</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(1rem, 2.5vw, 1.25rem)", fontWeight: 600, color: C.blue }}>
                    {typed}
                    <span style={{ animation: "blink 1s step-end infinite", borderRight: `2px solid ${C.blue}`, marginLeft: 2 }}>&nbsp;</span>
                  </span>
                </div>

                {/* bio */}
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "1.12rem",
                  lineHeight: 1.8,
                  color: C.textMid,
                  maxWidth: 520,
                  marginBottom: "0.8rem",
                  opacity: heroIn ? 1 : 0,
                  transform: heroIn ? "none" : "translateY(16px)",
                  transition: "opacity 0.7s ease 0.38s, transform 0.7s ease 0.38s",
                }}>
                  I build things for the web — fast, deliberate, and built to last.{" "}
                  {years}+ years of turning complex problems into clean solutions.
                </p>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.8rem",
                  color: C.textDim,
                  marginBottom: "2.5rem",
                  opacity: heroIn ? 1 : 0,
                  transition: "opacity 0.7s ease 0.44s",
                  fontStyle: "italic",
                }}>
                  Don{"'"}t mind the URL — not rich enough to afford a custom domain yet.
                </p>

                {/* buttons */}
                <div style={{
                  display: "flex", gap: "1rem", flexWrap: "wrap",
                  opacity: heroIn ? 1 : 0,
                  transform: heroIn ? "none" : "translateY(14px)",
                  transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s",
                }}>
                  <button className="cta-primary" onClick={() => go("Projects")}>See My Work</button>
                  <button className="cta-ghost" onClick={() => go("Contact")}>Get in Touch</button>
                </div>
              </div>

              {/* RIGHT — stats */}
              <div
                className="desk-only"
                style={{
                  flexShrink: 0,
                  width: 320,
                  opacity: heroIn ? 1 : 0,
                  transform: heroIn ? "none" : "translateX(30px)",
                  transition: "opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s",
                }}
              >
                <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "14px", padding: "2rem", backdropFilter: "blur(10px)" }}>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: C.textDim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                    quick.stats()
                  </p>
                  {[
                    { val: `${years}+`, label: "Years experience", desc: "still going" },
                    { val: "10+", label: "Projects shipped", desc: "and counting" },
                    { val: "12", label: "Repositories", desc: "some are good" },
                    { val: "2–3", label: "Coffees per day", desc: "occupational hazard" },
                  ].map((s, i) => (
                    <div key={s.label} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.2rem",
                      padding: "0.9rem 0",
                      borderBottom: i < 3 ? `1px solid ${C.border}` : "none",
                    }}>
                      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "2rem", color: C.text, letterSpacing: "-0.04em", minWidth: "3.5rem", lineHeight: 1 }}>{s.val}</span>
                      <div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "0.88rem", color: "#c9d1d9", lineHeight: 1.2 }}>{s.label}</div>
                        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: C.textDim, marginTop: "0.1rem" }}>{s.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            SKILLS
        ════════════════════════════════ */}
        <section id="Skills" style={{ padding: "6rem 2.5rem", borderTop: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <SectionLabel n="01 //" title="Skills" />
            <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem 3rem" }}>
              {SKILLS.map((s, i) => <SkillBar key={s.name} {...s} delay={i * 0.07} />)}
            </div>
            <Reveal delay={0.3}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.8rem",
                color: C.textDim,
                marginTop: "2.5rem",
                fontStyle: "italic",
              }}>
                {"// "} Also fluent in: git blame, rubber duck debugging, and convincing clients that CSS is genuinely hard.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════════
            PROJECTS
        ════════════════════════════════ */}
        <section id="Projects" style={{ padding: "6rem 2.5rem", borderTop: `1px solid ${C.border}`, background: "rgba(255,255,255,0.01)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <SectionLabel n="02 //" title="Projects" />
            <div className="proj-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
              {PROJECTS.map((p, i) => <ProjectCard key={p.no} p={p} i={i} />)}
            </div>
            <Reveal delay={0.2}>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.78rem",
                color: C.textDim,
                marginTop: "1.5rem",
                textAlign: "right",
                fontStyle: "italic",
              }}>
                {"// "} +3 more on GitHub — some brilliant, some humbling, all educational.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ════════════════════════════════
            EXPERIENCE
        ════════════════════════════════ */}
        <section id="Experience" style={{ padding: "6rem 2.5rem", borderTop: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <SectionLabel n="03 //" title="Experience" />
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {EXPERIENCE.map((e, i) => (
                <Reveal key={e.co} delay={i * 0.1} from="left">
                  <div className="exp-card">
                    <div className="exp-header" onClick={() => setOpenExp(openExp === i ? -1 : i)}>
                      <div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "0.8rem", flexWrap: "wrap", marginBottom: "0.3rem" }}>
                          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.2rem", color: C.text, letterSpacing: "-0.02em" }}>{e.role}</h3>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem", color: C.blue }}>@ {e.co}</span>
                        </div>
                        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: C.textDim }}>{e.period}</span>
                          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: C.textDim }}>· {e.loc}</span>
                        </div>
                      </div>
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "1rem",
                        transition: "transform 0.3s, color 0.2s",
                        transform: openExp === i ? "rotate(90deg)" : "none",
                        color: openExp === i ? C.blue : C.textDim,
                        flexShrink: 0,
                      }}>▶</span>
                    </div>

                    {/* expanded body */}
                    <div style={{
                      maxHeight: openExp === i ? "400px" : "0",
                      overflow: "hidden",
                      transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
                    }}>
                      <div style={{ padding: "0 2rem 1.8rem", borderTop: `1px solid ${C.border}` }}>
                        <p style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "1rem",
                          lineHeight: 1.8,
                          color: C.textMid,
                          margin: "1.2rem 0 1.2rem",
                        }}>
                          {e.desc}
                        </p>
                        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                          {e.tags.map(t => <span key={t} className="chip">{t}</span>)}
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            EDUCATION
        ════════════════════════════════ */}
        <section id="Education" style={{ padding: "6rem 2.5rem", borderTop: `1px solid ${C.border}`, background: "rgba(255,255,255,0.01)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <SectionLabel n="04 //" title="Education" />
            <div className="edu-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
              {EDUCATION.map((e, i) => (
                <Reveal key={e.school} delay={i * 0.12}>
                  <div className="edu-card">
                    <div style={{ height: "2px", background: `linear-gradient(90deg, ${C.blueDeep}, ${C.blue})`, borderRadius: 2, marginBottom: "1.6rem", opacity: 0.6 }} />
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: C.textDim, letterSpacing: "0.08em", display: "block", marginBottom: "0.6rem" }}>{e.period}</span>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.25rem", letterSpacing: "-0.02em", color: C.text, marginBottom: "0.3rem" }}>{e.deg}</h3>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.82rem", color: C.blue, marginBottom: "1.1rem", opacity: 0.8 }}>{e.school}</div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.95rem", color: C.textMid, lineHeight: 1.75, marginBottom: "1.2rem" }}>{e.note}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                      {e.courses.map(c => <span key={c} className="chip">{c}</span>)}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════
            CONTACT
        ════════════════════════════════ */}
        <section id="Contact" style={{ padding: "6rem 2.5rem 9rem", borderTop: `1px solid ${C.border}` }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <SectionLabel n="05 //" title="Contact" />
            <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>

              {/* LEFT */}
              <Reveal from="left">
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "1.1rem", color: C.textMid, lineHeight: 1.85, marginBottom: "2.5rem" }}>
                  Open to full-time roles and thoughtfully scoped freelance. I reply fast — unless deep in a debugging session, in which case I{"'"}ll surface eventually.
                </p>
                <div style={{ marginBottom: "2.5rem" }}>
                  {[
                    { k: "Email", v: "alex@carter.dev", col: C.blue },
                    { k: "Location", v: "San Francisco, CA", col: C.textMid },
                    { k: "Status", v: "Open · replies within 24h", col: "#3fb950" },
                  ].map(item => (
                    <div key={item.k} style={{ display: "flex", gap: "1.5rem", alignItems: "center", padding: "0.9rem 0", borderBottom: `1px solid ${C.border}` }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: C.textDim, letterSpacing: "0.1em", textTransform: "uppercase", minWidth: 64 }}>{item.k}</span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "1rem", color: item.col }}>{item.v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
                  <button
                    className="cta-primary"
                    onClick={copyEmail}
                    style={{ background: copied ? "linear-gradient(135deg,#3fb950,#26a641)" : undefined }}
                  >
                    {copied ? "✓ Copied!" : "Copy Email"}
                  </button>
                  <button className="cta-ghost">GitHub ↗</button>
                  <button className="cta-ghost">LinkedIn ↗</button>
                </div>
              </Reveal>

              {/* RIGHT — form */}
              <Reveal delay={0.15} from="right">
                <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "14px", overflow: "hidden" }}>
                  <div style={{ background: "rgba(88,166,255,0.06)", borderBottom: `1px solid ${C.border}`, padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    {["#ff5f57", "#ffbd2e", "#28c840"].map((c, i) => <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.8 }} />)}
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: C.textDim, marginLeft: "0.5rem" }}>new message.tsx</span>
                  </div>
                  <div style={{ padding: "1.8rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <input className="form-input" placeholder="Your name" />
                    <input className="form-input" placeholder="your@email.com" />
                    <textarea className="form-input" rows={4} placeholder="Tell me what you're building..." style={{ resize: "vertical" }} />
                    <button
                      className="cta-primary"
                      style={{ width: "100%", padding: "1rem", fontSize: "1rem", justifyContent: "center" }}
                    >
                      Send Message →
                    </button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "2rem 2.5rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "1.1rem", color: C.text, letterSpacing: "-0.03em" }}>
            AC<span style={{ color: C.blue }}>.dev</span>
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: C.textDim }}>
            {"// "}built with caffeine & occasional frustration · © {new Date().getFullYear()}
          </span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["GitHub", "LinkedIn", "Twitter"].map(s => (
              <span key={s}
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: C.textDim, cursor: "pointer", transition: "color 0.2s", textTransform: "uppercase", letterSpacing: "0.06em" }}
                onMouseEnter={e => (e.currentTarget.style.color = C.blue)}
                onMouseLeave={e => (e.currentTarget.style.color = C.textDim)}
              >{s}</span>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}