import { ComponentType, ReactNode } from "react";

export type SectionLabelProps = {
  n: string;
  title: string;
};

export type RevealProps = {
  children: ReactNode;
  delay?: number;
  from?: "bottom" | "left" | "right";
};

export type SectionProps = {
  SectionLabel: ComponentType<SectionLabelProps>;
  Reveal: ComponentType<RevealProps>;
};

// ← add this
export type HeroProps = {
  Particles: ComponentType;
  heroIn: boolean;
  typed: string;
  years: number;
  go: (id: string) => void;
};

export type NavBarProps = {
  scrolled: boolean;
  go: (id: string) => void;
  activeNav: string;
};
