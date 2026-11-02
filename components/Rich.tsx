import { Fragment } from "react";

// "**굵게**" 와 "{강조색}" 표기를 화면용으로 바꿉니다. 줄바꿈(\n)은 <br/>로 바뀝니다.
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\{[^}]+\}|\n)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) => {
        if (p === "\n") return <br key={i} />;
        if (p.startsWith("**")) return <strong key={i}>{p.slice(2, -2)}</strong>;
        if (p.startsWith("{")) return <span key={i} className="accent">{p.slice(1, -1)}</span>;
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

export function Arrow({ dir = "right", size = 16 }: { dir?: "right" | "left" | "up-right"; size?: number }) {
  const d =
    dir === "left" ? "M19 12H5M11 18l-6-6 6-6" : dir === "up-right" ? "M7 17L17 7M8 7h9v9" : "M5 12h14M13 6l6 6-6 6";
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}
