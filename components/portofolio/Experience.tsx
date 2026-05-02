import { EXPERIENCE } from "@/app/constants/portffolio";
import C from "@/styles/theme";
import { useState } from "react";

const Experience = ({ SectionLabel, Reveal }) => {
  const [openExp, setOpenExp] = useState<number>(0);
  return (
    <section
      id="Experience"
      style={{ padding: "6rem 2.5rem", borderTop: `1px solid ${C.border}` }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionLabel n="03 //" title="Experience" />
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {EXPERIENCE.map((e, i) => (
            <Reveal key={`${e.co}-${i}`} delay={i * 0.1} from="left">
              <div className="exp-card">
                <div
                  className="exp-header"
                  onClick={() => setOpenExp(openExp === i ? -1 : i)}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "0.8rem",
                        flexWrap: "wrap",
                        marginBottom: "0.3rem",
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "'Syne', sans-serif",
                          fontWeight: 800,
                          fontSize: "1.2rem",
                          color: C.text,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {e.role}
                      </h3>
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.78rem",
                          color: C.blue,
                        }}
                      >
                        @ {e.co}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.72rem",
                          color: C.textDim,
                        }}
                      >
                        {e.period}
                      </span>
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.72rem",
                          color: C.textDim,
                        }}
                      >
                        · {e.loc}
                      </span>
                    </div>
                  </div>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "1rem",
                      transition: "transform 0.3s, color 0.2s",
                      transform: openExp === i ? "rotate(90deg)" : "none",
                      color: openExp === i ? C.blue : C.textDim,
                      flexShrink: 0,
                    }}
                  >
                    ▶
                  </span>
                </div>

                {/* expanded body */}
                <div
                  style={{
                    maxHeight: openExp === i ? "400px" : "0",
                    overflow: "hidden",
                    transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
                  }}
                >
                  <div
                    style={{
                      padding: "0 2rem 1.8rem",
                      borderTop: `1px solid ${C.border}`,
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "1rem",
                        lineHeight: 1.8,
                        color: C.textMid,
                        margin: "1.2rem 0 1.2rem",
                      }}
                    >
                      {e.desc}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.4rem",
                        flexWrap: "wrap",
                      }}
                    >
                      {e.tags.map((t) => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
