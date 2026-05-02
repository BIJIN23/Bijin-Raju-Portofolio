import { SKILLS } from "@/app/constants/portffolio";
import useInView from "@/hooks/useInView";
import C from "@/styles/theme";
import { useState } from "react";
import { SectionProps } from "@/types/portfolio";
function SkillBar({
  name,
  pct,
  cat,
  delay,
}: {
  name: string;
  pct: number;
  cat: string;
  delay: number;
}) {
  const [ref, visible] = useInView(0.2);
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={ref}
      // onMouseEnter={() => setHov(true)}
      // onMouseLeave={() => setHov(false)}
      style={{
        padding: "1.1rem 1.2rem",
        borderRadius: "10px",
        background: hov ? C.bgHover : "transparent",
        border: `1px solid ${hov ? C.borderHov : "transparent"}`,
        transition: "all 0.25s ease",
        cursor: "default",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "0.6rem",
        }}
      >
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: "1.05rem",
            color: hov ? C.text : "#c9d1d9",
            transition: "color 0.2s",
          }}
        >
          {name}
        </span>
        <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.72rem",
              color: C.textDim,
              letterSpacing: "0.06em",
            }}
          >
            {cat}
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: "0.9rem",
              color: hov ? C.blue : C.textMid,
              transition: "color 0.2s",
            }}
          >
            {pct}%
          </span>
        </div>
      </div>
      <div
        style={{
          height: "5px",
          background: "rgba(255,255,255,0.06)",
          borderRadius: "99px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: "99px",
            background: hov
              ? `linear-gradient(90deg, ${C.blueDeep}, ${C.blue})`
              : `linear-gradient(90deg, ${C.blueDeep}99, ${C.blue}88)`,
            width: visible ? `${pct}%` : "0%",
            transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
            boxShadow: hov ? `0 0 12px ${C.blueGlow}` : "none",
          }}
        />
      </div>
    </div>
  );
}

const Skills = ({ SectionLabel, Reveal }: SectionProps) => {
  return (
    <section
      id="Skills"
      style={{ padding: "6rem 2.5rem", borderTop: `1px solid ${C.border}` }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionLabel n="01 //" title="Skills" />
        <div
          className="skills-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.4rem 3rem",
          }}
        >
          {SKILLS.map((s, i) => (
            <SkillBar key={s.name} {...s} delay={i * 0.07} />
          ))}
        </div>
        <Reveal delay={0.3}>
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.8rem",
              color: C.textDim,
              marginTop: "2.5rem",
              fontStyle: "italic",
            }}
          >
            {"// "} Also fluent in: git blame, rubber duck debugging, and
            convincing clients that CSS is genuinely hard.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default Skills;
