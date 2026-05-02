import { useState } from "react";
import C from "@/styles/theme";
import { PROJECTS } from "@/app/constants/portffolio";
import useInView from "@/hooks/useInView";

function TimelineItem({
  p,
  i,
  isLast,
}: {
  p: (typeof PROJECTS)[0];
  i: number;
  isLast: boolean;
}) {
  const [ref, visible] = useInView(0.08);
  const [hov, setHov] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "72px 28px 1fr",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
      }}
    >
      {/* Year column */}
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.62rem",
          color: hov ? C.blue : C.textDim,
          textAlign: "right",
          paddingRight: "16px",
          paddingTop: "4px",
          letterSpacing: "0.05em",
          transition: "color 0.25s",
          whiteSpace: "nowrap",
        }}
      >
        {p.year ?? `'${24 - i}`}
      </div>

      {/* Spine column */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Dot */}
        <div
          style={{
            width: "9px",
            height: "9px",
            borderRadius: "50%",
            background: hov ? C.blue : i === 0 ? C.blue : C.border,
            border: `1.5px solid ${C.bgCard}`,
            flexShrink: 0,
            marginTop: "3px",
            transition: "background 0.25s, box-shadow 0.25s",
            boxShadow: hov ? `0 0 0 3px rgba(88,166,255,0.15)` : "none",
          }}
        />
        {/* Vertical line */}
        {!isLast && (
          <div
            style={{
              flex: 1,
              width: "1px",
              background: `linear-gradient(to bottom, ${C.border}, transparent)`,
              marginTop: "6px",
              minHeight: "24px",
            }}
          />
        )}
      </div>

      {/* Content column */}
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          paddingLeft: "18px",
          paddingBottom: isLast ? "0" : "2.6rem",
          cursor: "default",
        }}
      >
        {/* Tag */}
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.6rem",
            color: hov ? C.blue : C.textDim,
            background: "rgba(88,166,255,0.07)",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: hov ? "rgba(88,166,255,0.3)" : C.border,
            padding: "0.12rem 0.5rem",
            borderRadius: "99px",
            display: "inline-block",
            marginBottom: "0.45rem",
            letterSpacing: "0.04em",
            transition: "color 0.2s, border-color 0.2s",
          }}
        >
          {p.tag}
        </span>

        {/* Title */}
        <h3
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "1.25rem",
            letterSpacing: "-0.03em",
            color: hov ? C.text : C.textMid,
            lineHeight: 1.1,
            marginBottom: "0.4rem",
            transition: "color 0.25s",
          }}
        >
          {p.name}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.88rem",
            lineHeight: 1.7,
            color: C.textDim,
            maxWidth: "540px",
            marginBottom: "0.65rem",
          }}
        >
          {p.desc}
        </p>

        {/* Footer row: stack + stat */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.4rem",
          }}
        >
          {p.stack.map((s) => (
            <span
              key={s}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.62rem",
                color: hov ? C.blue : C.textDim,
                background: hov
                  ? "rgba(88,166,255,0.09)"
                  : "rgba(255,255,255,0.03)",
                border: `1px solid ${
                  hov ? "rgba(88,166,255,0.18)" : "rgba(255,255,255,0.05)"
                }`,
                padding: "0.15rem 0.5rem",
                borderRadius: "4px",
                transition: "all 0.2s",
              }}
            >
              {s}
            </span>
          ))}

          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.64rem",
              color: hov ? C.blue : "#3d7fc2",
              fontWeight: 600,
              marginLeft: "auto",
              paddingLeft: "0.5rem",
              transition: "color 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            {p.stat}
          </span>
        </div>

        {/* Subtle divider line on hover */}
        <div
          style={{
            height: "1px",
            background: `linear-gradient(90deg, ${
              hov ? "rgba(88,166,255,0.2)" : "transparent"
            }, transparent)`,
            marginTop: "1rem",
            transition: "background 0.35s",
          }}
        />
      </div>
    </div>
  );
}
const Projects = ({ SectionLabel, Reveal }) => {
  return (
    <section
      id="Projects"
      style={{
        padding: "6rem 2.5rem",
        borderTop: `1px solid ${C.border}`,
        background: "rgba(255,255,255,0.01)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionLabel n="02 //" title="Projects" />

        {/* Timeline container */}
        <div
          style={{
            marginTop: "2.5rem",
            position: "relative",
          }}
        >
          {PROJECTS.map((p, i) => (
            <TimelineItem
              key={p.no}
              p={p}
              i={i}
              isLast={i === PROJECTS.length - 1}
            />
          ))}

          {/* Terminal ghost row at bottom */}
          <Reveal delay={0.15}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "72px 28px 1fr",
                marginTop: "0.4rem",
              }}
            >
              <div />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "transparent",
                    border: `1px solid ${C.border}`,
                    marginTop: "3px",
                  }}
                />
              </div>
              <div style={{ paddingLeft: "18px" }}>
                <p
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.72rem",
                    color: C.textDim,
                    fontStyle: "italic",
                    paddingTop: "1px",
                  }}
                >
                  {"// "}+3 more on GitHub — some brilliant, some humbling, all
                  educational.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Projects;
