"use client";

import { Header } from "./Header";

export function PropertyHeader({ forceDark }: { forceDark: boolean }) {
  return <Header forceDark={forceDark} />;
}
