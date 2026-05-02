import C from "@/styles/theme";

const Footer = () => {
  return (
    <footer
      style={{
        borderTop: `1px solid ${C.border}`,
        padding: "2rem 2.5rem",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 900,
            fontSize: "1.1rem",
            color: C.text,
            letterSpacing: "-0.03em",
          }}
        >
          BR<span style={{ color: C.blue }}>.dev</span>
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.7rem",
            color: C.textDim,
          }}
        >
          {"// "}built with caffeine & occasional frustration · ©{" "}
          {new Date().getFullYear()}
        </span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["GitHub", "LinkedIn", "Twitter"].map((s) => (
            <span
              key={s}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.7rem",
                color: C.textDim,
                cursor: "pointer",
                transition: "color 0.2s",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.blue)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.textDim)}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
