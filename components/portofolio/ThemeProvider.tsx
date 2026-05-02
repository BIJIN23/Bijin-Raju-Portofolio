"use client";
import { useEffect } from "react";
import { injectThemeVars } from "@/styles/theme";

export default function ThemeProvider() {
  useEffect(() => {
    injectThemeVars();
  }, []);
  return null;
}
