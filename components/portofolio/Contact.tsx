import C from "@/styles/theme";
import { useState } from "react";
import ContactForm from "@/components/portofolio/ContactForm";

const Contact = ({ SectionLabel, Reveal }) => {
  const copyEmail = () => {
    navigator.clipboard.writeText("bijinraju1999@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };
  const [copied, setCopied] = useState(false);

  return (
    <section
      id="Contact"
      style={{
        padding: "6rem 2.5rem 9rem",
        borderTop: `1px solid ${C.border}`,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionLabel n="05 //" title="Contact" />
        <div
          className="contact-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          {/* LEFT */}
          <Reveal from="left">
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "1.1rem",
                color: C.textMid,
                lineHeight: 1.85,
                marginBottom: "2.5rem",
              }}
            >
              Open to full-time roles . I reply fast — unless deep in a
              debugging session, in which case I{"'"}ll surface eventually.
            </p>
            <div style={{ marginBottom: "2.5rem" }}>
              {[
                { k: "Email", v: "bijinraju1999@gmail.com", col: C.blue },
                { k: "Location", v: "Vadodara, India", col: C.textMid },
                {
                  k: "Status",
                  v: "Open · replies within 24h",
                  col: "#3fb950",
                },
              ].map((item) => (
                <div
                  key={item.k}
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    alignItems: "center",
                    padding: "0.9rem 0",
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.72rem",
                      color: C.textDim,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      minWidth: 64,
                    }}
                  >
                    {item.k}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: "1rem",
                      color: item.col,
                    }}
                  >
                    {item.v}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
              <button
                className="cta-primary"
                onClick={copyEmail}
                style={{
                  background: copied
                    ? "linear-gradient(135deg,#3fb950,#26a641)"
                    : undefined,
                }}
              >
                {copied ? "✓ Copied!" : "Copy Email"}
              </button>
              <a
                href={"https://www.linkedin.com/in/bijin-raju-5b6a15210/"}
                className="cta-ghost"
              >
                LinkedIn ↗
              </a>
            </div>
          </Reveal>

          {/* RIGHT — form */}
          <Reveal delay={0.15} from="right">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
