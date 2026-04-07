"use client";
import React, { useState } from "react";
import C from "@/styles/theme";

export default function ContactForm() {
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!fields.name || !fields.email || !fields.message) return;
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      if (!res.ok) throw new Error();

      setStatus("sent");
      setFields({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3500);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3500);
    }
  };

  const btnLabel = {
    idle:    "Send Message →",
    sending: "Sending...",
    sent:    "✓ Message Sent!",
    error:   "Failed — Try Again",
  }[status];

  const btnBg = {
    idle:    undefined,
    sending: undefined,
    sent:    "linear-gradient(135deg,#3fb950,#26a641)",
    error:   "linear-gradient(135deg,#f85149,#da3633)",
  }[status];

  return (
    <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "14px", overflow: "hidden" }}>
      <div style={{ background: "rgba(88,166,255,0.06)", borderBottom: `1px solid ${C.border}`, padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        {["#ff5f57", "#ffbd2e", "#28c840"].map((c, i) => (
          <div key={i} style={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.8 }} />
        ))}
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: C.textDim, marginLeft: "0.5rem" }}>
          new_message.tsx
        </span>
      </div>

      <div style={{ padding: "1.8rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input
          className="form-input"
          name="name"
          placeholder="Your name"
          value={fields.name}
          onChange={handleChange}
        />
        <input
          className="form-input"
          name="email"
          placeholder="your@email.com"
          value={fields.email}
          onChange={handleChange}
        />
        <textarea
          className="form-input"
          name="message"
          rows={4}
          placeholder="Tell me what you're building..."
          style={{ resize: "vertical" }}
          value={fields.message}
          onChange={handleChange}
        />
        <button
          className="cta-primary"
          onClick={handleSubmit}
          disabled={status === "sending"}
          style={{
            width: "100%",
            padding: "1rem",
            fontSize: "1rem",
            justifyContent: "center",
            background: btnBg,
            opacity: status === "sending" ? 0.7 : 1,
            cursor: status === "sending" ? "not-allowed" : "pointer",
          }}
        >
          {btnLabel}
        </button>
      </div>
    </div>
  );
}