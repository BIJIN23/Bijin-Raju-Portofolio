import C from "@/styles/theme";
import { HeroProps } from "@/types/portfolio";

const Hero = ({ Particles, heroIn, typed, years, go }: HeroProps) => {
  return (
    <section
      id="About"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "7rem 2.5rem 5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Particles />

      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        {/* status pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            background: "rgba(88,166,255,0.08)",
            border: `1px solid ${C.border}`,
            borderRadius: "99px",
            padding: "0.4rem 1rem",
            marginBottom: "2.2rem",
            opacity: heroIn ? 1 : 0,
            transform: heroIn ? "none" : "translateY(12px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          <span style={{ position: "relative", display: "inline-flex" }}>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#3fb950",
                display: "block",
                boxShadow: "0 0 8px #3fb950",
              }}
            />
            <span
              style={{
                position: "absolute",
                inset: -2,
                borderRadius: "50%",
                border: "2px solid #3fb950",
                animation: "pulseRing 1.8s ease-out infinite",
              }}
            />
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.75rem",
              color: C.blue,
              letterSpacing: "0.06em",
            }}
          >
            Available for hire
          </span>
        </div>

        <div
          className="hero-cols"
          style={{ display: "flex", gap: "4rem", alignItems: "center" }}
        >
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
                transition:
                  "opacity 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.15s",
              }}
            >
              <span style={{ color: C.text, display: "block" }}>Bijin</span>
              <span
                style={{
                  background: `linear-gradient(135deg, ${C.blue} 0%, #79c0ff 50%, ${C.blue} 100%)`,
                  backgroundSize: "200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "block",
                  animation: heroIn ? "none" : undefined,
                }}
              >
                Raju
              </span>
            </h1>

            {/* typewriter */}
            <div
              style={{
                marginBottom: "1.8rem",
                opacity: heroIn ? 1 : 0,
                transform: heroIn ? "none" : "translateY(18px)",
                transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                minHeight: "2.2rem",
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.85rem",
                  color: C.blue,
                  opacity: 0.6,
                }}
              >
                ~/
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                  fontWeight: 600,
                  color: C.blue,
                }}
              >
                {typed}
                <span
                  style={{
                    animation: "blink 1s step-end infinite",
                    borderRight: `2px solid ${C.blue}`,
                    marginLeft: 2,
                  }}
                >
                  &nbsp;
                </span>
              </span>
            </div>

            {/* bio */}
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.12rem",
                lineHeight: 1.8,
                color: C.textMid,
                maxWidth: 520,
                marginBottom: "0.8rem",
                opacity: heroIn ? 1 : 0,
                transform: heroIn ? "none" : "translateY(16px)",
                transition:
                  "opacity 0.7s ease 0.38s, transform 0.7s ease 0.38s",
              }}
            >
              I build things for the web — fast, deliberate, and built to last.{" "}
              {years}+ years of turning complex problems into clean solutions.
              Open to React-based roles and aspiring to take on more backend
              responsibilities to grow as a full-stack developer.
            </p>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.8rem",
                color: C.textDim,
                marginBottom: "2.5rem",
                opacity: heroIn ? 1 : 0,
                transition: "opacity 0.7s ease 0.44s",
                fontStyle: "italic",
              }}
            >
              Don{"'"}t mind the URL — not rich enough to afford a custom domain
              yet.
            </p>

            {/* buttons */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                opacity: heroIn ? 1 : 0,
                transform: heroIn ? "none" : "translateY(14px)",
                transition: "opacity 0.7s ease 0.5s, transform 0.7s ease 0.5s",
              }}
            >
              <button className="cta-primary" onClick={() => go("Projects")}>
                See My Work
              </button>
              <button className="cta-ghost" onClick={() => go("Contact")}>
                Get in Touch
              </button>
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
            <div
              style={{
                background: C.bgCard,
                border: `1px solid ${C.border}`,
                borderRadius: "14px",
                padding: "2rem",
                backdropFilter: "blur(10px)",
              }}
            >
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.7rem",
                  color: C.textDim,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "1.5rem",
                }}
              >
                quick.stats()
              </p>
              {[
                {
                  val: `${years}+`,
                  label: "Years experience",
                  desc: "still going",
                },
                {
                  val: "10+",
                  label: "Projects shipped",
                  desc: "and counting",
                },
                { val: "12", label: "Repositories", desc: "some are good" },
                {
                  val: "2–3",
                  label: "Coffees per day",
                  desc: "occupational hazard",
                },
              ].map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.2rem",
                    padding: "0.9rem 0",
                    borderBottom: i < 3 ? `1px solid ${C.border}` : "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 900,
                      fontSize: "2rem",
                      color: C.text,
                      letterSpacing: "-0.04em",
                      minWidth: "3.5rem",
                      lineHeight: 1,
                    }}
                  >
                    {s.val}
                  </span>
                  <div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 600,
                        fontSize: "0.88rem",
                        color: "#c9d1d9",
                        lineHeight: 1.2,
                      }}
                    >
                      {s.label}
                    </div>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.68rem",
                        color: C.textDim,
                        marginTop: "0.1rem",
                      }}
                    >
                      {s.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
