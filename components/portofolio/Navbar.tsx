import React from "react";
import C from "@/styles/theme";
import { NAV } from "../../app/constants/portffolio";
import { NavBarProps } from "@/types/portfolio";

const NavBar = ({ scrolled, go, activeNav }: NavBarProps) => {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        height: 66,
        background: scrolled ? "rgba(13,17,23,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? `1px solid ${C.border}`
          : "1px solid transparent",
        transition: "all 0.35s ease",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 2.5rem",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* logo */}
        <div
          onClick={() => go("About")}
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 900,
              fontSize: "1.4rem",
              color: C.text,
              letterSpacing: "-0.04em",
            }}
          >
            BR
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              color: C.blue,
              opacity: 0.6,
            }}
          >
            .dev
          </span>
        </div>
        {/* links */}
        <div className="desk-only" style={{ display: "flex", gap: "2rem" }}>
          {NAV.map((n) => (
            <button
              key={n}
              className={`nav-btn ${activeNav === n ? "active" : ""}`}
              onClick={() => go(n)}
            >
              {n}
            </button>
          ))}
        </div>
        {/* cta */}
        <button
          className="cta-primary"
          style={{ padding: "0.55rem 1.4rem", fontSize: "0.85rem" }}
          onClick={() => go("Contact")}
        >
          Hire Me →
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
