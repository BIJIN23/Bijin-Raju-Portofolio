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
