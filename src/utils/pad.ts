export const pad = (s: string, n: number, where: "right" | "left") =>
  (where == "left" ? s : "") + "0".repeat(n - s.length) + (where == "right" ? "" : s);
