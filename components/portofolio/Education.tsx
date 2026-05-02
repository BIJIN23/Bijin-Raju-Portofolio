import { EDUCATION } from "@/app/constants/portffolio";
import C from "@/styles/theme";
import { SectionProps } from "@/types/portfolio";
const Education = ({ SectionLabel, Reveal }: SectionProps) => {
  return (
    <section
      id="Education"
      style={{
        padding: "6rem 2.5rem",
        borderTop: `1px solid ${C.border}`,
        background: "rgba(255,255,255,0.01)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionLabel n="04 //" title="Education" />
        <div
          className="edu-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.2rem",
          }}
        >
          {EDUCATION.map((e, i) => (
            <Reveal key={`${e.school}-${i}`} delay={i * 0.12}>
              <div className="edu-card">
                <div
                  style={{
                    height: "2px",
                    background: `linear-gradient(90deg, ${C.blueDeep}, ${C.blue})`,
                    borderRadius: 2,
                    marginBottom: "1.6rem",
                    opacity: 0.6,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.75rem",
                    color: C.textDim,
                    letterSpacing: "0.08em",
                    display: "block",
                    marginBottom: "0.6rem",
                  }}
                >
                  {e.period}
                </span>
                <h3
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.25rem",
                    letterSpacing: "-0.02em",
                    color: C.text,
                    marginBottom: "0.3rem",
                  }}
                >
                  {e.deg}
                </h3>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.82rem",
                    color: C.blue,
                    marginBottom: "1.1rem",
                    opacity: 0.8,
                  }}
                >
                  {e.school}
                </div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.95rem",
                    color: C.textMid,
                    lineHeight: 1.75,
                    marginBottom: "1.2rem",
                  }}
                >
                  {e.note}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.4rem",
                  }}
                >
                  {e.courses.map((c) => (
                    <span key={c} className="chip">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
