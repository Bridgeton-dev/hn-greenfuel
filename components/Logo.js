import { BRAND } from "../lib/brand";

export function FlameMark({ size = 28 }) {
  return (
    <svg className="mark" viewBox="0 0 40 56" width={size * 0.72} height={size} aria-hidden="true">
      <path d="M21 2c2 10 14 15 14 30a15 15 0 0 1-30 0c0-7 3-12 7-15 0 6 2 9 6 10-2-9 0-17 3-25z" fill="var(--ember)" />
      <path d="M20 26c1 5 7 7 7 13a7 7 0 0 1-14 0c0-3 2-6 3-7 0 3 1 4 3 5-1-4 0-8 1-11z" fill="var(--flame)" />
    </svg>
  );
}

export default function Logo() {
  return (
    <span className="logo">
      <FlameMark />
      <span className="logo-txt">
        <b>{BRAND.wordmark}</b>
        <small>{BRAND.sub}</small>
      </span>
    </span>
  );
}
