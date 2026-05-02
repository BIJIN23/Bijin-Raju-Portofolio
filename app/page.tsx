"use client";
import React, { useState, useEffect, useRef } from "react";
import { ROLES, NAV } from "./constants/portffolio";
import useInView from "../hooks/useInView";
import useTypewriter from "@/hooks/useTypewriter";
import C from "@/styles/theme";
import NavBar from "@/components/portofolio/Navbar";
import Hero from "@/components/portofolio/Hero";
import Skills from "@/components/portofolio/Skills";
import Projects from "@/components/portofolio/Projects";
import Experience from "@/components/portofolio/Experience";
import Education from "@/components/portofolio/Education";
import Contact from "@/components/portofolio/Contact";
import Footer from "@/components/portofolio/Footer";

function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0,
      H = 0,
      raf = 0;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      alpha: number;
      life: number;
      maxLife: number;
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
          const dx = p.x - q.x,
            dy = p.y - q.y;
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
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
function Reveal({
  children,
  delay = 0,
  from = "bottom",
}: {
  children: React.ReactNode;
  delay?: number;
  from?: "bottom" | "left" | "right";
}) {
  const [ref, visible] = useInView(0.1);
  const origins = {
    bottom: "translateY(36px)",
    left: "translateX(-36px)",
    right: "translateX(36px)",
  };
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
function SectionLabel({ n, title }: { n: string; title: string }) {
  return (
    <Reveal>
      <div style={{ marginBottom: "3.5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.2rem",
            marginBottom: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.85rem",
              color: C.blue,
              letterSpacing: "0.1em",
              opacity: 0.7,
            }}
          >
            {n}
          </span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: `linear-gradient(90deg, ${C.border}, transparent)`,
            }}
          />
        </div>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2.4rem, 5vw, 3.6rem)",
            letterSpacing: "-0.04em",
            color: C.text,
            lineHeight: 1,
          }}
        >
          {title}
        </h2>
      </div>
    </Reveal>
  );
}
export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("About");
  const [scrolled, setScrolled] = useState(false);
  const [heroIn, setHeroIn] = useState(false);
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
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveNav(e.target.id);
        }),
      { threshold: 0.25 },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const years = new Date().getFullYear() - 2023;

  return (
    <>
      {/* ── BACKGROUND ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        {/* radial glow blobs */}
        <div
          style={{
            position: "absolute",
            top: "8%",
            right: "12%",
            width: 520,
            height: 520,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(31,111,235,0.09) 0%, transparent 65%)",
            animation: "floatY 10s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "12%",
            left: "-4%",
            width: 440,
            height: 440,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(88,166,255,0.07) 0%, transparent 65%)",
            animation: "floatY 12s ease-in-out infinite 3s",
          }}
        />
        {/* subtle grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(88,166,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(88,166,255,0.025) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>
      <NavBar scrolled={scrolled} go={go} activeNav={activeNav} />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero
          Particles={Particles}
          heroIn={heroIn}
          typed={typed}
          years={years}
          go={go}
        />
        <Skills SectionLabel={SectionLabel} Reveal={Reveal} />
        <Projects SectionLabel={SectionLabel} Reveal={Reveal} />
        <Experience SectionLabel={SectionLabel} Reveal={Reveal} />
        <Education SectionLabel={SectionLabel} Reveal={Reveal} />
        <Contact SectionLabel={SectionLabel} Reveal={Reveal} />
      </main>
      <Footer />
    </>
  );
}
